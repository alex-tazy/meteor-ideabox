messageList = new Mongo.Collection("messageList");

Meteor.methods({
	insertMsg: function(msg) {
		check(this.userId, String);
		check(msg, String);

		var user = Meteor.user();
		var message = {
			message: msg,
			userId: user._id,
			author: user.username,
			createdAt: new Date()
		};
		return messageList.insert(message);
	}
});