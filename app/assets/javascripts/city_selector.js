CitySelector = function($scope) {
  
  $scope.loadedCities = [];
  $scope.selectedCity = {};
  
  $scope.$watch('search', function(newValue, oldValue) {  $scope.loadCities()  });
  
  $scope.select = function(city) {
    $scope.selectedCity = city;
    $scope.comboBoxOpen = false;
  };

  $scope.preloadCity = function(cid) {
    VK.api("places.getCityById", {cids: cid}, function(data) {
      // $scope.$apply(function() {
        $scope.select({  title: data.response[0].name, cid: data.response[0].cid  });
      // });
    });      
  };
  
  $scope.loadCities = function() {
    VK.api("places.getCities", {country: 1, q: $scope.search}, function(data) {
      $scope.$apply(function() {  $scope.loadedCities = data.response  });
    });
  };
  
  // $scope.loadedCities = [];
  // $scope.preloadedCity = [];
  // $scope.loading = false;
  // 
  // $scope.allCities = [{
  //   title: 'Все города',
  //   cid: 'all',
  //   selected: false
  // }];
  // 

  // 
  // 
  // 
  // $scope.cities = function() {
  //   return $scope.allCities.concat($scope.preloadedCity, $scope.loadedCities)
  // };
  // 

  // 
  // $scope.selectedCity = function() {
  //   return _.detect($scope.cities(), function(c) {  return c.selected == true  });
  // };
  // 
  // $scope.displaySearch = function() {
  //   return (typeof $scope.selectedCity() == 'undefined');
  // };
  // 
  // $scope.hide = function(city) {
  //   if ($scope.selectedCity()) {  return city != $scope.selectedCity()  } else {  return false  };
  // };
  // 
  // $scope.select = function(city) {
  //   if (city.selected) {  city.selected = false  } else {  city.selected = true  };
  // };
};
