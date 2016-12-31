Meteor.methods({
	// Pour créer un nouvel utilisateur
	addUser: function(user) {
		Accounts.createUser({
			username: user.login,
			password: user.pwd
		});
	}
});