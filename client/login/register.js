import {
	Template
} from 'meteor/templating';

Template.register.events({
	"submit .form-signup": function(ev) {
		ev.preventDefault();
		var login = ev.target.login.value;
		var pwd = ev.target.pwd.value;
		var confirmPwd = ev.target.confirmPwd.value;
		debugger;

		Accounts.createUser({
			login: login,
			password: pwd
		}, function(error, result) {
			if(error) {
				console.log("error");
			} else {
				console.log("account created");
				Router.go("/");
			}
		});
	}
});