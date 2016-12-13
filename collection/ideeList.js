ideeList = new Mongo.Collection("ideeList");

Meteor.methods({
	//Méthode appelée dans idea.js
	insertIdea: function(idea) {
		newList = ideeList.insert({
			titre: idea.titre,
			idee: idea.idee
		}, function(error, result) {});
		return newList;
	}
})