throwError = function(text, html) {
    if (typeof(html) == "undefined")
        html = "";

    db_error.insert({
        html: html,
        status: false,
        text: text,
        time: moment().format("X")
    });
};

Template.errorHandler.helpers({
    object: function() {
        return db_error.find({}, {
            sort: {
                time: 1
            }
        });
    }
});

Template.error.rendered = function() {
    var error = this.data;

    db_error.update(error._id, {
        $set: {
            status: true
        }
    });
};
