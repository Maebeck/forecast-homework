var searchData = "";
function citySearch(searchData) {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchData + "&appid=a6364729079252b0dc5b1f4530452fb4"
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
function previousCity(){
    $("#searchBtn").on("click", function(save){
        save.preventDefault();
        var previousCity = [];
        cityLast = $('#searchInput').val().trim();
        localStorage.setItem("#searchInput", JSON.stringify(previousCity));
        console.log(localStorage);
        var retrievedData = localStorage.getItem(previousCity);
        var cityLast2 = JSON.parse(retrievedData);
        console.log(cityLast2.length);
    })
}