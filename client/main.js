/*import { Template } from 'meteor/templating';*/
/*import './main.html';*/
Template.result.helpers({
	getResults: function() {
		return ideeList.find({});
	}
});

Template.form.events({
	'click .btn': function(ev) {
		ev.preventDefault();
		var titre = $("#titre").val();
		var idee = $("#idee").val();

		newList = ideeList.insert({titre: titre, idee: idee}, function(error, result) {
			if(result) {
				console.log(result);
			}
		});
	}
});
