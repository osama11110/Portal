const express = require('express');
const path = require('path');
const multer = require('multer');
const multerS3 = require('multer-s3')
const fs = require('fs');
const request = require('request-promise');
const compression = require('compression');

const async = require("async");
const _ =require("underscore");

const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const AWS = require("aws-sdk");
AWS.config.update({region: 'us-east-2'});

let uploaded;
let resulta;
const docClient = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

const app = express();

app.use(compression());
app.disable('x-powered-by');
app.use(express.static(__dirname + '/dist'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));
app.use(cors());
app.use(bodyParser.json());




router.get('/api/getpatientdata', (req, res) => {
var startKey =[];
var results =[];
var pages=0;

  // router.get('/api/getdata', (req, res) => {
    async.doWhilst(
      (callback)=>{
        let params = {
          TableName: 'Patient_List',
        };

      if(!_.isEmpty(startKey))
      {
        params.ExclusiveStartKey = startKey;
      }
      docClient.scan(params, (err, data)=>{
        if(err) {
          console.log(err);
          callback(err,{});
        }
        else {
          if(typeof data.LastEvaluatedKey != 'undefined')
          {
            startKey = data.LastEvaluatedKey;
          }
          else{
            startKey =[];
          }
          if(!_.isEmpty(data.Items)){
            results= _.union (results, data.Items);
          }
          pages++;
          callback(null, results);
        }
      });
    },

    ()=>{
      if(_.isEmpty(startKey)){
        return false;
      } else {
        return true;
      }
    },

    (err, data) => {
      if(err) {
        console.log(err);
      }
      else {
        // router.get('/api/getcommondata', (req, res) => {
        console.log("Success",data);
        res.send(data);
        console.log("Item Count", data.length);
        console.log("pages", pages);
        // });
    }
}
);
});


router.post('/api/postpatientdata', (req, res) =>{
    const data = req.body;
    console.log("calling patient data",uploaded);

    var input = {
        "usercnic": data.usercnic,
        "username": data.username,
        "userage": data.userage,
        "useraddress": data.useraddress,
        "usersymptom": data.usersymptom,
        "usergender": data.usergender,
        "usernumber": data.usernumber,
        "userresult": resulta,
        "userdicom" : uploaded

    }

    var params = {
        TableName: "Patient_List",
        Item: input
    }

    docClient.put(params, function (err, data)
    {
        if(err)
        {
            console.log("users::save::error - "+ JSON.stringify(err,null,2))
        }
        else{
            res.json("success");
        }
    });

});


app.use(router);

const port = 3000;
const address = '0.0.0.0';

const server = http.createServer(app);

server.listen(port, address, () => {
  console.log(`listening on port ${port}`);
});


  
  const upload = multer({
    // fileFilter,
    storage: multerS3({
      acl: "public-read",
      s3,
      bucket: "patientdicoms",
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.originalname });
      },
      key: function (req, file, cb) {
        //   const ext= path.extname(file.or)
        cb(null, file.originalname);
      },
    }),
  });

  router.post('/uploadfile', upload.single('file'), (req, res) => {
    uploaded = req.file.location;
     
    check();




      async function check() {
      var options = {
        method: 'POST',
  
        // http:flaskserverurl:port/route
        uri: 'http://3.13.172.54:5000/checkpic',
        body: uploaded,
  
        // Automatically stringifies
        // the body to JSON 
        json: true
      };
  
        var sendrequest = await request(options)
  
          // The parsedBody contains the data
          // sent back from the Flask server 
          .then(function (parsedBody) {
              console.log(parsedBody);
                
              // You can do something with
              // returned data
              let result;
              result = parsedBody['result'];
              console.log("image is ", result);
              resulta = result;
              if(resulta==0)
              {
                resulta="Covid";
              }
              else if(resulta==1)
              {
                resulta="Normal";
              }
              else if(resulta==2)
              {
                resulta="Pneumonia";
              }
              res.json("success");
          })
          .catch(function (err) {
              console.log(err);
          });

      
     
    
        }
  
  }); 

      







