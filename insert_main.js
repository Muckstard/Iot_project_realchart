var mysql = require('mysql');

var connection = mysql.createConnection({
    host    :'203.234.62.143',
    port : 3306,
    user : 'daegyun',
    password : '4886',
    database:'realchart',
    insecureAuth: true
  });
//DB에 저장된 데이터 불러와서 배열에 저장
var melonsql = 'select * from realchart.melon;';
var geniesql = 'select * from realchart.genie;';
var data_melon = [];
var data_genie = [];
var data = [];
var  r = 0;
connection.connect();
    connection.query(melonsql,function(err,rows,fields) {
        if(err) 
          console.log(err);
        else {
            
            for(var i=0; i <rows.length; i++) {
                data_melon[i] = {
                    rank: rows[i].ranking,
                    title: rows[i].title,
                    singer: rows[i].singer,
                    album: rows[i].album
                }
            }
        }
    });
    connection.query(geniesql,function(err,rows,fields) {
        if(err) 
          console.log(err);
        else {
            
            for(var i=0; i <rows.length; i++) {
                data_genie[i] = {
                    rank: rows[i].ranking,
                    title: rows[i].title,
                    singer: rows[i].singer,
                    album: rows[i].album
                }
            }
        }
    });
 //realchart에 들어갈 순위 계산 알고리즘
setTimeout(function sumdata() {
    for(var g = 0; g < data_genie.length; g++) {
        g_title = data_genie[g].title;
        g_value = g_title.replace(/ /gi,"");
        var rg = 100000 / data_genie[g].rank;
        data[r] = {
            rating: parseInt(rg.toFixed()),
            title: data_genie[g].title,
            singer: data_genie[g].singer,
            album: data_genie[g].album
        };
        r++
        for(var m = 0; m < data_melon.length; m++) {
            m_title = data_melon[m].title;
            m_value = m_title.replace(/ /gi,"");
            var rm = 100000 / data_melon[m].rank;
            if(g_value == m_value) {
                var plus = rg + rm;
                data[g] = {
                    rating: parseInt(plus.toFixed()),
                    title: data_melon[m].title,
                    singer: data_melon[m].singer,
                    album: data_melon[m].album
                };
            };
            if(m == data_melon.length -1) {
                if(g_value != m_value) {
                    data[r] = {
                        rating: parseInt(rm.toFixed()),
                        title: data_melon[m].title,
                        singer: data_melon[m].singer,
                        album: data_melon[m].album
                    };
                    
                };
            };       
        }; 
    };
    //계산된 배열을 점수순으로 정렬
    var sortingField = "rating";
    data.sort(function(a,b) {
        return b[sortingField] - a[sortingField];
    });

    //정렬된 데이터 DB에 저장
    for(var i =0; i< data.length; i++) {
        var rank = i+1;
        var rating = data[i].rating;
        var title = data[i].title;
        var singer = data[i].singer;
        var album = data[i].album;
        var sql = 'INSERT INTO realchart.real VALUES(?,?,?,?,?)';
        var params = [rank,rating, title, singer,album];//파라미터를 값들로 줌(배열로 생성)
        connection.query(sql,params,function(err,rows,fields) {
        if(err) 
          console.log(err);
        })
      }
      connection.end();
    console.log(data)
}, 1000);