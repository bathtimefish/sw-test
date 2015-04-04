var window = self; // window.moment を迎えるために self を windowにアサインする

importScripts('bower_components/moment/min/moment.min.js');    // 外部スクリプトを読み込む

self.onfetch = function(event) {
    console.log('moment reqested.');
    var mDate = window.moment().add(3, 'days').format('llll');
    var mStr = mDate + ' is date after 3 days now.';
    var html = '<!doctype html><html><body><h1>Response by Service Worker</h1><p>' + mStr + '</p></body></html>';
    var res = new Response(html);
    res.headers.set('content-type', 'text/html');
    event.respondWith(res);
};
