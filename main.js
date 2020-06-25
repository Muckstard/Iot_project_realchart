var express = require('express');
var app = express();
var http = require('http')
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var url = require('url');
var qs = require('querystring');

var text = "";
// pm2 start main.js --watch --ignore-watch="data/* sessions/*"  --no-daemon
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var connection = mysql.createConnection({
  host    :'203.234.62.143',
  port : 3306,
  user : 'daegyun',
  password : '4886',
  database:'realchart',
  insecureAuth: true
});
connection.connect();
http.createServer(app).listen(8000,function(){
  console.log('Server running at http://localhost:8000');
})
app.get('/', (req, res) => {
    fs.readFile('mainchart1.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'rows' 매개변수에 저장한다.
        connection.query('select * from realchart.real where ranking <=30;', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'reallist' 변수에 할당한 후 'mainchart1.ejs' 에 전달한다.
                res.send( ejs.render(data, {
                    reallist : rows }
                ));
            }
        });
    }
    })
});

app.get('/mainchart1.ejs', (req, res) => {
    fs.readFile('mainchart1.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query('select * from realchart.real where ranking <=30;', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    reallist : rows }
                ));
            }
        });
    }
    })
});
app.post("/chartsearch.ejs", function(req, res) {
    text = req.body.test;
    res.json({ok:true});
});
app.get('/chartsearch.ejs', (req, res) => {
    fs.readFile('chartsearch.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query(`select * from realchart.real where title LIKE "%${text}%";`, function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    reallist1 : rows }
                ));
                console.log(rows);
            }
        });
    }
    })
});
app.get('/mainchart2.ejs', (req, res) => {
    fs.readFile('mainchart2.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query('select * from realchart.real where 31<=ranking and ranking <=60;', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    reallist : rows }
                ));
            }
        });
    }
    })
});

app.get('/mainchart3.ejs', (req, res) => {
    fs.readFile('mainchart3.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query('select * from realchart.real where 61<=ranking and ranking <=90;', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    reallist : rows }
                ));
            }
        });
    }
    })
});

app.get('/mainchart4.ejs', (req, res) => {
    fs.readFile('mainchart4.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query('select * from realchart.real where 91<=ranking;', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    reallist : rows }
                ));
            }
        });
    }
    })
});

app.get('/melonchart.ejs', (req, res) => {
    fs.readFile('melonchart.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query('select * from realchart.melon', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    melonlist : rows }
                ));
            }
        });
    }
    })
});
app.get('/geniechart.ejs', (req, res) => {
    fs.readFile('geniechart.ejs','utf8',function(err,data) {
      if(err) {
        console.log('readFile err');
      }
      else{
        //전제 데이타를 조회한 후 결과를 'results' 매개변수에 저장한다.
        connection.query('select * from realchart.genie', function(err, rows){
            if(err){
                console.log('error : ', err.message);
            }else{
                //조회결과를 'prodList' 변수에 할당한 후 'list.html' 에 전달한다.
                res.send( ejs.render(data, {
                    genielist : rows }
                ));
            }
        });
    }
    })
});

app.use(express.static('public'));
app.get('/site.html',function(req,res){
    res.sendFile(__dirname + "/site.html");
});