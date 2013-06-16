Static = function($scope) {
  $scope.people = [];
  $scope.people_uids = []
  
  $scope.cities = [];
  $scope.cities_cids = []

  $scope.city = function(cid) {
    if (_.contains($scope.cities_cids, cid)) {
      return _.detect($scope.cities, function(c){ return c.cid == cid });
    } else {  $scope.cities_cids.push(cid)  };
  };

  $scope.person = function(uid) {
    if (_.contains($scope.people_uids, uid)) {
      return _.detect($scope.people, function(p){ return p.uid == uid });
    } else {  $scope.people_uids.push(uid)  };
  };
  
  $scope.$watch('people_uids', function(newValue, oldValue) {
    setTimeout(function(){
      if (newValue == $scope.people_uids) {
        VK.api("users.get", {uids: $scope.people_uids, fields: "uid, first_name, last_name, nickname, photo, photo_medium, photo_big"}, function(data) {
          $scope.$apply(function(){  $scope.people = data.response  });
        }); 
      };
    }, 500);
  });
  
  $scope.$watch('cities_cids', function(newValue, oldValue) {
    setTimeout(function(){
      if (newValue == $scope.cities_cids) {
        VK.api("places.getCityById", {cids: $scope.cities_cids}, function(data) {
          $scope.$apply(function() {  $scope.cities = data.response  });
        });
      };
    }, 500);
  });
};