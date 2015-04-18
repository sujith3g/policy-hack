Template.signUp.events({
    "submit [data-action=sign-up]": function(e) {
        var $form, email, password;
        $form = $(e.target);
        // return GlobalUI.toast("Sign up is disabled at the moment. contact admin.");
        if ($form[0].valid) {
            email = $form.find("#email").val();
            password = $form.find("#password").val();
         Accounts.createUser({
                email: email,
                password: password
            }, function(error) {
                if (error) {
                 GlobalUI.toast(error.reason);
                } else {
                 Router.go("home");
                }
            });
        }
    }
});
