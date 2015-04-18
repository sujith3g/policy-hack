// Router.map(function () {
// 	this.route("noAccessTemplate", {
// 		path: "/",
// 	});
// });

Router.configure({
    autoRender: false
    // autoStart: false
});



Router.route("/", {
    name: "home",
    template: "signIn",
    controller: "PublicController",
    waitOn:function(){
    },
    action: function() {
        if (Meteor.user()) {
            this.layout("dashboardLayout");
            return this.render("landing");
        } else {
            this.layout("publicLayout");
            return this.render("signIn");
        }
    }
});

Router.configure({
    autoRender: false
    // autoStart: false
});

this.PublicController = RouteController.extend({
    layoutTemplate: "publicLayout",
    loadingTemplate: "loading"
});

Router.route("/about", {
    controller: "PublicController"
});

Router.route("/sign-in", {
    name: "accounts.signIn",
    template: "signIn",
    controller: "PublicController"
});

Router.route("/sign-up", {
    name: "accounts.signUp",
    template: "signUp",
    controller: "PublicController"
});

Router.route("/sign-out", {
    name: "accounts.signOut",
    template: "signIn",
    controller: "PublicController",
    onBeforeAction: function() {
         Meteor.logout(function() {
            Router.go('/');
        });
         this.next();
    }
});

Router.map(function () {
	this.route("spreadjs", {
		layoutTemplate: "layoutTemplate",
		onBeforeAction: function() {
            // if (typeof(this.params.taskId) != "undefined" && this.params.taskId != null) Session.set("taskId", this.params.taskId);
            // else Router.go("signout");

			this.next();
		},
		path: "/spreadjs",
		waitOn: function() {
			return Meteor.subscribe("spreadjs"/*, this.params.taskId*/);
		}
	});
});
