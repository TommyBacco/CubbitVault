const express = require('express');
const cors = require('cors'); 
const multer = require('multer');
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require("dotenv");
const { v1: uuidv1 } = require('uuid');
const app = express();
const PORT = 5000;
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'upload/');
  },
  filename: function(req, file, cb) {
    cb(null, req.headers.filename + ".enc");
  }
});
const upload = multer({ storage: storage });

dotenv.config();
app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "articolo31",
  database: "FileStorage",
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
  console.log('⚡️[server]: Server is running at https://localhost:' + PORT);
});

app.get('/v1/data/', (req,res)=>{

  const readMetadata = "SELECT * FROM FilesTable WHERE UUID = unhex(replace(?,'-',''))"
  db.query(readMetadata, [req.header("uuid")], (err, response)=>{
    if(err){response.send(err)}else {
      console.log(response)
      res.send({
        'filename':response[0].Path,
        'mime':response[0].Mime,
        'size':response[0].Size
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
