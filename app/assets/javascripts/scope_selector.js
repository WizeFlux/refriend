ScopeSelector = function($scope) {
  $scope.scope = 'all';
  
  $scope.activeIf = function(value) {
    if (value == $scope.scope) {return 'active'} else {return ''}
  };
};
