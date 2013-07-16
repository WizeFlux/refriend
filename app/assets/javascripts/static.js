Static = function($scope) {
  $scope.people = [];
  $scope.people_uids = [];
  $scope.people_loading = false;
  $scope.people_require_reload = false;

  $scope.adjustIframeSize = function() {  
    VK.callMethod("resizeWindow", 800, document.body.offsetHeight + 100); 
  }


  $scope.person = function(uid) {
    if (_.contains($scope.people_uids, uid)) {
      return _.detect($scope.people, function(p){ return p.uid == uid });
    } else {  $scope.people_uids.push(uid)  };
  };

  $scope.people_uids_size = function() {
    return $scope.people_uids.length
  };

  $scope.load_people = function() {
    if (!$scope.people_loading) {
      $scope.people_loading = true;
      setTimeout(function(){  
        VK.api("users.get", {uids: $scope.people_uids, fields: "uid, first_name, last_name, nickname, photo, photo_medium, photo_big"}, function(data) {
          $scope.$apply(function(){  $scope.people = data.response; $scope.people_loading = false  });
          if ($scope.people_require_reload) {  $scope.load_people()  }
          else {  $scope.adjustIframeSize()  }
        });
      }, 100);      
    } else {  $scope.people_require_reload = true  }    
  };

  $scope.$watch('people_uids_size()', function(newValue, oldValue) {
    if (newValue > 0) {  $scope.load_people()  }
  });


  $scope.cities = [];
  $scope.cities_cids = [];
  $scope.cities_loading = false;
  $scope.cities_require_reload = false;

  $scope.city = function(cid) {
    if (_.contains($scope.cities_cids, cid)) {
      return _.detect($scope.cities, function(c){ return c.cid == cid });
    } else {  $scope.cities_cids.push(cid)  };
  };

  $scope.cities_cids_size = function() {
    return $scope.cities_cids.length
  };
  
  $scope.load_cities = function() {
    if (!$scope.cities_loading) {
      $scope.cities_loading = true;
      setTimeout(function(){  
        VK.api("places.getCityById", {cids: $scope.cities_cids}, function(data) {
          $scope.$apply(function(){  $scope.cities = data.response; $scope.cities_loading = false  });
          if ($scope.cities_require_reload) {  $scope.load_cities()  }
          else {  $scope.adjustIframeSize()  }
        });
      }, 100);
    } else {  $scope.cities_require_reload = true  } 
  };
  
  
  $scope.$watch('cities_cids_size()', function(newValue, oldValue) {
    if (newValue > 0) {  $scope.load_cities()  }
  });
};