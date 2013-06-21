QueryForm = function($scope, $http) {
  $scope.userMenuOpen = false
  
  $scope.loadedCities = [];
  $scope.selectedCity = {};
  $scope.cityComboBoxOpen = false;
  
  $scope.tags = [];
  $scope.selectedTags = [];
  
  $scope.tasks = [];
  $scope.pages = 0;
  $scope.page = 1;
  
  $scope.$watch('citySearch', function(newValue, oldValue) {  $scope.loadCities()  });
  $scope.$watch('selectedCity', function(newValue, oldValue) {  $scope.listUpdate(1)  });
  $scope.$watch('scope', function(newValue, oldValue) {  $scope.listUpdate(1)  });
  $scope.$watch('selectedTags', function(newValue, oldValue) {  $scope.listUpdate(1)  });
  $scope.$watch('page', function(newValue, oldValue) {  $scope.listUpdate(newValue)  });

  $scope.listUpdate = function(page) {
    $http.post('tasks/json', {page: page, query:{
      cid: $scope.selectedCity.cid,
      scope: $scope.scope,
      tags: $scope.selectedTags
    }}).success(function(data){
      $scope.tasks = data.tasks;
      $scope.pages = data.pagination.pages;
      $scope.page = data.pagination.page;
    });
  };
  
  $scope.pageUp = function() {
    if ($scope.page != $scope.pages) {$scope.page = $scope.page + 1}
  };
  
  $scope.pageDown = function() {
    if ($scope.page != 1) {$scope.page = $scope.page - 1}
  };
  
  $scope.activeIf = function(condition) {
    if (condition) {return ' active'} else {return ''}
  };

  $scope.disabledIf = function(condition) {
    if (condition) {return ' disabled'} else {return ''}
  };


  $scope.selectCity = function(city) {
    $scope.selectedCity = city;
    $scope.cityComboBoxOpen = false;
    $scope.citySearch = '';
  };

  $scope.preloadCity = function(cid) {
    if (cid != undefined) {
      VK.api("places.getCityById", {cids: cid}, function(data) {
        $scope.selectCity({  title: data.response[0].name, cid: data.response[0].cid  });
        $scope.$digest();
      });
    } else {
      VK.api("users.get", {uids: currentPersonUid, fields: "city"}, function(data) {
        VK.api("places.getCityById", {cids: data.response[0].city}, function(data) {
          $scope.selectCity({  title: data.response[0].name, cid: data.response[0].cid  });
          $scope.$digest();
        });
      });
    }
  };
  
  $scope.loadCities = function() {
    VK.api("places.getCities", {country: 1, q: $scope.citySearch}, function(data) {
      $scope.$apply(function() {  $scope.loadedCities = data.response  });
    });
  };

  $scope.loadTags = function(tags) {  $scope.tags = tags  };
  $scope.clearTags = function() {  $scope.selectedTags = []  };
  $scope.deselectTag = function(tag) {  $scope.selectedTags = _.without($scope.selectedTags, tag)  };
  
  $scope.selectTag = function(tag) {
    $scope.selectedTags = _.union($scope.selectedTags, [tag]);
    $scope.tagComboBoxOpen = false;
    $scope.tagSearch = '';
  };
};
