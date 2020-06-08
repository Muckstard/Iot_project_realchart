const axios = require("axios");
const cheerio = require("cheerio");

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
    //console.log(titleList[0].title);
    var jsonData = JSON.stringify(titleList);
    fs.writeFileSync('melondata.json',jsonData);
    return titleList;
  });
  //.then(res => console.log(res)); // 저장된 결과를 출력
var dataBuffer = fs.readFileSync('melondata.json');
var dataJson = dataBuffer.toString();
var data = JSON.parse(dataJson);

console.log(data)


if  ( typeof  document !== 'undefined' )  { 
    

  var clsTable = document.getElementById('rank_chart');

  // table 또는 tbody 에 저장된 row 의 개수를 가져온다.
  var iRowCount = clsTable.rows.length;

  // table 또는 tbody 에 4개의 row 가 있다면 2 와 3 번째 사이에 
  // 새로운 row 를 추가하고 싶으면 아래와 같이 호출한다.
  // 맨 마지막에 row 를 추가하고 싶으면 iRowCount 를 입력한다.
  var clsRow = clsTable.insertRow( iRowCount );
      
  // 새로운 row 에 2개의 cell 을 추가한다.
  var clsCell1 = clsRow.insertCell(0);
  var clsCell2 = clsRow.insertCell(1);
  var clsCell3 = clsRow.insertCell(2);

  // 각 cell 에 텍스트를 입력한다.
  clsCell1.innerHTML = "asdf";
  clsCell2.innerHTML = data[0].title;
  clsCell3.innerHTML = data[0].singer;

}

