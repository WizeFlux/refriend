Static = function($scope) {
  $scope.people = [];
  $scope.cities = [];
  $scope.people_uids = [];
  $scope.cities_cids = [];
  $scope.people_loading = false;
  $scope.cities_loading = false;
  $scope.people_require_reload = false;
  $scope.cities_require_reload = false;
  
  $scope.person = function(uid) {
    if (_.contains($scope.people_uids, uid)) {
      return _.detect($scope.people, function(p){ return p.uid == uid });
    } else {  $scope.people_uids.push(uid)  };
  };

  $scope.city = function(cid) {
    if (_.contains($scope.cities_cids, cid)) {
      return _.detect($scope.cities, function(c){ return c.cid == cid });
    } else {  $scope.cities_cids.push(cid)  };
  };

  $scope.load_people = function() {
    if (!$scope.people_loading) {
      $scope.people_loading = true;
      setTimeout(function(){  
        VK.api("users.get", {uids: $scope.people_uids, fields: "uid, first_name, last_name, nickname, photo, photo_medium, photo_big"}, function(data) {
          $scope.$apply(function(){  $scope.people = data.response; $scope.people_loading = false  })
        });
        $scope.adjustIframeHeight();
      }, 100);      
    } else {  $scope.people_require_reload = true  }    
  };

  $scope.load_cities = function() {
    if (!$scope.cities_loading) {
      $scope.cities_loading = true;
      setTimeout(function(){  
        VK.api("places.getCityById", {cids: $scope.cities_cids}, function(data) {
          $scope.$apply(function(){  $scope.cities = data.response; $scope.cities_loading = false  })
          $scope.adjustIframeHeight();
        });
      }, 100);
    } else {  $scope.cities_require_reload = true  } 
  };


  $scope.docHeight = function() {  return document.body.offsetHeight  };
  $scope.adjustIframeHeight = function() {  VK.callMethod("resizeWindow", 800, $scope.docHeight())  }
  $scope.people_uids_size = function() {  return $scope.people_uids.length  };
  $scope.cities_cids_size = function() {  return $scope.cities_cids.length  };
  
  $scope.$watch('people_uids_size()', function(nV, oV) {if(nV > 0){  $scope.load_people()  }});
  $scope.$watch('cities_cids_size()', function(nV, oV) {if(nV > 0){  $scope.load_cities()  }});
  $scope.$watch('docHeight()', function(nV, oV) {  $scope.adjustIframeHeight()  });
};