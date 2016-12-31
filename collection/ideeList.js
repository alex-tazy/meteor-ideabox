ideeList = new Mongo.Collection("ideeList");

Meteor.methods({
	//Méthode appelée dans idea.js pour ajouter une idée avec un minimum de sécurité
	insertIdea: function(idea) {
		check(this.userId, String);
		check(idea, {
			title: String,
			idea: String,
			votes: Array
		});

		var user = Meteor.user();
		var idee = _.extend(idea, {
			userId: user._id,
			author: user.username,
			createdAt: new Date()
		});
		return ideeList.insert(idee);
	},

	// Méthode pour update le compteur de vote avec un minimum de sécurité
	updateCounter: function(idea) {
		check(this.userId, String);
		check(idea, {
			id: String,
			votes: Array
		});

		var votes = idea.votes;
		votes.push(Meteor.userId());
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
		var set = {};
		set[idea.field] = idea.edit;
		ideeList.update(
			idea.id, {
				$set: set
			}
		);
	},

	// Méthode pour supprimer une idée
	deleteIdea: function(ideaId) {
		ideeList.remove(ideaId);
	}
});