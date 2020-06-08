const axios = require("axios");
const cheerio = require("cheerio");

// axios를 활용해 AJAX로 HTML 문서를 가져오는 함수 구현
async function getHTML() {
  try {
    return await axios.get("https://www.melon.com/chart/week/index.htm");
  } catch (error) {
    console.error(error);
  }
}

// getHTML 함수 실행 후 데이터에서
// body > main > div > section > ul > li > article > h2 > a
// 에 속하는 제목을 titleList에 저장
getHTML()
  .then(html => {
    let titleList = [];
    const $ = cheerio.load(html.data);
    // ul.list--posts를 찾고 그 children 노드를 bodyList에 저장
    const bodyList = $("tbody tr");

    // bodyList를 순회하며 titleList에 h2 > a의 내용을 저장
    bodyList.each(function(i, elem) {
      titleList[i] = {
        rank: i+1,
        title: $(this).find("div.ellipsis.rank01 a").text(),
        singer: $(this).find("div.ellipsis.rank02 a").text(),
        album: $(this).find("div.ellipsis.rank03 a").text()
      };
    });
    return titleList;
  })
  //.then(res => console.log(res)); // 저장된 결과를 출력

