$(function() {


var people = [];

$.getJSON('melondata.json', function(data) {
    $.each(data.person, function(i, f) {
       var tblRow = "<tr>" + "<td>" + f.firstName + "</td>" + "</tr>"
        $(tblRow).appendTo("#rank_chart");
    });

    });

});