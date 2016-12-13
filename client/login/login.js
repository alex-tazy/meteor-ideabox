import {
	Template
} from 'meteor/templating';

Template.formLogin.events({
	"submit .form-signin": function(ev) {
		ev.preventDefault();
	}
});