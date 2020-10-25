var searchData = "";

function citySearch(searchData) {
    var queryURL: "https://api.openweathermap.org/data/2.5/forecast?q="+ searchData + "&appid=a6364729079252b0dc5b1f4530452fb4"
$.ajax({
    url:queryURL,
    method: "GET",
}).then(function(response){
    console.log(response);
})
}
$("#searchBtn").on("click", function(e){
e.preventDefault();
searchData = $('#searchInput').val();
citySearch(searchData);
console.log(searchData);
});

citySearch();
