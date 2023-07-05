const http = require("http")
const fs = require("fs")
const object = require("./object.js")

const PORT = 8080;

let obj;
var options = {
    hostname: '127.0.0.1',
    port: PORT,
    path: '/',
    method: 'GET',
    json: true
}

// Server created
const server = http.createServer((req,res)=>{
    res.end(fs.readFileSync('data.txt','utf-8'))
})

// GET request created
http.request(options,(res)=>{
    var file = fs.readFileSync('text.json','utf-8')//reading 'text.json'

    res.setEncoding('utf8');

    res.on('data',function(data){
        obj = JSON.stringify({...object ,...JSON.parse(file)})//append 'text.json' data into object from 'object.js'

        // writing retrieved data in 'data.txt' 
        fs.writeFile('data.txt', obj,(err)=>{if(err!==null)console.log(err) 
            else{console.log(data)}})//print 'data.txt' file content on console
    })

}).on('error', function(e) {
    console.log('problem with request: ' + e.message);
  }).end(obj);
// JSON returned in response


server.listen(PORT,()=>{
    console.log(`server running at port - ${PORT}`)
});
