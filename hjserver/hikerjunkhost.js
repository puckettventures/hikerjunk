const express = require("express");
const app = express();
const http = require("http");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");
const formidable = require("formidable");
const geoParse = require("togeojson");
const DOMParser = require("xmldom").DOMParser;
const fs = require("fs");
const ws = require("ws");
const server = http.createServer(app);

/*
const wss = new ws.Server({
	server: server,
	path: "/",
	clientTracking: false,
	maxPayload: 1024
}); */

const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ port: 2222 });

const ObjectId = require("mongodb").ObjectID;

const url = "mongodb://localhost:27017/";

//setInterval(() => console.log(`Users online: ${ _.size(wss.clients)}`), 10 * 1000);

// Broadcast to all.
wss.broadcast = function broadcast(data) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === ws.OPEN) {
			client.send(data);
		}
	});
};

wss.on("connection", socket => {
	console.log("user connected. ");

	socket.once("close", () => {
		console.log("user disconnected");
	});
});

wss.on("error", err => console.error(err));

app.get("/trails", (req, res) => {
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		let query = "";
		let db = client.db("hikerjunk");

		db
			.collection("trails")
			.find()
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				//db.close();
			});
	});
});

app.get("/trails/:trailId", (req, res) => {
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;
		let query = { _id: ObjectId(req.params["trailId"]) };
		console.log(query);
		let db = client.db("hikerjunk");

		db
			.collection("trails")
			.find(query)
			.toArray(function(err, result) {
				if (err) throw err;
				res.send(result);
				//db.close();
			});
	});
});

app.post("/trail", (req, res) => {
	MongoClient.connect(url, function(err, client) {
		if (err) throw err;

		let db = client.db("hikerjunk");
		let trails = db.collection("trails");

		let form = new formidable.IncomingForm();
		form.encoding = "utf-8";

		form.uploadDir = "./datastore";
		form.type = "multipart";
		form.keepExtensions = true;

		form.parse(req, function(err, fields, files) {
			if (err) throw err;
			let maps = [];

			for (fileName in files) {
				file = files[fileName];
				let doc = new DOMParser().parseFromString(
					fs.readFileSync(file.path, "utf8")
				);
				let geoJson = geoParse.gpx(doc);

				maps.push({ name: file.name, data: geoJson });
			}
			trails.insertMany(maps, function(err, result) {
				if (err) throw err;

				var json = JSON.stringify({ type: "message", data: "update" });

				//notify all clients to update state data because a new trail has been inserted
				wss.broadcast(json);

				res.send({ inserted: result.insertedCount });
				console.log("gpx files written:" + result.insertedCount);
				//db.close();
			});
		});
	});
});

app.listen(3001, () => console.log("Example app listening on port 3001!"));
