import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

public class CustomerServlet extends HttpServlet {
    private static Map<String, String> store = Collections.synchronizedMap(
            new HashMap<String, String>());

    private static final Logger LOG = Logger.getLogger(CustomerServlet.class.getSimpleName());

    private long nextCustomerId = 0;

    private synchronized String newCustomerId() {
        return "" + nextCustomerId++;
    }

    private String getCustomerId(HttpServletRequest req) {
        String uri = req.getRequestURI();
        int lastSlash = uri.lastIndexOf('/');
        return uri.substring(lastSlash + 1);
    }

    private String read(HttpServletRequest req) throws IOException {
        InputStream in = req.getInputStream();
        try {
            char[] buf = new char[4096];
            int read = -1;
            Reader reader = new InputStreamReader(in, "utf8");
            Writer w = new StringWriter();
            do {
                read = reader.read(buf);
                if (read != -1) {
                    w.write(buf, 0, read);
                }
            } while (read != -1);
            return w.toString();
        } finally {
            in.close();
        }
    }

    private void write(HttpServletResponse resp, String data) throws IOException {
        resp.setContentType("text/plain");
        resp.setCharacterEncoding("utf-8");
        OutputStream out = resp.getOutputStream();
        try {
            Writer w = new OutputStreamWriter(out, resp.getCharacterEncoding());
            w.write(data);
            w.close();
        } finally {
            out.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String customerId = newCustomerId();
        String customer = read(req);
        // Add the id to the customer json
        customer = "{\"id\":\"" + customerId + "\"," + customer.substring(1);
        LOG.info("Saving customer " + customer);
        store.put(customerId, customer);
        write(resp, customer);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String customerId = getCustomerId(req);
        String customer = store.get(customerId);
        LOG.info("Loading customer with id " + customerId + ":" + customer);
        if (customer != null) {
            write(resp, customer);
        }
    }

}