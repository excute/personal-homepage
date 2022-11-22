require("dotenv").config();

const http = require("node:http");
const fs = require("node:fs");

const server = http.createServer((req, res) => {
	// console.log(req.url);
	fs.readFile(`./dist${req.url}`, (err, data) => {
		res.writeHead(200, { "Content-Type": "text/html" });
		res.write(data);
		res.end();
	});
});

server.listen(process.env.PORT);
