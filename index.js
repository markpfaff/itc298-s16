var http = require('http');
var fs = require('fs');

function serveStatic(res, path, contentType, responseCode) {
	if(!responseCode) responseCode = 200;
	fs.readFile(__dirname + path, function(err,data) {
	
	if(err) {
		res.writeHead(500, { 'Content-Type': 'text/plain' });
		res.end('500 - Internal Error');
	} else{
		res.writeHead(responseCode,
		{ 'Content-Type': contentType });
			res.end(data);
		}
	});
}

http.createServer(function(req,res){
    var path = req.url.toLowerCase();
    switch(path) {
        case '/':
            serveStatic(res, '/public/home.html', 'text/html')
            //res.writeHead(200, { 'Content-Type': 'text/plain' });
            // res.end('Homepage');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        default:
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
            break;
    }
}).listen(3000);
