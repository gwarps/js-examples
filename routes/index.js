module.exports = exports = function (app) {
    "use strict";
    app.get("/", function (req, res) {
        res.render('index');
    });
};
