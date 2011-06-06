Testdriven JavaScript Development
=================================

Description
-----------

This is a sample application that shows the usage of jasmine
and js-test-driver to create unit and end2end tests for javascript applications.

UI
---
The ui is made up of three part:

- model.js: Provides functions to access the backend
- view.js: Provides functions to access the widgets
- controller.js: Adds controller logic to combine the model with the view.


Backend
-------
The backend is a simple servlet that stores data in memory.

- A POST to `/js-tdd/rest/customer/*` will create a new customer, assign an id and return the new customer
- A GET to `/js-tdd/rest/customer/<id>` will load the customer with the given id

Project-Setup
-------------
This is a default maven WAR project. The jetty is configured so that it does an overlay between the
directories `src/main/webapp` and `src/test/webapp`.

Tests are executed in the `integration-test` phase, as some of them need a backend for REST calls.

The js-test-driver server can be started via the jstd-server.sh command.

The tests can be run via the jstd-client.sh command.

The tests may also be run in the jasmine html runner via the url `http://localhost:8080/js-tdd/SpecRunner.html`


Maven-Configuration
-------------------
Please set the location of the browser(s) that should be used for the js-test-driver tests
in the envirnoment variable JSTD_BROWSER before running the maven build.


Links
-----

See [Jasmine-UI](https://github.com/tigbro/jasmine-ui) for a framework to support ui tests.
