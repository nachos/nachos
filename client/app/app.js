'use strict';

angular.module('nachosApp', ['ngMaterial'])
  .run(function (fs, server) {
    //fs.open("E:\\a\\_Afrojack_-_Rock_The_House_Original_Mix_.mp3");

    server.start();
  });