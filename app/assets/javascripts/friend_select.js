FriendSelect = function($scope) {
  $scope.friends = [];
  
  $scope.setFriends = function(friends) { 
    $scope.$apply(function(){  $scope.friends = friends  });
  };
  
  $scope.selectedFriend = function() {
    return _.detect($scope.friends, function(c) {  return c.selected == true  });
  };
  
  $scope.show = function(friend) {
    if ($scope.selectedFriend()) {  return friend == $scope.selectedFriend()  } else {  return true  };
  };
  
  $scope.select = function(friend) {
    if (friend.selected) {  friend.selected = false  } else {  friend.selected = true  };
  };
    
  $scope.displaySearch = function() {
    return ($scope.friends.length > 1) && (typeof $scope.selectedFriend() == 'undefined');
  };
  
  $scope.loadFriends = function(uid) {
    VK.api("friends.get", {uid: uid, fields: "uid, first_name, last_name, nickname, photo"}, function(data) {
      $scope.setFriends(data.response);
    });
  };
};
