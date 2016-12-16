import {
	Template
} from 'meteor/templating';

Template.myideas.helpers({
	getMyIdeas: function() {
		var user = Meteor.userId();
		return ideeList.find({
			author: user
		});
	},

	getAuthor: function() {
		var author = Meteor.users.findOne(this.author);
		return author.username;
	}
});

Template.myideas.events({
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