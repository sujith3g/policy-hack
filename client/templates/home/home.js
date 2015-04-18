
  Template.home.rendered = function() {
    document.title = "ClayIP Dashboard";
    return $("<meta>", {
      name: "A full featured IP dashboard",
      content: "dashboard"
    }).appendTo("head");
  };

  // Template.home.events = {
  //   'click paper-button': function(evt) {
  //      console.log('clicked: ', evt.target);
  //   }
  // };

