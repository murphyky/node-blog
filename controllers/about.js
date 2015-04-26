module.exports = function(req, res, next) {
	res.render("about", {app: "main"});
}