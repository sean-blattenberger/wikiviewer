var wikiApp = angular.module('wikiApp', []);

wikiApp.controller('wikiCtrl', function($scope, $http) {
  $scope.srch;
  $scope.wikiResults = [];
  $scope.srch = $scope.searchTxt;

  $scope.search = function() {
    $scope.srch = $scope.searchTxt
    $http.jsonp('http://en.wikipedia.org/w/api.php?format=jsonp&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=' + $scope.srch.toLowerCase() + '&rawcontinue=true&action=query&format=json&prop=extracts&callback=JSON_CALLBACK').success(function(data) {
      var results = data.query.pages;
      console.log(results);
      angular.forEach(results, function(v, k) {
        console.log(v.extract)
        $scope.wikiResults.push({ title: v.title, body: v.extract, page: $scope.link + v.page })
      });
    });
    $scope.srch = '';
    $scope.searchTxt = '';
  };
  
  
});




//   var req = {
//    method: 'POST',
//    url: 'https://en.wikipedia.org/w/api.php?format=json&action=query&list=search&srlimit=8&srsearch=' + $scope.srch +'&utf8=',
//    dataType: 'jsonp',
//    headers: {'Api-User-Agent':'Example/1.0'}
//   }

//   $https.jsonp(req).success(function(data){
//     console.log(data);

//   });