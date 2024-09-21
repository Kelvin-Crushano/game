
$(document).ready(function () {
  $(document).keypress(function (e) {});

  hunterMove();
});

let keyPressType = {
  left: "left",
  right: "right",
  up: "up",
  down: "down",
};

document.onkeydown = function (event) {
  switch (event.keyCode) {
    case 37:
      //   alert("Left key");
      BearMove(keyPressType.left);
      break;
    case 38:
      //   alert("Up key");
      BearMove(keyPressType.up);
      break;
    case 39:
      //   alert("Right key");
      BearMove(keyPressType.right);
      break;
    case 40:
      //   alert("Down key");
      BearMove(keyPressType.down);
      break;
  }
};

function BearMove(pressKey) {
  let BearElement = $(".bear-con");
  let BearIMGElement = $(".bear-con img");

  let UpBearImg1 = "source/Bear/set 2/bg1.png";
  let UpBearImg2 = "source/Bear/set 2/bg2.png";

  let DownBearImg1 = "source/Bear/set 1/DownBear1.png";
  let DownBearImg2 = "source/Bear/set 1/DownBear2.png";

  let RightBearImg1 = "source/Bear/set 1/RightBear1.png";
  let RightBearImg2 = "source/Bear/set 1/RightBear2.png";

  let LeftBearImg1 = "source/Bear/set 1/LeftBear1.png";
  let LeftBearImg2 = "source/Bear/set 1/LeftBear2.png";

  let BearPosition = BearElement.offset();
  let BearLeft = BearPosition.left;
  let BearTop = BearPosition.top;

  let BackgroundImg = BearIMGElement.attr("src");

        // up key press
  if (pressKey == keyPressType.up) {
    if (BackgroundImg == UpBearImg1) {
      BearIMGElement.attr("src", UpBearImg2);
    } else {
      BearIMGElement.attr("src", UpBearImg1);
    }

    BearTop -= 10;
    BearElement.css({
      top: BearTop + "px",
    });
  }

  // down key

  if (pressKey == keyPressType.down) {
    if (BackgroundImg == DownBearImg1) {
      BearIMGElement.attr("src", DownBearImg2);
    } else if (BackgroundImg == DownBearImg2) {
      BearIMGElement.attr("src", DownBearImg1);
    } else {
      BearIMGElement.attr("src", DownBearImg2);
    }

    BearTop += 10;
    BearElement.css({
      top: BearTop + "px",
    });
  }

      // right key
  if (pressKey == keyPressType.right) {
    if (BackgroundImg == RightBearImg1) {
      BearIMGElement.attr("src", RightBearImg2);
    } else if (BackgroundImg == RightBearImg2) {
      BearIMGElement.attr("src", RightBearImg1);
    } else {
      BearIMGElement.attr("src", RightBearImg1);
    }

    BearLeft += 10;
    BearElement.css({
      left: BearLeft + "px",
    });
  }

        // left key 
  if (pressKey == keyPressType.left) {
    if (BackgroundImg == LeftBearImg1) {
      BearIMGElement.attr("src", LeftBearImg2);
    } else if (BackgroundImg == LeftBearImg2) {
      BearIMGElement.attr("src", LeftBearImg1);
    } else {
      BearIMGElement.attr("src", LeftBearImg1);
    }

    BearLeft -= 10;
    BearElement.css({
      left: BearLeft + "px",
    });
  }


  console.log("left : " + BearLeft + " , Top : " + BearTop );
  
   }

// var HunterPosition = 0;
function hunterMove(){

  let HunderElement = $("#hunterImg");

  let leftIndex = 0, RightIndex = 0, FrontIndex = 0, BackIndex = 0;

  let IntervelId = setInterval(() => { 

    
  HunterPosition = HunderElement.offset();
  let HunterLeft = HunterPosition.left;
  let HunterTop = HunterPosition.top;

  let BackgroundImg = HunderElement.attr("src");

  let HunterimgLeft = [
    "source/Hunter/hunter saw left 1.png",
    "source/Hunter/hunter saw left 2.png",
    "source/Hunter/hunter saw left 3.png",
    "source/Hunter/hunter saw left 4.png",
      ]

  
  let HunterimgBack = [
    "source/Hunter/hunter back 1.png",
    "source/Hunter/hunter back 2.png",
  ]
  
  let HunterimgRight= [
    "source/Hunter/hunter saw right 1.png",
    "source/Hunter/hunter saw right 2.png",
    "source/Hunter/hunter saw right 3.png",
    "source/Hunter/hunter saw right 4.png",
  ]
  
  let HunterimgFront= [
    "source/Hunter/hunter front 1.png",
    "source/Hunter/hunter front 2.png",
  ]


  if(HunterTop > 35 && HunterLeft > 500){

    
    HunterTop -= 10;
    HunderElement.css({
      top: HunterTop + "px",
    });

    HunderElement.attr("src", HunterimgBack[FrontIndex]); 


    FrontIndex += 1;
    if(FrontIndex == 2){
      FrontIndex = 0;
    }

    // console.log("step 1");
    // console.log(HunterTop +"- "+ HunterLeft);

  }else if( HunterTop == 28 && HunterLeft > 60 ){
    // alert("i am working");
      
    HunterLeft -= 10;
    HunderElement.css({
      left: HunterLeft + "px",
    });
    
    
    
    HunderElement.attr("src", HunterimgLeft[leftIndex]); 


    leftIndex += 1;
    if(leftIndex == 4){
      leftIndex = 0;
    }

    
    // console.log("step 2");
    // console.log(HunterTop +"- "+ HunterLeft);

   }
  else if(HunterTop < 350 && HunterLeft > 20){
    

    
    HunterTop += 10;
    HunderElement.css({
      top: HunterTop + "px",
    });

    
    HunderElement.attr("src", HunterimgFront[FrontIndex]); 


    FrontIndex += 1;
    if(FrontIndex == 2){
      FrontIndex = 0;
    }
    
    // console.log("step 3");
    // console.log(HunterTop +"- "+ HunterLeft);

  }
  else if(HunterTop > 255 && HunterLeft < 500){
    HunterLeft += 10;
    HunderElement.css({
      left: HunterLeft + "px",
    });

    
    HunderElement.attr("src", HunterimgRight[RightIndex]); 


    RightIndex += 1;
    if(RightIndex == 4){
      RightIndex = 0;
    }
    
    // console.log("step 1");
      // console.log(HunterTop +"- "+ HunterLeft);
      
        }
    }, 120);

  }
