messageList = new Mongo.Collection("messageList");

Meteor.methods({
	insertMsg: function(msg) {
		var timestamp = Math.round(new Date().getTime() / 1000);
		newMsg = messageList.insert({
			message: msg.message,
			date: msg.date,
			author: msg.author,
			createdAt: timestamp
		});
		return newMsg;
	}
});