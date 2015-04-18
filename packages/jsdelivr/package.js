    Package.describe({                                                                                                // 33
        summary: "jsdelivr CDN container",                                                                            // 34
        version: "1.0.0",                                                                                             // 35
        name: "jsdelivr"                                                                                              // 36
    });                                                                                                               // 37
                                                                                                                      // 38
    Package.onUse(function(api) {                                                                                     // 39
        api.versionsFrom("METEOR@1.0");                                                                               // 40
        api.use("templating@1.0.8", "client");                                                                        // 41
        api.add_files(["head.html"], "client");                                                                       // 42
    });                                                                                                               // 43