const http = require("http");
const fs = require('fs');
const path = require('path');

const server = http.createServer((req,res) => {
  fs.readFile("index.html", "UTF-8", (err, html) => {
      if (req.url === "/") {
          res.writeHead(200, {"Content-Type": "text/html"})
          res.end(html);
      } else if (req.url.match("\.js$")) {
          let jsPath = path.join(__dirname, req.url);
          let fileStream = fs.createReadStream(jsPath, "UTF-8");
          res.writeHead(200, {"Content-Type": "text/javascript"});
          fileStream.pipe(res)
      }
      else if (req.url.match("\.css$")) {
          let cssPath = path.join(__dirname, req.url);
          let fileStream = fs.createReadStream(cssPath, "UTF-8");
          res.writeHead(200, {"Content-Type": "text/css"});
          fileStream.pipe(res)
      }else {
          res.writeHead(400, {"Content-Type": "text/html"});
          res.end(err)
      }
  }
)
});

const port = process.env.PORT || 8124;
server.listen(port);
console.log(`Server running on port ${port}`)