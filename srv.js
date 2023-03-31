const http = require("http");

const host = '0.0.0.0';

const requestListener = function (req, res) {
	switch (req.url){
		case "/test1":
            res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
            res.end(`{"test1": "kek1"}`);
            break
		case "/test2":
            res.writeHead(200, {'Access-Control-Allow-Origin': '*'});
            res.end(`{"test2": "kek2"}`);
            break
	    default:
			res.writeHead(404, {'Access-Control-Allow-Origin': '*'});
			break
	}
};


const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:8000`);
});