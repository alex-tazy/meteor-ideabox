import {
	Template
} from 'meteor/templating';

Template.layout.events({
	'click .logout': function(ev) {
		ev.preventDefault();
		Meteor.call("userLogout");
	}
});

Template.nav.events({
	'click #login': function(ev) {
		ev.preventDefault();
		$('#loginModal').modal('show');
	},

	'click #register': function(ev) {
		ev.preventDefault();
		$('#registerModal').modal('show');
	}
});