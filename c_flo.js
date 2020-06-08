const axios = require("axios");
const cheerio = require("cheerio");

// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
async function getHTML() {
  try {
    return await axios.get("https://www.music-flo.com/browse");
  } catch (error) {
    console.error(error);
  }
  
}
var titleList = [];
//var fs = require('fs');
getHTML()
  .then(html => {
    
    const $ = cheerio.load(html.data);
    // tbody tr를 찾고 그 children 노드를 bodyList에 저장
    const bodyList = $("tbody tr");

    // bodyList를 순회하며 경로 내용 저장
    bodyList.each(function(i, elem) {
      titleList[i] = {
        rank: i+1,
        title: $(this).find("p.tit strong").text(),
        singer: $(this).find("p.album").text(),
        album: $(this).find("a.last").text()
      };
      
    });
    console.log(titleList);
    //var jsonData = JSON.stringify(titleList);
    //fs.writeFileSync('flodata.json',jsonData);
    return titleList;
  });
  //.then(res => console.log(res)); // 저장된 결과를 출력
//var dataBuffer = fs.readFileSync('flodata.json');
//var dataJson = dataBuffer.toString();
//var data = JSON.parse(dataJson);

//console.log(data)

