const express = require('express');
var cors = require('cors'); 
const bodyParser = require('body-parser');
const app = express();
app.use(cors()); 
const PORT = 5000;
//support parsing of application/json type post data
const myNotes : string[] = []

app.use(function(req, res, next) { 
   res.header("Access-Control-Allow-Origin", "*"); 
   res.header('Access-Control-Allow-Methods', '*'); 
   res.header("Access-Control-Allow-Headers", "*"); 
   next(); 
}); 

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req,res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log('⚡️[server]: Server is running at https://localhost:' + PORT);
});


app.post('/note', (req, res) => {
	myNotes.push(req.body)
	console.log(myNotes)
  // and further:
  res.send("received")
});
