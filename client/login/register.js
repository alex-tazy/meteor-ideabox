import {
	Template
} from 'meteor/templating';

Template.register.events({
	"submit .form-signup": function(ev) {
		ev.preventDefault();
		var login = ev.target.login.value;
		var pwd = ev.target.pwd.value;
		var confirmPwd = ev.target.confirmPwd.value;

		if (isEmpty(login) && isEmpty(pwd) && isEmpty(confirmPwd)) {
			if (pwd === confirmPwd) {
				Meteor.call("addUser", {
					login: login,
					pwd: pwd
				}, function(error, result) {
					if (error) {
						console.log(error);
					} else {
						Meteor.loginWithPassword(login, pwd, function(error, result) {
							Router.go("/");
						});
					}
				});
			} else {
				alert("Vos mots de passes ne correspondent pas");
				return false;
			}
		} else {
			alert("Vous devez rentrez une valeur valide");
			return false;
		}
	}
});

function isEmpty(value) {
	if (value && value != '')
		return true;
	else
		return false;
};