module.exports = function(req, res, next) {
	console.log(req.path)
    if (req.path == 'contact') {
        res.render("contact", {
            app: "main"
        });
    } else {
        req.articles.get(function(rows) {
            res.send(rows);
        });
    }
}