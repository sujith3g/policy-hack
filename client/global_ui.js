


    GlobalUI = {};
    GlobalUI.dialog = {};

    GlobalUI.toast = function(text,html) {
      var toast;
      toast = $("[global-toast]")[0];
      toast.text = text;
      html = typeof html ==="String" ? html : "<core-icon icon='clear'><paper-ripple></paper-ripple></core-icon>";
      toast.innerHTML = html;
      return toast.show();
    };

    GlobalUI.showDialog = function(opts) {
      var _this = this;
      this.dialog = $("[global-dialog]")[0];
      this.dialog.heading = opts.heading;
      Session.set("global.ui.dialogData", opts.data);
      Session.set("global.ui.dialogTemplate", opts.template);
      Session.set("global.ui.dialogFullOnMobile", opts.fullOnMobile != null);
      return Tracker.afterFlush(function() {
        return _this.dialog.open();
      });
    };

    GlobalUI.closeDialog = function() {
      return this.dialog.close();
    };



  Template.globalLayout.helpers({
    globalDialogTemplate: function() {
      return Session.get("global.ui.dialogTemplate");
    },
    globalDialogData: function() {
      return Session.get("global.ui.dialogData");
    },
    globalDialogFullOnMobile: function() {
      return Session.get("global.ui.dialogFullOnMobile");
    }
  });

  Template.globalLayout.events({
    "core-overlay-close-completed [global-dialog]": function(e) {
      Session.set("global.ui.dialogTemplate", null);
      Session.set("global.ui.dialogData", null);
       Session.set("global.ui.dialogFullOnMobile", null);
    },
    "click [data-open-dialog]": function(e) {
      var node;
      node = $(e.target);
       GlobalUI.showDialog({
        heading: node.data("heading"),
        template: node.data("openDialog"),
        data: node.data("useContext") != null ? this : void 0,
        fullOnMobile: node.data("fullOnMobile")
      });
    },
    "click [data-action=sign-in]": function(evt) {
       Router.go("accounts.signIn");
    },
    "click [data-action=sign-up]": function(evt) {
       Router.go("accounts.signUp");
    },
    "click [data-action=about]": function(evt) {
       Router.go("about");
    }
  });

