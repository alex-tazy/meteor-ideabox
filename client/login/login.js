import {
	Template
} from 'meteor/templating';

Template.formLogin.events({
	"submit .form-signin": function(ev) {
		ev.preventDefault();
		var login = ev.target.login.value;
		var pwd = ev.target.pwd.value;

		if (isEmpty(login) && isEmpty(pwd)) {
			Meteor.loginWithPassword(login, pwd, function(error, result) {
				Router.go("/");
			});
		}
	}
});

function isEmpty(value) {
	if (value && value != '')
		return true;
	else
		return false;
};