var https = require('https');
var httpProxy = require('http-proxy');
var pem = require('pem');
var static = require('node-static');
var file = new(static.Server)();
var fs = require("fs");
var path = require("path");

pem.createCertificate({ days: 1, selfSigned: true }, function (err, keys) {
    var httpsOptions = {
        key: keys.serviceKey,
        cert: keys.certificate
    };
    
    /*var proxy = httpProxy.createProxyServer({
        target: http://signaling.example.com,
        ws: true,
        secure: false,
        changeOrigin: true
    });

    var proxyWebsocket = function (req, socket, head) {
        // replace the target with your signaling server ws url
        proxy.ws(req, socket, head, {
            target: 'http://signaling.example.com'
        });
    };*/

    //var app = express();
  //   var server = https.createServer(httpsOptions, function (req, res) {
  //   	var readStream = fs.createReadStream("index.html");
		// res.writeHead("200",
		// 	{
		// 		"Access-Control-Allow-Origin" : "*",
		// 		"Content-Type": "text/html; charset=UTF-8"
		// 	});
		// readStream.pipe(res);
  //   }).listen(8443);
    //server.on('upgrade', proxyWebsocket);
  	
  	var port = 8443;
	var checkMimeType = true;

	console.log("Starting web server on:" + port);

	https.createServer(httpsOptions, function(req, res) {

		var now = new Date();

		var filename = req.url || "index.html";
		var ext = path.extname(filename);
		var localPath = __dirname;
		var validExtensions = {
			".html" : "text/html",
			".js": "application/javascript",
			".css": "text/css",
			".txt": "text/plain",
			".jpg": "image/jpeg",
			".gif": "image/gif",
			".png": "image/png",
			".woff": "application/font-woff",
			".woff2": "application/font-woff2"
		};

		var validMimeType = true;
		var mimeType = validExtensions[ext];
		if (checkMimeType) {
			validMimeType = validExtensions[ext] != undefined;
		}

		if (validMimeType) {
			localPath += filename;
			fs.exists(localPath, function(exists) {
				if(exists) {
					console.log("Serving file: " + localPath);
					getFile(localPath, res, mimeType);
				} else {
					console.log("File not found: " + localPath);
					res.writeHead(404);
					res.end();
				}
			});

		} else {
			console.log("Invalid file extension detected: " + ext + " (" + filename + ")")
		}

	}).listen(port);

	function getFile(localPath, res, mimeType) {
		fs.readFile(localPath, function(err, contents) {
			if(!err) {
				res.setHeader("Content-Length", contents.length);
				if (mimeType != undefined) {
					res.setHeader("Content-Type", mimeType);
				}
				res.statusCode = 200;
				res.end(contents);
			} else {
				res.writeHead(500);
				res.end();
			}
		});
	}
});