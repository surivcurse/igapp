app.controller('igController', function($scope, Facebook, $timeout, $interval) {
  $scope.isLogin = LoginStatus.checked;
  $scope.loadingText = "loading";
  $scope.indexOfCover = 0;
  $scope.result = {
    title: 'อัพเตส กันหน่อย!!',
    subtitle: 'เกรียนๆมัน ฮาๆ',
    msg: ""
  };
  $scope.templateSize = {
    x: 612,
    y: 612
  };

  $scope.templateIndex = 0;
  $scope.selectOnHTMLindex = 0;

  var coverSize = {
    x: 612,
    y: 612
  };

  var coversProperty = [{
      backgroundImage: "images/b.jpg",
      primaryColor: "black",
      secondaryColor: "#DEBB2C",
      focusFrameColor: "#FF0000"
    }, {
      backgroundImage: "images/db.jpg",
      background2: "#F7F3F3",
      primaryColor: "#2D3F66",
      secondaryColor: "#F7F3F3"
    }, {
      backgroundImage: "images/y.jpg",
      background2: "#F7F3F3",
      primaryColor: "#2D3F66",
      secondaryColor: "#F7F3F3"
    }

  ];

  var bg = new Image();


  $scope.selectTheme = function(index) {
    $scope.indexOfCover = index;
    drawBackground();
    $scope.redraw();
  };
  $scope.confirmShare = function() {
    $scope.shareconfirm = !$scope.shareconfirm;
  };

  // $scope.shareResult = function(){
  //     $scope.isLoading = true;
  //     var c = document.getElementById("resultCanvas");
  //     var data = c.toDataURL('image/png');
  //     var encodedPng = data.substring(data.indexOf(',')+1,data.length);
  //     var decodedPng = Base64Binary.decode(encodedPng);
  //     PostImageToFacebook($scope.userToken,"result.png","image/png",decodedPng,$scope.result.msg,$scope.makeCover());
  // };

  $scope.downloadImage = function() {
    downloadCanvas(this, 'resultCanvas', 'cover-football.png');
  };

  var drawBackground = function(onComplete) {
    bg.src = coversProperty[$scope.indexOfCover].backgroundImage;
    bg.width = 612;
    bg.height = 612;
    ctx.drawImage(bg, 0, 0);
    if (onComplete) {
      onComplete();
    }
  };

  var drawText = function(onComplete) {
    var shiftY = 0;

    var centerPos = {
      x: coverSize.x / 2,
      y: coverSize.y / 2 + shiftY
    };


    var text = $scope.result.title;
    ctx.fillStyle = coversProperty[$scope.indexOfCover].primaryColor;
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;

    ctx.font = "normal 96px MAX_PINJOHN";
    if ($scope.indexOfCover == 1) {
      ctx.font = "normal 106px MAX_PINJOHN";
    }
    var textWidth = (ctx.measureText(text).width);


    if (textWidth > coverSize.x) {
      var fontsize = 138;
      while (textWidth > coverSize.x - 80) {
        ctx.font = "normal " + fontsize + "px MAX_PINJOHN";
        fontsize -= 2;
        textWidth = (ctx.measureText(text).width);

        if (textWidth < coverSize.x - 80) {
          ctx.fillText(text, centerPos.x, centerPos.y - 30);
        }
      }

    } else {

      if ($scope.indexOfCover == 1) {
        ctx.fillText(text, centerPos.x, centerPos.y - 32);
      } else {
        ctx.fillText(text, centerPos.x, centerPos.y - 30);
      }
    }

    ctx.font = "normal 42px MAX_PINJOHN";
    var subText = $scope.result.subtitle;
    var subtextWidth = (ctx.measureText(subText).width);
    var rectHeight = 46;
    ctx.beginPath();
    ctx.rect((centerPos.x - subtextWidth / 2) - 20, centerPos.y + 5, subtextWidth + 40, rectHeight);
    ctx.fillStyle = coversProperty[$scope.indexOfCover].primaryColor;
    ctx.fill();
    ctx.fillStyle = coversProperty[$scope.indexOfCover].secondaryColor;
    ctx.fillText(subText, centerPos.x, centerPos.y + 40);

  }

  $scope.redraw = function(index) {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.rect(0, 0, c.width, c.height);
    drawBackground();
    drawText();
  };


  $scope.logout = function() {
    Facebook.logout(function(response) {
      getLoginStatus();
    });

  };

  $scope.login = function() {
    Facebook.login(function(response) {
      if (response.status == 'connected') {
        $scope.isLogin = LoginStatus.loggin;

        getLoginStatus();
      }
    }, {
      scope: 'publish_actions,user_photos',
      return_scopes: true
    })
  };



  var setDimension = function() {
    coverSize = $scope.templateSize;
    if (window.devicePixelRatio == 2 || true) {
      c.width = coverSize.x * 2;
      c.height = coverSize.y * 2;
      c.style.width = coverSize + "px";
      ctx.scale(2, 2);

    }

  };
  var getLoginStatus = function() {
    c = document.getElementById("resultCanvas");
    ctx = c.getContext("2d");

    setDimension();
    $scope.redraw();
    $scope.$watch('result', function(newVal, oldVal) {
      $scope.redraw();
    }, true);
    $interval(function() {
      $scope.redraw();
    }, 3000);
    Facebook.getLoginStatus(function(response) {

      if (response.status === 'connected') {
        $scope.isLogin = LoginStatus.loggin;
        $scope.userToken = response.authResponse.accessToken;

        Facebook.api('me/', function(res) {



        });

      } else {
        console.log();
        $scope.isLogin = LoginStatus.logout;
      }
    })
  };

  setTimeout(function() {
    if (!IsLoadedFonts('MAX_PINJOHN')) {

    }
  }, 100);
  getLoginStatus();

  document.getElementById('download').addEventListener('click', function() {
    downloadCanvas(this, 'resultCanvas', 'football.png');
  }, false);
}); //end angular script


function IsLoadedFonts() {
  var Args = arguments;
  var obj = document.getElementById('fontCanvas');
  var ctx = obj.getContext("2d");
  var baseFont = (/chrome/i.test(navigator.userAgent)) ? 'time new roman' : 'arial';
  //................
  function getImg(fon) {
    ctx.clearRect(0, 0, (obj).width, (obj).height);
    ctx.fillStyle = 'rgba(0,0,0,1.0)';
    ctx.fillRect(0, 0, 40, 40);
    ctx.font = '20px ' + fon;
    ctx.textBaseline = "top";
    ctx.fillStyle = 'rgba(255,255,255,1.0)';
    ctx.fillText('\u0630', 18, 5);
    return ctx.getImageData(0, 0, 40, 40);
  };
  //..............
  for (var i1 = 0; i1 < Args.length; i1++) {
    data1 = getImg(Args[i1]);
    data2 = getImg(baseFont);
    var isLoaded = false;
    //...........
    for (var i = 0; i < data1.data.length; i++) {
      if (data1.data[i] != data2.data[i]) {
        isLoaded = true;
        break;
      }
    }
    //..........
    if (!isLoaded)
      return false;
  }
  return true;
};
