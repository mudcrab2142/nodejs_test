const http = require("http");
const AWS = require("aws-sdk");
const s3 = new AWS.S3()
const { 
  v1: uuidv1,
  v4: uuidv4,
} = require('uuid');

const host = '0.0.0.0';
const port = 8080;

const scoreHandler = async function(json, res) {
	try{
		console.log(json)
		await s3.putObject({Body: json, Bucket: process.env.BUCKET, Key: uuidv4()}).promise()
		res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
		res.end()
	} catch {
		res.writeHead(500, {'Access-Control-Allow-Origin': '*'})
		res.end()
	}
}

const leaderboardHandler = function(res) {
	try{
		console.log(json)
		s3.listObjects({Bucket: process.env.BUCKET}, function(err, data) {
			if (err) {
				console.log("Error", err);
			} else {
				console.log("Success", JSON.stringify(data.Contents.sort(o => o.Key))); // example
				res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
				res.end()
			}
		})

	} catch (error) {
		console.log(error)
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