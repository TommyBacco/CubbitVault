const express = require('express');
const cors = require('cors'); 
const multer = require('multer');
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const { v1: uuidv1 } = require('uuid');
const app = express();
const PORT = process.env.PORT || 8080;
const path = require('path');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3')
const BUCKET_NAME = "cubbit-vault";
const IAM_USER_KEY = "AKIAWXUGRUSNBQFNLWEZ";
const IAM_USER_SECRET = "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";
var fs = require('fs');

const s3 = new AWS.S3({
  accessKeyId: IAM_USER_KEY,
  secretAccessKey: IAM_USER_SECRET
});


const upload = multer({ storage: multerS3({
    s3: s3,
    bucket: BUCKET_NAME,
    key: function (req, file, cb) {
        console.log(file)
        cb(null, file.filename)
    }
    })
});

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const db = mysql.createConnection({
  host: "aacv983uhysktq.cldpucslkked.eu-west-3.rds.amazonaws.com",
  user: "bacco",
  password: "articolo31",
  database: "ebdb",
});

app.use(function(req, res, next) { 
   res.header("Access-Control-Allow-Origin", "*"); 
   res.header('Access-Control-Allow-Methods', '*'); 
   res.header("Access-Control-Allow-Headers", "*"); 
   next(); 
}); 



//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(PORT, () => {
  console.log('Server is running at port ' + PORT);
});

app.get('/', (req,res)=>{
  res.send("Server is running at port ' + " + PORT)
})

app.get('/v1/data/', (req,res)=>{


  const readMetadata = "SELECT * FROM FilesTable WHERE UUID = unhex(replace(?,'-',''))"
  db.query(readMetadata, [req.header("uuid")], (err, response)=>{
    if(err){response.send(err)}else if(response.length > 0){
      res.send({
        'filename':response[0].Path,
        'mime':response[0].Mime,
        'size':response[0].Size
      })
    }else{
      res.send({
        'filename':'not-found'
      })
    }
  })
})

app.get('/v1/files', (req,res)=> {
	res.set({
	  "Access-Control-Expose-Headers": "Content-Disposition",
	  'Content-Disposition': 'attachment',
	  'filename':"path"
	})
  const readDb = "SELECT * FROM FilesTable WHERE UUID = unhex(replace(?,'-',''))"
  db.query(readDb, [req.header("uuid")], (err, response)=>{
    if(err){response.send(err)}else{
      var filePath = "./upload/" + response[0]['Path'] + '.enc'
      var resolvedPath = path.resolve(filePath);
      res.sendFile(resolvedPath)
    }
  })
	})


app.post('/v1/files', upload.single("file") ,(req, res, next) => {

  
	if(!req.file){console.log("fallito")}else{console.log("File salvato in " + req.file.path)}
	var uuid1 = uuidv1()
	console.log(uuid1)	
	const queryInsert = "INSERT INTO FilesTable(UUID,Path,Size, Mime) VALUES(unhex(replace(?,'-','')), ?,?,?)"
    db.query(queryInsert, [uuid1, req.headers.filename, req.file.size, req.header('mimeType')], (err, res) => {
      if (err) throw err;
   });
    const queryProva = "SELECT * FROM FilesTable WHERE UUID = (unhex(replace(?,'-','')));"
    db.query(queryProva, [uuid1], (err,res) => {
    	if(err) throw err;
    	console.log(res[0])
    })
    res.send(uuid1)
    console.log(JSON.stringify(req.headers));
	next()
});
