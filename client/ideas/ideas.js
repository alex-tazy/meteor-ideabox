import {
	Template
} from 'meteor/templating';
import {
	Session
} from 'meteor/session';

Template.index.events({
	'click .logout': function(ev) {
		ev.preventDefault();
		Meteor.call("userLogout", function(error, result) {
			if(!error) {
				alert("Vous avez bien été déconnecté");
				Router.go("/login");
			}
		})
	}
})

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

	'keydown .edit-input, blur .edit-input': function(ev) {
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
		var author = Meteor.user();
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
			author: author.username,
			votes: 0
		}, function(error, result) {
			if (result) {
				$("#idee").val('');
				$("#titre").val('');
				$("#titre").blur();
				$("#idee").blur();
			}
		});
	}
});