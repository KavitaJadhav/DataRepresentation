exports.home = function(req, res){
  res.render('home');
};

exports.bar_chart = function(req, res) {
	res.render('bar_chart_input');
}

exports.pie_chart = function(req, res) {
	res.render('pie_chart_input');
}