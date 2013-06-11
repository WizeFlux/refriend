TagsSelector = function($scope) {
  $scope.tags = [];
  
  $scope.loadTags = function(tags) {
    _.each(tags, function(tag){  $scope.tags.push(tag)  });
  };
};
