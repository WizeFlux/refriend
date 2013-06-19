QueryForm = function($scope, $http) {
  $scope.scope = 'all';
  
  $scope.loadedCities = [];
  $scope.selectedCity = {};
  $scope.cityComboBoxOpen = false;
  
  $scope.tags = [];
  $scope.selectedTags = [];
  $scope.tagComboBoxOpen = false;
  
  $scope.tasks = [];
  $scope.pages = 0;
  $scope.page = 1;
  
  $scope.$watch('citySearch', function(newValue, oldValue) {  $scope.loadCities()  });
  $scope.$watch('selectedCity', function(newValue, oldValue) {  $scope.listUpdate()  });
  $scope.$watch('scope', function(newValue, oldValue) {  $scope.listUpdate()  });
  $scope.$watch('selectedTags', function(newValue, oldValue) {  $scope.listUpdate()  });

  $scope.listUpdate = function() {
    $http.post('tasks/json', {query:{
      cid: $scope.selectedCity.cid,
      scope: $scope.scope,
      tags: $scope.selectedTags
    }}).success(function(data){
      $scope.tasks = data.tasks;
      console.log(data.tasks)
      $scope.pages = data.pagination.pages;
      $scope.page = data.pagination.page;
    });
  };
  
  $scope.activeIf = function(value) {
    if (value == $scope.scope) {return 'active'} else {return ''}
  };

  $scope.selectCity = function(city) {
    $scope.selectedCity = city;
    $scope.cityComboBoxOpen = false;
    $scope.citySearch = '';
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

  $scope.loadTags = function(tags) {  $scope.tags = tags  };
  $scope.clearTags = function() {  $scope.selectedTags = []  };
  $scope.deselectTag = function(tag) {  $scope.selectedTags = _.without($scope.selectedTags, tag)  };
  
  $scope.selectTag = function(tag) {
    $scope.selectedTags = _.union($scope.selectedTags, [tag]);
    $scope.tagComboBoxOpen = false;
    $scope.tagSearch = '';
  };
};
