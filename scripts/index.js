
var registration;

var sw = navigator.serviceWorker;

function register() {
    sw.register('sw.js')
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
