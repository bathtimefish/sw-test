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


