import {
	Template
} from 'meteor/templating';

Template.result.helpers({
	getResults: function() {
		// Récupère toutes les entrées de la collection "ideeList" dans un tableau
		return ideeList.find().fetch();
	},

	getAuthor: function() {
		var author = Meteor.users.findOne(this.author);
		return author.username;
	},

	isAuthor: function() {
		var user = Meteor.userId();
		var me = this;
		if (user == me.author)
			return true;
		else
			return false;
	}
});

Template.result.events({
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
		var user = Meteor.userId();
		if (user == this.author) {
			var elem = $(ev.target);
			elem.addClass("hidden");
			var cell = $(ev.currentTarget);
			var input = cell.find("input");
			input.removeClass("hidden");
			input.focus();
		}
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
				var span = elem.parent().find("span");
				elem.addClass("hidden");
				span.removeClass("hidden");
			});
		}
	}
});

Template.vote.helpers({
	alreadyVoted: function() {
		var user = Meteor.userId();
		var me = this;
		var voted = me.votes.indexOf(user);
		if(voted == -1)
			return false;
		else
			return true;
	}
});

Template.vote.events({
	'click .btn-primary': function(ev) {
		ev.preventDefault();
		var target = $(ev.target);
		if(!target.hasClass("disabled")) {
			var me = this;
			var id = me._id;
			var votes = me.votes;
			var user = Meteor.userId();
			Meteor.call('updateCounter', {
				id: id,
				author: user,
				votes: votes
			});
		} else {
			return false;
		}
	}
});

Template.form.events({
	'submit form': function(ev) {
		ev.preventDefault();
		var titre = $("#titre").val();
		var idee = $("#idee").val();
		var author = Meteor.userId();
		var date = getDate();

		Meteor.call('insertIdea', {
			titre: titre,
			idee: idee,
			date: date,
			author: author,
			votes: []
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

function getDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	var h = today.getHours();
	var m = today.getMinutes();

	if (dd < 10) {
		dd = '0' + dd
	}

	if (mm < 10) {
		mm = '0' + mm
	}

	today = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m;
	return today;
};