People = function($scope) {
  $scope.people = [];
  $scope.loaded_uids = []
  
  $scope.person = function(uid) {
    if (_.contains($scope.loaded_uids, uid)) {
      return _.detect($scope.people, function(p){ return p.uid == uid });
    } else {
      $scope.loadPerson(uid);
    };
  };

  $scope.loadPerson = function(uid) {
    $scope.loaded_uids.push(uid);
    VK.api("users.get", {uids: uid, fields: "uid, first_name, last_name, nickname, photo"}, function(data) {
      $scope.$apply(function(){  $scope.people.push(data.response[0])  });
    });
  };
};
