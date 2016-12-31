/**
 * Created by alexc on 26/12/2016.
 */

// Publie toutes les idées sur mini-Mongo
Meteor.publish("allIdeas", function() {
	return ideeList.find();
});

// Publie tous les messages sur mini-Mongo
Meteor.publish("tchatMsg", function() {
	return messageList.find();
});

Meteor.publish("allUsername", function() {
	return Meteor.users.find({}, {
		fields: {
			username: 1
		}
	});
});