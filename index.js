var express = require('express');  
var app = express();  
const port = 3000;
// The simplest way to read a JSON file is to require it. Passing require() with the path to a JSON file will synchronously read and parse the data into a JavaScript object.
var urlencodedParser = express.urlencoded() 
const fs = require("fs");
const path = require('path')
app.use(express.static('public'));  

//function dosent work when imported (need fixing)
function desponse (req, res) {  
  response = {  
     first_name:req.body.first_name,  
     last_name:req.body.last_name , 
     password:req.body.password
 };  res.end(JSON.stringify(response)); 
//  code the fs lines insie the function only.  
 const jsonString = JSON.stringify(response);
 fs.writeFile('userdata.json', jsonString);
};

//send data from userdata.json to page called /newdata
//new server page is created but cant send the userdata.json file through res.send
app.get('/newdata', function (req, res) {
  fs.readFile(__dirname + "/userdata.json", (error, data) => {
    if(error) {
        throw error;
    }});
  res.header("Content-Type",'application/json');
  res.send(JSON.stringify(data));
})
  
app.post('/userdata', urlencodedParser, desponse);

//current stage: in the server 8000, form takes the data and sends it to /userdata
//next stage: /userdata sends the data to userdata.json
//output shows error that res is not defined
// fs.readFile('/userdata', function(err, data) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write(data);
//   return res.end(JSON.stringify(response));
// });
// this function will read the /userdata webpage and show it in userdata.json
// function userdatas (req, res) {
//   fs.readFile('/userdata', function(err, data) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(data);
//     return res.end();
//   });
// }

//note to self: objects in function cant be used outside that function
//console.log('The resulted',jsonString);

app.listen(port, function () {  
  console.log(`Example app listening at ${port}`)  
})