Template.signIn.events({
    "submit [data-action=sign-in]": function(e) {
        var $form, email, pass;
        $form = $(e.target);
        if ($form[0].valid) {
            email = $form.find("#email").val();
            pass = $form.find("#password").val();
             Meteor.loginWithPassword(email, pass, function(error) {
                if (error) {
                     GlobalUI.toast(error.reason);
                } else {
                    GlobalUI.toast("Login Successful.");
                     Router.go("home");
                }
            });
        }
    }
});
