messageList = new Mongo.Collection("messageList");

Meteor.methods({
	insertMsg: function(msg) {
		var timestamp = Math.round(new Date().getTime() / 1000);
		messageList.insert({
			message: msg.message,
			date: msg.date,
			author: msg.author,
			createdAt: timestamp
		});
	}
});