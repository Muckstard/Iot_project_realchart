const axios = require("axios");
const cheerio = require("cheerio");
var pg = 1
// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
async function getHTML() {
    
  try {
    return await axios.get("https://www.genie.co.kr/chart/top200?ditc=D&ymd=20200608&hh=09&rtm=Y&pg="+pg);
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
        var a = $(this).find("a.title.ellipsis").text().replace(/\n/g,"").replace(/\s+/,"")
        titleList[i] = {
            rank: i+1,
            title: a,
            singer: $(this).find("a.artist.ellipsis").text(),
            album: $(this).find("a.albumtitle.ellipsis").text()
        };     
    });
    //console.log(titleList);
    var jsonData = JSON.stringify(titleList);
    fs.writeFileSync('geniedata.json',jsonData);
    return titleList;
  });
  //.then(res => console.log(res)); // 저장된 결과를 출력
var dataBuffer = fs.readFileSync('geniedata.json');
var dataJson = dataBuffer.toString();
var data = JSON.parse(dataJson);

console.log(data)