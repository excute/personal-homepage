require("dotenv").config();

const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const mimeTypes = {
	".html": "text/html",
	".js": "text/javascript",
	".css": "text/css",
	".json": "application/json",
	".png": "image/png",
	".jpg": "image/jpg",
	".gif": "image/gif",
	".svg": "image/svg+xml",
	".wav": "audio/wav",
	".mp4": "video/mp4",
	".woff": "application/font-woff",
	".ttf": "application/font-ttf",
	".eot": "application/vnd.ms-fontobject",
	".otf": "application/font-otf",
	".wasm": "application/wasm",
	".ico": "image/x-icon",
};

const server = http.createServer((req, res) => {
	console.log(req.url);
	let url = req.url;
	if (req.url === "/") {
		url = "/index.html";
	}
	fs.readFile(`./dist${url}`, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-Type": mimeTypes[".html"] });
			console.error(err);
		} else {
			res.writeHead(200, { "Content-Type": mimeTypes[path.extname(url)] });
			res.write(data);
		}
		res.end();
	});
});

server.listen(process.env.PORT);
