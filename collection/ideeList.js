ideeList = new Mongo.Collection("ideeList");

Meteor.methods({
	//Méthode appelée dans idea.js pour ajouter une idée avec un minimum de sécurité
	insertIdea: function(idea) {
		newList = ideeList.insert({
			titre: idea.titre,
			idee: idea.idee,
			date: idea.date,
			author: idea.author,
			votes: idea.votes
		});
		return newList;
	},

	// Méthode pour update le compteur de vote avec un minimum de sécurité
	updateCounter: function(idea) {
		var votes = idea.votes;
		votes.push(idea.author);
		ideeList.update(
			idea.id, {
				$set: {
					votes: votes
				}
			}
		);
	},

	// Méthode pour éditer le titre ou le contenu d'une idée
	editIdea: function(idea) {
		var field = idea.field;
		var set = {};
		set[field] = idea.edit;
		ideeList.update(
			idea.id, {
				$set: set
			}
		);
	},

	// Méthode pour supprimer une idée
	deleteIdea: function(idea) {
		ideeList.remove(idea.id);
	}
});