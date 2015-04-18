Template.dashboardLayout.events({
  "click [data-action=toggle-drawer]": function() {
    return $("[data-drawer-panel]")[0].togglePanel();
  }
});