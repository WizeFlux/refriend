TagsSelector = function($scope) {
  $scope.tags = [];
  $scope.comboBoxOpen = false;

  $scope.loadTags = function(tags) {  $scope.tags = tags;  };
  
  $scope.select = function(tag) {
    tag.selected = true;
    $scope.comboBoxOpen = false;
    $scope.search = '';
  };
  
  $scope.selectedTags = function() {
    return _.select($scope.tags, function(tag){  return tag.selected == true  })
  };
  
  $scope.clear = function() {
    _.each($scope.tags, function(tag){ tag.selected = false})
  };
};
