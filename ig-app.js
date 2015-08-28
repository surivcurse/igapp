app.controller('igController', function($scope, Facebook, $timeout, $interval) {
    $scope.isLogin = LoginStatus.checked;
    $scope.loadingText = "loading";
    $scope.indexOfCover = 0;
    $scope.result = {
        title:'อัพเตส กันหน่อย!!',
        subtitle:'เกรียนๆมัน ฮาๆ ตามประสา',
        msg:""
    };
    $scope.templateSize = {x:612,y:612};

    $scope.templateIndex = 0;
    $scope.selectOnHTMLindex = 0;

    var coverSize = {x:612,y:612};

    var coversProperty = [
        {
            backgroundImage:"images/b.jpg",
            primaryColor:"black",
            secondaryColor:"#DEBB2C",
            focusFrameColor:"#FF0000"
        },
        {
            backgroundImage:"images/db.jpg",
            background2:"#F7F3F3",
            primaryColor:"#2D3F66",
            secondaryColor:"#F7F3F3"
        },
        {
            backgroundImage:"images/y.jpg",
            background2:"#F7F3F3",
            primaryColor:"#2D3F66",
            secondaryColor:"#F7F3F3"
        }

    ];
    $scope.selectTheme = function(index){
        $scope.indexOfCover = index;
        $scope.redraw();
    };

    $scope.confirmShare = function(){
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

    $scope.downloadImage = function(){
        downloadCanvas(this, 'resultCanvas', 'cover-freelance.png');
    };

    // $scope.makeCover = function(){
    //     $scope.loadingText = "กำลังแชร์รูปภาพ และ ส่งคุณไปยังหน้า Facebook";
    //     $timeout(function(){Facebook.api('me/albums?fields=name&limit=100',function(res){
    //         angular.forEach(res.data,function(item){
    //             if (item.name == 'quiz@gth Photos') {
    //                 profileAlbumId = item.id;
    //                 Facebook.api(item.id+'/photos?fields=images,link',function(res){
    //                     var targetImage = res.data[0].id;

    //                     window.location = 'https://www.facebook.com/profile.php?preview_cover=' + targetImage;
    //                     $scope.isLoading = false;
    //                 });
    //             }
    //         });
    //     });},1000)
    // };

    $scope.redraw = function(index){

        // setDimension();
         var shiftY = 0;
        // if($scope.indexOfCover == 1){
        //     shiftY = +5;
        // }
          var centerPos = {x:coverSize.x/2,y:coverSize.y/2 + shiftY };


          var text = $scope.result.title;

            var imageObj = new Image();
            imageObj.src = coversProperty[$scope.indexOfCover].backgroundImage;
            imageObj.width = 612;
            imageObj.height = 612;
            ctx.drawImage(imageObj,0,0);
            // var stage = new createjs.Stage("resultCanvas");
            // var bitmap = new createjs.Bitmap(imageObj);
            // stage.addChild(bitmap);
            // stage.update();

         //ctx.clearRect(0, 0, c.width, c.height);
         //ctx.rect(0,0,c.width,c.height);
        // background draw


         ctx.fillStyle =  coversProperty[$scope.indexOfCover].primaryColor;
         ctx.textAlign = 'center';
         ctx.lineWidth = 1;

/*
         var text = text.split("").join(String.fromCharCode(8202)+String.fromCharCode(8202)+String.fromCharCode(8202));

         var sara = [
             'ั','ื','่'  ,'ุ' ,'ู'  , 'ี'  ,'้' , '๊'  ,  'ิ'
             ,'็' ,'๋'
         ];
         var processTxt = '';
         for (var ch = 0 ; ch < text.split("").length ; ch++){
             var chara = text.split("")[ch];
             var addSpace = true;
             for(var i = 0;i < sara.length;i++){
                 if(sara[i] == chara){
                     addSpace = false
                 }
             }
             if(addSpace){

                 processTxt =  processTxt + String.fromCharCode(8202) + String.fromCharCode(8202) + chara;


             }else{
                 processTxt = processTxt + chara;
             }
         }
         text = processTxt;
*/
         ctx.font = "normal 96px MAX_PINJOHN";
         if($scope.indexOfCover == 1){
             ctx.font = "normal 106px MAX_PINJOHN";
         }
         var textWidth = (ctx.measureText(text).width);


         if(textWidth > coverSize.x){
             var fontsize = 138;
             while(textWidth > coverSize.x - 80){
                 ctx.font = "normal "+fontsize+"px MAX_PINJOHN";
                 fontsize-=2;
                 textWidth = (ctx.measureText(text).width);

                 if(textWidth < coverSize.x - 80){
                     ctx.fillText(text, centerPos.x, centerPos.y - 30 );
                 }
             }

         }else{

             if($scope.indexOfCover == 1){
                 ctx.fillText(text, centerPos.x, centerPos.y - 32 );
             }else{
                 ctx.fillText(text, centerPos.x, centerPos.y - 30 );
             }
         }
        //ctx.strokeText(text, centerPos.x, centerPos.y - 32);



        // // Draw Text corner frame
        // var leftSizeText = (coverSize.x/2 - textWidth/2 ) - 30;
        // var rightSizeText = (coverSize.x/2 + textWidth/2 ) + 30;
        // var lineStartY;
        // var lineHeight = 20;
        // ctx.lineWidth = 1.5;
        // ctx.fillStyle = coversProperty[$scope.indexOfCover].background;/**/

        // if($scope.indexOfCover == 0){
        //     ctx.strokeStyle = coversProperty[$scope.indexOfCover].focusFrameColor;
        //     lineStartY = centerPos.y - 30;
        //     ctx.beginPath();
        //     ctx.moveTo(leftSizeText,lineStartY);
        //     ctx.lineTo(leftSizeText,lineStartY + lineHeight);
        //     ctx.lineTo(leftSizeText + lineHeight,lineStartY + lineHeight);
        //     ctx.stroke();
        //     lineStartY = centerPos.y - 80;
        //     ctx.beginPath();
        //     ctx.moveTo(leftSizeText,lineStartY);
        //     ctx.lineTo(leftSizeText,lineStartY - lineHeight);
        //     ctx.lineTo(leftSizeText + lineHeight,lineStartY - lineHeight);
        //     ctx.stroke();
        //     lineStartY = centerPos.y - 80;
        //     ctx.beginPath();
        //     ctx.moveTo(rightSizeText,lineStartY);
        //     ctx.lineTo(rightSizeText,lineStartY - lineHeight);
        //     ctx.lineTo(rightSizeText - lineHeight,lineStartY - lineHeight);
        //     ctx.stroke();
        //     lineStartY = centerPos.y - 30;
        //     ctx.beginPath();
        //     ctx.moveTo(rightSizeText,lineStartY);
        //     ctx.lineTo(rightSizeText,lineStartY + lineHeight);
        //     ctx.lineTo(rightSizeText - lineHeight,lineStartY + lineHeight);
        //     ctx.stroke();
        // }

        // Draw black label เฮ้อ อยากกินเหล้าจุง
         ctx.font = "normal 42px MAX_PINJOHN";
         var subText = $scope.result.subtitle;
         var subtextWidth = (ctx.measureText(subText).width);
         var rectHeight = 46;
         ctx.beginPath();
         ctx.rect((centerPos.x - subtextWidth/2) - 20,centerPos.y + 5,subtextWidth+40,rectHeight);
         ctx.fillStyle = coversProperty[$scope.indexOfCover].primaryColor;
         ctx.fill();
         ctx.fillStyle = coversProperty[$scope.indexOfCover].secondaryColor;
         ctx.fillText(subText, centerPos.x, centerPos.y + 40);

        // Draw Square

        // if($scope.indexOfCover == 1){
        //     ctx.drawImage(mouseCursor,((centerPos.x + subtextWidth/2) - 20),centerPos.y - 5 + rectHeight + 2,18,28);


        //     var recs =[
        //         {
        //             x:(centerPos.x - subtextWidth/2) - 22,
        //             y:centerPos.y + 2,
        //             w:5,
        //             h:5
        //         },
        //         {
        //             x:(centerPos.x),
        //             y:centerPos.y + 2,
        //             w:5,
        //             h:5
        //         },
        //         {
        //             x:(centerPos.x + subtextWidth/2) + 18,
        //             y:centerPos.y + 2,
        //             w:5,
        //             h:5
        //         },
        //         {
        //             x:(centerPos.x - subtextWidth/2) - 22,
        //             y:centerPos.y + rectHeight + 2,
        //             w:5,
        //             h:5
        //         },
        //         {
        //             x:(centerPos.x),
        //             y:centerPos.y + rectHeight + 2,
        //             w:5,
        //             h:5
        //         },
        //         {
        //             x:(centerPos.x + subtextWidth/2) + 18,
        //             y:centerPos.y + rectHeight + 2,
        //             w:5,
        //             h:5
        //         }
        //     ];

        //     angular.forEach(recs,function(rec){
        //         ctx.beginPath();
        //         ctx.rect(rec.x,rec.y,rec.w,rec.h);
        //         ctx.strokeStyle = coversProperty[$scope.indexOfCover].secondaryColor;
        //         ctx.lineWidth = 1;
        //         ctx.strokeRect(rec.x,rec.y,rec.w,rec.h);
        //         ctx.fillStyle = coversProperty[$scope.indexOfCover].primaryColor;
        //         ctx.fill();
        //     });

        // }

        // ctx.font = "normal 32px MAX_PINJOHN";
        // var tagText = $scope.result.tagText;
        // var tagTextWidth = (ctx.measureText(tagText).width);
        // ctx.fillStyle = coversProperty[$scope.indexOfCover].primaryColor;
        // ctx.fillText(tagText, centerPos.x, centerPos.y + rectHeight + 38);
        // ctx.fillStyle ="rgba(0, 0, 0, 0.4)";
        // ctx.font = "normal 8px thaisans_neueregular";
        // ctx.textAlign = 'right';
        // ctx.fillText('#FreelanceTheMovie',coverSize.x-5,coverSize.y-15);
        // ctx.fillText('http://freelancethemovie.com/facebookcover',coverSize.x-5,coverSize.y-5);

        var data = c.toDataURL('image/png');
        var image = new Image();
        image.src = data;
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').appendChild(image);

    };


     $scope.logout = function(){
         Facebook.logout(function(response){
             getLoginStatus();
         });

     };

     $scope.login = function(){
         Facebook.login(function(response){
                 if (response.status == 'connected') {
                     $scope.isLogin = LoginStatus.loggin;

                     getLoginStatus();
                 }
             },
             {
                 scope: 'publish_actions,user_photos',
                 return_scopes: true
             })
     };



    var setDimension = function(){
        coverSize = $scope.templateSize;
        if(window.devicePixelRatio == 2 || true){
            c.width = coverSize.x*2;
            c.height = coverSize.y*2;
            c.style.width = coverSize +"px";
            ctx.scale(2,2);

        }

    };
     var getLoginStatus = function() {
         c = document.getElementById("resultCanvas");
         ctx = c.getContext("2d");

         setDimension();
         $scope.redraw();
         $scope.$watch('result', function(newVal, oldVal){
             $scope.redraw();
         }, true);
         $interval(function(){
             $scope.redraw();
         },3000);
         Facebook.getLoginStatus(function(response) {

             if(response.status === 'connected') {
                 $scope.isLogin = LoginStatus.loggin;
                 $scope.userToken = response.authResponse.accessToken;

                 Facebook.api('me/',function(res){



                 });

             } else {
                 console.log();
                 $scope.isLogin = LoginStatus.logout;
             }
         })
     };

     setTimeout(function(){
         console.log('ฮั่นแน่ ใครมาแอบอ่าน'+IsLoadedFonts('MAX_PINJOHN'));
         if(!IsLoadedFonts('MAX_PINJOHN')){

         }
     },100);
     getLoginStatus();

    document.getElementById('download').addEventListener('click', function() {
        downloadCanvas(this, 'resultCanvas', 'freelance-cover.png');
    }, false);
});//end angular script


function IsLoadedFonts()
{
    var Args = arguments;
    var obj = document.getElementById('fontCanvas');
    var ctx = obj.getContext("2d");
    var baseFont = (/chrome/i.test(navigator.userAgent))?'time new roman':'arial';
    //................
    function getImg(fon)
    {
        ctx.clearRect(0, 0, (obj).width, (obj).height);
        ctx.fillStyle = 'rgba(0,0,0,1.0)';
        ctx.fillRect( 0, 0, 40, 40 );
        ctx.font = '20px '+ fon;
        ctx.textBaseline = "top";
        ctx.fillStyle = 'rgba(255,255,255,1.0)';
        ctx.fillText( '\u0630', 18, 5 );
        return ctx.getImageData( 0, 0, 40, 40 );
    };
    //..............
    for(var i1=0; i1<Args.length; i1++)
    {
        data1 = getImg(Args[i1]);
        data2 = getImg(baseFont);
        var isLoaded = false;
        //...........
        for (var i=0; i<data1.data.length; i++)
        {
            if(data1.data[i] != data2.data[i])
            {isLoaded = true; break;}
        }
        //..........
        if(!isLoaded)
            return false;
    }
    return true;
};
