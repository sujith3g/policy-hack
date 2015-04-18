var polymerReady;

polymerReady = new ReactiveVar(false);

$(window).on("polymer-ready", function() {
   polymerReady.set(true);
});

Meteor.startup(function() {
  $("body").append("<div fit layout vertical iron-router></div>");
 Tracker.autorun(function() {
    if (polymerReady.get()) {
      Router.insert({
        el: "[iron-router]"
      });
       Router.start();
    }
  });
});