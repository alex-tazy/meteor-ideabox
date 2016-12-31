Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound'
});
Router.route('/', {
	name: 'index',
	waitOn: function() {
		return Meteor.subscribe("allIdeas");
	}
});
Router.route('/myideas', {
	name: 'idea',
	waitOn: function() {
		return Meteor.subscribe("allIdeas");
	}
});
Router.route('/tchat', {
	name: 'tchat',
	data: function() {
		return Meteor.subscribe('allUsername');
	},
	waitOn: function() {
		return Meteor.subscribe("tchatMsg");
	}
});
Router.route('/myAccount', {
	name: 'myAccount'
});

Router.onBeforeAction(function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render(this.loadingTemplate);
		} else {
			this.render('accessDenied');
		}
	} else {
		this.next();
	}
});