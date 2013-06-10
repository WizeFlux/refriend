FriendSelect = function($scope) {
  $scope.setFriends = function(friends) { 
    $scope.$apply(function(){
      $scope.friends = friends
    });
  };
  
  $scope.loadFriends = function(uid) {
    VK.api("friends.get", {
      uid: uid,
      fields: "uid, first_name, last_name, nickname, photo"
    }, function(data) {
      $scope.setFriends(data.response);
    });
  };
};
