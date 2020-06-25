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

// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
async function getHTML() {
  try {
    return await axios.get("https://www.melon.com/chart/index.htm");
  } catch (error) {
    console.error(error);
  }
  
}
var titleList = [];
var fs = require('fs');
const { connect } = require("http2");

//셀렉터를 이용해 웹페이지 크롤링
getHTML()
  .then(html => {
    
    const $ = cheerio.load(html.data);
    // tbody tr를 찾고 그 children 노드를 bodyList에 저장
    const bodyList = $("tbody tr");

    // bodyList를 순회하며 경로 내용 저장
    bodyList.each(function(i, elem) {
      titleList[i] = {
        rank: i+1,
        title: $(this).find("div.ellipsis.rank01 a").text(),
        singer: $(this).find("span.checkEllipsis a").text(),
        album: $(this).find("div.ellipsis.rank03 a").text()
      };
      
    });
    var jsonData = JSON.stringify(titleList);
    fs.writeFileSync('melondata.json',jsonData); // json 파일로 저장
    return titleList;
  });

var dataBuffer = fs.readFileSync('melondata.json'); // json 파일 읽기
var dataJson = dataBuffer.toString();
var data = JSON.parse(dataJson);
console.log(data);
for(var i =0; i< data.length; i++) {    // 데이터 변수에 저장
  var rank = data[i].rank;
  var title = data[i].title;
  var singer = data[i].singer;
  var album = data[i].album;
  var sql = 'INSERT INTO realchart.melon VALUES(?,?,?,?)';  // DB에 전달할 쿼리문
  var params = [rank, title, singer,album];//파라미터를 값들로 줌(배열로 생성)
  
  connection.query(sql,params,function(err,rows,fields) {
  if(err) 
    console.log(err);
  })
}

connection.end();
