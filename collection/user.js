Meteor.methods({
	addUser: function(user) {
		Accounts.createUser({
			username: user.login,
			password: user.pwd
		});
	},

	userLogout: function() {
		Meteor.logout();
	}
});