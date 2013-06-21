Static = function($scope) {
  $scope.people = [];
  $scope.people_uids = [];
  $scope.people_loading = false;

  $scope.person = function(uid) {
    if (_.contains($scope.people_uids, uid)) {
      return _.detect($scope.people, function(p){ return p.uid == uid });
    } else {  $scope.people_uids.push(uid)  };
  };

  $scope.people_uids_size = function() {
    return $scope.cities_cids.length
  }

  $scope.$watch('people_uids_size()', function(newValue, oldValue) {
    if (newValue > 0) {
      if (!$scope.people_loading) {
        $scope.people_loading = true;
        setTimeout(function(){
          $scope.people_loading = false;
          VK.api("users.get", {uids: $scope.people_uids, fields: "uid, first_name, last_name, nickname, photo, photo_medium, photo_big"}, function(data) {
            $scope.$apply(function(){  $scope.people = data.response  });
          });
        }, 1000);      
      }
    }
  });


  $scope.cities = [];
  $scope.cities_cids = [];
  $scope.cities_loading = false;

  $scope.city = function(cid) {
    if (_.contains($scope.cities_cids, cid)) {
      return _.detect($scope.cities, function(c){ return c.cid == cid });
    } else {  $scope.cities_cids.push(cid)  };
  };

  $scope.cities_cids_size = function() {
    return $scope.cities_cids.length
  };
  
  $scope.$watch('cities_cids_size()', function(newValue, oldValue) {
    if (newValue > 0) {
      if (!$scope.cities_loading) {
        $scope.cities_loading = true;
        setTimeout(function(){
          $scope.cities_loading = false;
          VK.api("places.getCityById", {cids: $scope.cities_cids}, function(data) {
            $scope.$apply(function(){  $scope.cities = data.response  });
          });
        }, 1000);      
      }
    }
  });
};