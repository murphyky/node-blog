module.exports = function(req, res, next) {
	console.log("req: ", req);
	res.render("list", {app: "main"});
}