import {
	Template
} from 'meteor/templating';

Template.formLogin.events({
	"submit .form-signin": function(ev) {
		ev.preventDefault();
		var login = ev.target.login.value;
		var pwd = ev.target.pwd.value;

		Meteor.loginWithPassword(login, pwd, function(error, result) {
			Route.go("/");
		});
	}
});