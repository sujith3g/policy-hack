Router.map(function() {
    this.route("d3Bubble", {
        layoutTemplate: "",
        onBeforeAction: function() {
            // if (typeof(this.params.taskId) != "undefined" && this.params.taskId != null) Session.set("taskId", this.params.taskId);
            // else Router.go("signout");

            this.next();
        },
        path: "/d3",
        waitOn: function() {
            return Meteor.subscribe("spreadjs" /*, this.params.taskId*/ );
        }
    });
});
