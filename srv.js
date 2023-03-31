const http = require("http");
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)

const host = '0.0.0.0';
const port = 8080;

const leaderboard = db.collection("leaderboard")

const scoreHandle = function(json, res) {
	console.log(json)
	res.writeHead(200, {'Access-Control-Allow-Origin': '*'})
}

const server = http.createServer(function (req, res) {
	if(request.method === 'POST') {
		var jsonString = '';

		req.on('data', function (data) {
			jsonString += data;
		});

		req.on('end', function () {
			if(req.url == '/score'){
				scoreHandle(jsonString, res)
			}	
		});

	}
};);


server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:&{port}`);
});