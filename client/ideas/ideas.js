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
					titre: curUser.titre
				};
			}
		} else {
			return null
		}
	}
});

Template.result.helpers({
	getResults: function() {
		// Récupère toutes les entrées de la collection "ideeList" dans un tableau
		return ideeList.find().fetch();
	}
});

Template.result.events({
	'click .btn-primary': function(ev) {
		ev.preventDefault();
		var me = this;
		var id = me._id;
		var votes = me.votes;
		Meteor.call('updateCounter', {
			id: id,
			votes: votes
		});
	},

	'click .btn-danger': function(ev) {
		ev.preventDefault();
		var me = this;
		var id = me._id;
		Meteor.call('deleteIdea', {
			id: id
		});
	},

	'dblclick .data': function(ev) {
		ev.preventDefault();
		var elem = $(ev.target);
		elem.addClass("hidden");
		var cell = $(ev.currentTarget);
		var input = cell.find("input");
		input.removeClass("hidden");
		input.focus();
	},

	'keydown input, blur input': function(ev) {
		if (ev.keyCode == 13 || ev.type == "focusout") {
			var me = this;
			var elem = $(ev.target);
			var field = "";
			if (elem.hasClass("new-title")) {
				field = "titre";
			} else {
				field = "idee";
			}
			var value = elem.val();
			Meteor.call('editIdea', {
				id: me._id,
				field: field,
				edit: value
			}, function(error, result) {
				var pute = elem.parent().find("span");
				elem.addClass("hidden");
				pute.removeClass("hidden");
			});
		}
	}
});

Template.form.events({
	'submit form': function(ev) {
		ev.preventDefault();
		var titre = $("#titre").val();
		var idee = $("#idee").val();
		var today = new Date();
		var dd = today.getDate();
		var mm = today.getMonth() + 1; //January is 0!
		var yyyy = today.getFullYear();

		if (dd < 10) {
			dd = '0' + dd
		}

		if (mm < 10) {
			mm = '0' + mm
		}

		today = mm + '/' + dd + '/' + yyyy;

		Meteor.call('insertIdea', {
			titre: titre,
			idee: idee,
			date: today,
			author: titre,
			votes: 0
		}, function(error, result) {
			if (result) {
				Session.setPersistent("userId", result);
				$("#idee").val('');
				$("#titre").val('');
				$("#titre").blur();
				$("#idee").blur();
			}
		});
	}
});