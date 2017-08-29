/**
 * Created by lenny on 8/29/2017.
 */
module.exports = function (request, response, next) {
    var start = +new Date();        // + converts date Obj to ms
    var stream = process.stdout;
    var url = request.url;
    var method = request.method;

    // response is an EventEmitter
    response.on('finish', function () {
        var duration = +new Date() - start;
        var message = method + ' to ' + url + '\n took ' + duration + ' ms\n\n';
        stream.write(message);
    });

    next();                   // moves req to next middleware in stack
}