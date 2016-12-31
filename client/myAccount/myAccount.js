import {
	Template
} from 'meteor/templating';

Template.idea.helpers({
	getResults: function() {
		var routeName = Router.current().route.getName();
		if (routeName == "index")
			return ideeList.find().fetch();
		else if (routeName == "idea")
			return ideeList.find({
				userId: Meteor.userId()
			});
	},

	getAuthor: function() {
		var author = Meteor.users.findOne(this.userId);
		return author.username;
	},

	isAuthor: function() {
		if (Meteor.userId() == this.userId)
			return true;
		else
			return false;
	}
});

Template.idea.events({
	'click .btn-danger': function(ev) {
		ev.preventDefault();
		Meteor.call('deleteIdea', this._id);
	},

	'dblclick .data': function(ev) {
		ev.preventDefault();
		if (Meteor.userId() == this.userId) {
			$(ev.target).addClass("hidden");
			var input = $(ev.currentTarget).find("input");
			input.removeClass("hidden");
			input.focus();
		}
	},

	'keydown .edit-input, blur .edit-input': function(ev) {
		if (ev.keyCode == 13 || ev.type == "focusout") {
			var me = this;
			var elem = $(ev.target);
			var field = ev.target.dataset.edit;
			Meteor.call('editIdea', {
				id: me._id,
				field: field,
				edit: elem.val()
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
		var userId = Meteor.userId();
		var voted = this.votes.indexOf(userId);
		if (voted == -1)
			return false;
		else
			return true;
	}
});

Template.vote.events({
	'click .btn-primary': function(ev) {
		ev.preventDefault();
		if (!$(ev.target).hasClass("disabled")) {
			var me = this;
			Meteor.call('updateCounter', {
				id: me._id,
				votes: me.votes
			});
		} else {
			return false;
		}
	}
});

Template.index.events({
	'submit form': function(ev) {
		ev.preventDefault();
		var titre = $("#titre").val();
		var idee = $("#idee").val();

		Meteor.call('insertIdea', {
			title: titre,
			idea: idee,
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