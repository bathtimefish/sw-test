// ./hello/ 以下をService Workerのスコープとする
// registerされたSWは ./hello/ 以下のリクエスト等をフックする
var scope = 'hello/';
var registration;

var sw = navigator.serviceWorker;

function register() {
    // index.html 以下のURLをスコープするため index.js, sw.js はindex.htmlと同ディレクトリに配置する
    sw.register('sw.js', {"scope": scope})
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

function unregister() {
    registration.unregister()
      .then(function() {
          console.log('unregistered.');
      });
}
