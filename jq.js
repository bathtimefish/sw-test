/*
 * Service Workerは windowグローバルオブジェクトを持っていない
 * 代わりに self を持っている。
 */

var window = self; // window.jQuery を迎えるために self を windowにアサインする

importScripts('bower_components/jquery/dist/jquery.min.js');    // 外部スクリプトを読み込む

self.onfetch = function(event) {
    console.log('jq reqested.');
    console.log(window.jQuery());
    var res = new Response('<!doctype html><html><body><h1>Response by Service Worker</h1><p>looking so fine!</p></body></html>');
    res.headers.set('content-type', 'text/html');
    event.respondWith(res);
};
