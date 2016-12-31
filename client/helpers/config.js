Template.registerHelper('pluralize', function(n, thing) {
	if (n === 1) {
		return '1 ' + thing;
	} else {
		return n + ' ' + thing + 's';
	}
});

Template.registerHelper('getDate', function(dt) {
	var date = [dt.getDate(), (dt.getMonth() + 1), dt.getHours(), dt.getMinutes(), dt.getSeconds()];
	for (var i = 0; i < date.length; i++) {
		if (date[i] < 10)
			date[i] = '0' + date[i];
	}
	return date[0] + "/" + date[1] + "/" + dt.getFullYear() + " " + date[2] + ":" + date[3] + ":" + date[4];
});