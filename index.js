// ./hello/ 以下をService Workerのスコープとする
// registerされたSWは ./hello/ 以下のリクエスト等をフックする
var registration;

var sw = navigator.serviceWorker;

// registration
function register(worker, scope) {
    // index.html 以下のURLをスコープするため index.js, sw.js はindex.htmlと同ディレクトリに配置する
    sw.register(worker, {"scope": scope})
      .then(function(reg) {
            console.log("registration: ");
            registration = reg;
            console.log(reg);
      })
      .catch(function(whut) {
          console.error('cannot registration..');
          console.error(whut);
      });
}
// unregistration
function unregister() {
    registration.unregister()
      .then(function() {
          console.log('unregistered.');
      });
}

// basic
function basic() {
    register('sw.js', 'hello/');
}
// jQuery in Worker
function jq() {
    register('jq.js', 'jq/');
}
// moment
function moment() {
    register('moment.js', 'moment/');
}
// push
function push() {
    sw.register('push.js').then(function(reg) {
        console.log("registration: ");
        registration = reg;
        console.log(reg);
        // SW is Ready.
        navigator.serviceWorker.ready.then(function(swReg) {
            // Do we already have a push message subscription?
            console.log(swReg);
            swReg.pushManager.subscribe().then(function(sub) {
                if (!sub) {
                    console.error('sub is null.');
                    return;
                }
                console.log(sub);
                // get Information for GCM
                console.log('Registration ID: ' + sub.subscriptionId);
                console.log('GCM URL: ' + sub.endpoint);
                show_curl_cmd_str(sub);
            }).catch(function(err) {
                console.error('Error during getSubscription()', err);
            });
        });
      })
      .catch(function(whut) {
          console.error('cannot registration..');
          console.error(whut);
      });
}
function subscribe() {
    // Execute after SW registration.
    sw.ready.then(function(swReg) {
        // Do we already have a push message subscription?
        console.log('SW ready.');
        console.log(swReg);
        swReg.pushManager.subscribe().then(function(sub) {
            if (!sub) {
                console.error('sub is null.');
                return;
            }
            console.log(sub);
            // get Information for GCM
            console.log('Registration ID: ' + sub.subscriptionId);
            console.log('GCM URL: ' + sub.endpoint);
        }).catch(function(err) {
            console.error('Error during getSubscription()', err);
        });
    });
}
function request_push_permission() {
    Notification.requestPermission(function (status) {
        console.log(status);
        // Chrome/Safari で Notification.permission を使用可能にする
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
    });
}
function show_curl_cmd_str(subscription) {
    var API_KEY = 'AIzaSyDjO5JIV3Vlw_u9vKpXQse-pCg_NnSCuEQ';
    var subscriptionId = subscription.subscriptionId;
    var endpoint = subscription.endpoint;
    var curlCommand = 'curl --header "Authorization: key=' + API_KEY +
    '" --header Content-Type:"application/json" ' + endpoint +
    ' -d "{\\"registration_ids\\":[\\"' + subscriptionId + '\\"]}"';
    var txtNode = document.createTextNode(curlCommand);
    document.getElementById('curl').appendChild(txtNode);
}

