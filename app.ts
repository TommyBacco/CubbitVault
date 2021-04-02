const express = require('express');
const cors = require('cors'); 
const multer = require('multer');
const mysql = require("mysql2");
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require("dotenv");
const { v1: uuidv1 } = require('uuid');
const app = express();
const upload = multer({dest: 'uploads/'});
const PORT = 5000;

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


app.get('/', (req,res) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log('⚡️[server]: Server is running at https://localhost:' + PORT);
});


app.post('/v1/files', upload.single("file") ,(req, res, next) => {
	if(!req.file){console.log("fallito")}else{console.log("File salvato in " + req.file.path)}
	var uuid1 = uuidv1()	
	const queryInsert = "INSERT INTO FilesTable(UUID,Path,Size) VALUES(unhex(replace(?,'-','')), ?,?)"
    db.query(queryInsert, [uuid1, req.file.path, req.file.size], (err, res) => {
      if (err) throw err;
   });
    const queryProva = "SELECT * FROM FilesTable WHERE UUID = (unhex(replace(?,'-','')));"
    db.query(queryProva, [uuid1], (err,res) => {
    	if(err) throw err;
    	console.log(res[0])
    	
    })
	next()
});
