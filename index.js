var http = require('http');
const fs = require('fs');

fs.copyFile("./file.txt", "./dir1/file.txt", (err) => {
  if(err) console.log(err);
  else console.log("File Coppied")
})


http
  .createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    const html = fs.readFileSync('./index.html');
    res.write(html);
    res.end();
  })
  .listen(8080);
