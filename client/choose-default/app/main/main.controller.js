'use strict';

angular.module('chooseDefaultWindow')
  .controller('main', function ($mdDialog) {
    $mdDialog.show({
      controller: 'chooseDefault',
      templateUrl: 'app/dialog/dialog.html',
      clickOutsideToClose: false,
      hasBackdrop: false
    });
  });