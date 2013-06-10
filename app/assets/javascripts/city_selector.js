CitySelector = function($scope) {
  $scope.loadedCities = [];
  $scope.preloadedCity = [];
  $scope.loading = false;
  
  $scope.allCities = [{
    title: 'All cities',
    cid: 'all'
  }];
  
  VK.api("places.getCityById", {cids: currentPersonCid}, function(data) {
    $scope.$apply(function(){
      debugger
      $scope.preloadedCity = data.response;
      $scope.preloadedCity[0].selected = true;
    });
  });
  
  $scope.$watch('search', function(newValue, oldValue){  $scope.loadCities();  });
  
  
  $scope.cities = function() {
    return $scope.allCities.concat(  $scope.preloadedCity, $scope.loadedCities  )
  };
  
  $scope.loadCities = function() {
    VK.api("places.getCities", {country: 1, q: $scope.search}, function(data) {
      $scope.$apply(function(){ $scope.loadedCities = data.response });
    });    
  };
  
  $scope.selectedCity = function() {
    return _.detect($scope.cities(), function(c){ return c.selected == true })
  };
  
  $scope.displaySearch = function() {
    return (typeof $scope.selectedCity() == 'undefined');
  };
  
  $scope.hide = function(city) {
    if ($scope.selectedCity()) {
      return city != $scope.selectedCity()
    } else {
      return false
    }
  };
  
};
