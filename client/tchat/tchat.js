import {
	Template
} from 'meteor/templating';

Template.people.helpers({
	getAllPeople: function() {
		return Meteor.users.find().fetch();
	}
});

Template.messages.helpers({
	getMessages: function() {
		return messageList.find({}, {
			sort: {
				createdAt: -1
			},
			limit: 10
		});
	},

	isAuthor: function() {
		if (Meteor.userId() == this.userId)
			return "danger";
		else
			return "default";
	}
});

Template.tchat.events({
	'submit form': function(ev) {
		ev.preventDefault();

		var msg = $("#msg").val();

		Meteor.call('insertMsg', msg, function(error, result) {
			if (!error) {
				$("#msg").val('');
			}
		});
	}
});