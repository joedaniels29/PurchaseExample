angular.module('example', [
    // Declare here all AngularJS dependencies that are shared by the example module.
    'supersonic'
]);


// document.addEventListener('deviceready', initializeStore, false);


function initializeStore() {
// Let's set a pretty high verbosity level, so that we see a lot of stuff
// in the console (reassuring us that something is happening).
// if (!store) alert("hai Gurl");
    supersonic.ui.views.current.whenVisible(function () {
        // $(document).ready(function () {

        store.register({
            id: "s2",
            alias: "p2",
            type: store.NON_CONSUMABLE
        });

// Called when store.order("sample_level_one") is executed. The user can
// still cancel after this has been called.

        store.when("s2").initiated(function (p) {
            // Write a function that identifies this product ID as having been
            // initiated to purchase.
            console.log("hai Gurl: initiated");
            // my_app_utils.setIsProductPurchaseInitiated("sample2", true);
        });

// Called when the user has cancelled purchasing the product, after it has
// been initiated.
        store.when("s2").cancelled(function (p) {
            // Write a function that marks this product ID as not being purchased
            console.log("hai Gurl: Canceled");
            // my_app_utils.setIsProductPurchaseInitiated("sample2", false);
        });

// Purchase has been executed successfully. Must call finish to charge the user
// and put the product into the owned state.
        store.when("s2").approved(function (p) {
            console.log("hai Gurl: appved");
            p.finish();
        });
        // store.when("product").approved(function(p) {
        //     p.finish();
        // });
// Called when the product purchase is finished. This gets called every time
// the app starts after the product has been purchased, so we use a helper
// function to determine if we actually need to purchase the non-renewing
// subscription on our own server.
        store.when("s2").owned(function (p) {
            console.log("hai Gurl: owned");
            // if (my_app_utils.getIsProductPurchaseInitiated("sample2")) {
            //     Prevent another upgrade from happening
            //     my_app_utils.setIsProductPurchaseInitiated("sample_level_one", false);
            // All necessary logic to purchase the product, such as talking
            // to your server, changing the UI, etc.
            // my_app_utils.purchaseNonRenewingSubscription('sample_level_one');
            // }
            // else {
            //     console.log("sample_level_one purchase NOT initiated, NOT upgrading!");
            // }
        });

// Errors communicating with the iTunes server happen quite often,
// so it's highly recommended you implement some feedback to the user.
        store.error(function (e) {
            console.log("storekit ERROR " + e.code + ": " + e.message);
            // my_app_utils.alertUserAboutITunesError({
            //     title: 'Subscription Purchase Error',
            //     template: 'We could not reach the Apple iTunes ordering server. ' +
            //     'Please ensure you are connected to the Internet and try ' +
            //     'again.'
            // });
        });

// Refresh the store to start everything
        store.refresh();
        // store.order("sample_level_one");
        // store.refresh();


        $(".purchase").on("click", function(e){
            var p = store.order("s2");
        });

    });
}

window.setTimeout(initializeStore, 15);