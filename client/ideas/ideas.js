import {
	Template
} from 'meteor/templating';
import {
	Session
} from 'meteor/session';

Template.index.helpers({
	alreadyUser: function() {
		if (Session.get("userId")) {
			var curUser = ideeList.findOne({
				_id: Session.get("userId")
			});
			if (curUser) {
				return {
					_id: curUser._id,
					name: curUser.name
				};
			}
		} else {
			return null
		}
	}
});

Template.result.helpers({
	getResults: function() {
		// Récupère toutes les entrées de la collection "ideeList"
		return ideeList.find().fetch();
	}
});

Template.form.events({
	'click .btn': function(ev) {
		ev.preventDefault();
		var titre = $("#titre").val();
		var idee = $("#idee").val();

		newList = ideeList.insert({
			titre: titre,
			idee: idee
		}, function(error, result) {
			if (result) {
				Session.setPersistent("userId", result);
				$("#idee").val('');
				$("#titre").val('');
			}
		});
	}
});