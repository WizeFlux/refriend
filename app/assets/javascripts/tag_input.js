TagInput = function($scope) {
  $scope.tags = [];
  $scope.tagInput = '';
  
  $scope.add = function(tag) {
    $scope.tags = _.union($scope.tags, [tag]);
  };
  
  $scope.remove = function(tag) {
    $scope.tags = _.without($scope.tags, tag);
  };
  
  
};
