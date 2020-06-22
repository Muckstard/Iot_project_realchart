const axios = require("axios");
const cheerio = require("cheerio");
var mysql = require('mysql');
var connection = mysql.createConnection({
  host    :'203.234.62.143',
  port : 3306,
  user : 'daegyun',
  password : '4886',
  database:'realchart',
  insecureAuth: true
});
connection.connect();

var fs = require('fs');
// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
  //.then(res => console.log(res)); // 저장된 결과를 출력
var dataBuffer = fs.readFileSync('geniedata.json');
var dataJson = dataBuffer.toString();
var data = JSON.parse(dataJson);
console.log(data.length);
for(var i =0; i< data.length; i++) {
  var rank = data[i].rank;
  var title = data[i].title;
  var singer = data[i].singer;
  var album = data[i].album;
  var sql = 'INSERT INTO realchart.genie VALUES(?,?,?,?)';
  var params = [rank, title, singer,album];//파라미터를 값들로 줌(배열로 생성)
  
  connection.query(sql,params,function(err,rows,fields) {
  if(err) 
    console.log(err);
  })
}

connection.end();
