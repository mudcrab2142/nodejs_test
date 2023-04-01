const http = require("http");
const Store = require("jfs");
const db = new Store("data");
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

const host = '0.0.0.0';
const port = 8080;

const scoreHandler = function(json, res) {
	try{
		console.log(json)
		db.saveSync(uuidv4(), json);
	//	await s3.putObject({Body: json, Bucket: process.env.BUCKET, Key: uuidv4()}).promise()
		res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
		res.end()
	} catch {
		res.writeHead(500, {'Access-Control-Allow-Origin': '*'})
		res.end()
	}
}

const leaderboardHandler = function(res) {
	try{

	/*	s3.listObjects({Bucket: process.env.BUCKET}, function(err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", JSON.stringify(data.Contents.sort(o => o.Key)); // example
			}
		})
		await s3.putObject({Body: json, Bucket: process.env.BUCKET, Key: uuidv4()}).promise()*/

		var objs = db.allSync()
		console.log(objs)
		res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
		res.end()
	} catch {
		res.writeHead(500, {'Access-Control-Allow-Origin': '*'})
		res.end()
	}
}

const server = http.createServer(function (req, res) {
	if(req.method === 'POST') {
		var jsonString = '';

		req.on('data', function (data) {
			jsonString += data;
		})

		req.on('end', function () {
			if(req.url == '/score'){
				scoreHandler(jsonString, res)
			}	
		})
	} else if (req.method === 'GET'){
		if(req.url == '/leaderboard'){
			leaderboardHandler(res)
		}	
	}
})

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});