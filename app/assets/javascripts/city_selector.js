CitySelector = function($scope) {
  
  $scope.loadedCities = [];
  $scope.selectedCity = {};
  $scope.cityComboBoxOpen = false;
  
  $scope.$watch('citySearch', function(newValue, oldValue) {  $scope.loadCities()  });
  
  $scope.selectCity = function(city) {
    $scope.selectedCity = city;
    $scope.cityComboBoxOpen = false;
    $scope.citySearch = '';
  };

  $scope.activeIf = function(condition) {
    if (condition) {return ' active'} else {return ''}
  };

  $scope.preloadCity = function(cid) {
    VK.api("places.getCityById", {cids: cid}, function(data) {
      $scope.selectCity({  title: data.response[0].name, cid: data.response[0].cid  });
    });      
  };
  
  $scope.loadCities = function() {
    VK.api("places.getCities", {country: 1, q: $scope.citySearch}, function(data) {
      $scope.$apply(function() {  $scope.loadedCities = data.response  });
    });
  };
};
