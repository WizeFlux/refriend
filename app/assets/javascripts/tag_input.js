TagInput = function($scope) {
  $scope.tags = [];
  $scope.tagInput = '';
  $scope.selectedTags = [];
  
  $scope.add = function(tag) {
    $scope.selectedTags = _.union($scope.selectedTags, [tag]);
    $scope.tagSearch = '';
  };
  
  $scope.loadTags = function(tags) {  $scope.tags = tags  };
  $scope.clearTags = function() {  $scope.selectedTags = []  };
  $scope.deselectTag = function(tag) {  $scope.selectedTags = _.without($scope.selectedTags, tag)  };
  
  $scope.selectTag = function(tag) {
    $scope.selectedTags = _.union($scope.selectedTags, [tag]);
    $scope.tagComboBoxOpen = false;
    $scope.tagSearch = '';
  };
};
