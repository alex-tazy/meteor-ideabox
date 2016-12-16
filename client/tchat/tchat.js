import {
	Template
} from 'meteor/templating';

Template.people.helpers({
	getAllPeople: function() {
		return Meteor.users.find().fetch();
	},

	getOnline: function() {
		/*if (this.status.idle)
		    return "label-warning"
		  else if (this.status.online)
		    return "label-success"
		  else
		    return "label-default"
		return Meteor.users.find({ "status.online": true }).fetch();*/
	}
});

Template.messages.helpers({
	getMessages: function() {
		return messageList.find({}, {
			sort: {
				createdAt: -1
			},
			limit: 8
		});
	},

	getAuthor: function() {
		var author = Meteor.users.findOne(this.author);
		return author.username;
	},

	isAuthor: function() {
		var user = Meteor.userId();
		var me = this;
		if (user == me.author)
			return "danger";
		else
			return "default";
	}
});

Template.tchat.events({
	'submit form': function(ev) {
		ev.preventDefault();

		var msg = $("#msg").val();
		var author = Meteor.userId();
		var date = getDate();

		Meteor.call('insertMsg', {
			message: msg,
			date: date,
			author: author,
		}, function(error, result) {
			if (result) {
				$("#msg").val('');
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

	if (dd < 10)
		dd = '0' + dd;

	if (mm < 10)
		mm = '0' + mm;

	if (h < 10)
		h = '0' + h;

	if (m < 10)
		m = '0' + m;

	today = dd + '/' + mm + '/' + yyyy + ' ' + h + ':' + m;
	return today;
};