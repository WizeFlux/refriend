TagsSelector = function($scope) {
  $scope.tags = [];
  $scope.comboBoxOpen = false;
  
  $scope.$watch('search', function(newValue, oldValue) {
    if (newValue == undefined || newValue == '') {
      $scope.comboBoxOpen = false;
    } else {$scope.comboBoxOpen = true}
  });
  
  $scope.toggleComboBox = function() {
    $scope.comboBoxOpen = !$scope.comboBoxOpen;
  };
  
  $scope.loadTags = function(tags) {
    $scope.tags = tags;
  };
  
  $scope.select = function(tag) {
    tag.selected = true;
    $scope.search = '';
  };
};
