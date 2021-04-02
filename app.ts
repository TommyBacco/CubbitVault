const express = require('express');
const cors = require('cors'); 
const multer = require('multer');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const upload = multer({dest: 'uploads/'});
const PORT = 5000;

app.use(cors()); 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//support parsing of application/json type post data
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, '/src/files');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname);
  }
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
	if(!req.file){console.log("fallito")}else{console.log("ricevuto " + req.file.fieldname)}
	//fileStorage.push(req.file)

	next()
});
