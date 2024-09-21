let BearLeft = 0;
let BearTop = 0;

let HunterLeft = 0;
let HunterTop = 0;

let BearHealth = 100;

let isPaused = false;

$(document).ready(function () {
  $(document).keypress(function (e) { });
  $(".life h4").text(BearHealth);
  var isFirstTime = localStorage.getItem("isFirstTime") ? localStorage.getItem("isFirstTime") : false;
  var audioElement = $("#mainBackgroundAudio")[0];
  playBackgroundSound(true, audioElement);

  //Pause
  $(".pause").click(() => {
    const hunterElement = $('.hunter');
    hunterElement.css("animation-play-state", "paused");
    isPaused = true;
  })

  //Pause
  $(".play").click(() => {
    const hunterElement = $('.hunter');
    hunterElement.css("animation-play-state", "running");
    isPaused = false;
  })

  //Stop
  $(".stop").click(() => {
    location.reload();
  })

  //Hint
  if (!isFirstTime) {
    const hintElement = $(".hint");
    hintElement.css({
      "display": "flex"
    })

    setTimeout(() => {
      hintElement.css({
        "display": "none"
      })

      localStorage.setItem("isFirstTime", true);
    }, 4000)
  }

  const hunterElement = $('.hunter');
  const bearElement = $('.bear-con');

  if (!isPaused) {
    setInterval(function () {
      if (BearHealth === 0) {
        window.location.href = "gameover.html";
      }

      var hunterPos = hunterElement.offset();
      var bearPos = bearElement.offset();
      var distance = getDistance(hunterPos, bearPos);

      if (distance < 100) {
        playBackgroundSound(false, audioElement);
        playSound("source/sound effects/heavymachinegun-6998.mp3")
        hunterElement.css("animation-play-state", "paused");
        bearAttackAnimation();
        BearHealth -= 10;
      } else {
        if (!isPaused) {
          hunterElement.css("animation-play-state", "running");
          stopSound();
        }
      }

      $(".life h4").text(BearHealth);
    }, 300);
  }

});

function getDistance(hunter, bear) {
  var dl = hunter.left - bear.left;
  var dt = hunter.top - bear.top;
  return Math.sqrt(dl * dl + dt * dt);
}

let keyPressType = {
  left: "left",
  right: "right",
  up: "up",
  down: "down",
  space: "Space"
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
    case 32:
      //   alert("Space key");
      BearMove(keyPressType.space);
      break;
  }


};

let FixedBearElement = $(".bear-con");
const BEAR_POSITION = FixedBearElement.offset();
const FIXED_BEAR_LEFT = BEAR_POSITION.left;
const FIXED_BEAR_TOP = BEAR_POSITION.top;
const FIXED_BEAR_RIGHT = FIXED_BEAR_LEFT + FixedBearElement.width();
const BEAR_HEIGHT = FixedBearElement.height();

function bearJumpRemoveClass(BearElement) {
  setTimeout(function () {
    BearElement.css("animation-name", null);
    BearElement.css("animation-duration", null);
  }, 1500)
}

function bearAttackAnimation() {
  var BearElement = $(".bear-con");

  // Reset the animation by setting the animation-name property to an empty string
  BearElement.css("animation", "");
  BearElement.css("animation-name", "");
  BearElement.css("animation-duration", "");

  BearElement.css({
    "animation": "hit-bear 0.6s linear 3",
  });
}

function playSound(sound) {
  if (!isPaused) {
    var audioElement = $("#backgroundAudio")[0];

    audioElement.src = sound;
    audioElement.volume = 0.1;
    audioElement.loop = true;
    audioElement.play();
  }
}

function stopSound() {
  if (!isPaused) {
    var audioElement = $("#backgroundAudio")[0];
    audioElement.pause();
  }
}

function playBackgroundSound(state, element) {
  if (!isPaused) {

    if (state) {
      element.src = "source/sound effects/Level_1,2.mp3";
      element.volume = 0.1;
      element.loop = true;
      element.play();
    } else {
      element.pause();
    }
  }
}

function playMoveSound() {
  if (!isPaused) {
    var audioElement = $("#backgroundAudio")[0];

    audioElement.src = "source/sound effects/heavymachinegun-6998.mp3";
    audioElement.volume = 0.1;
    audioElement.loop = false;
    audioElement.play();
  }
}

function BearMove(pressKey) {
  if (!isPaused) {
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

    if (BearLeft >= 900 && BearTop >= 340) {
      const hunterElement = $('.hunter');
      hunterElement.css("animation-play-state", "paused");
      isPaused = true;

      var completeElement = $(".win");
      completeElement.css({
        "display": "block"
      })

      localStorage.setItem("bearHealth", BearHealth);

      setTimeout(() => {
        window.location.href = "Level2.html"
      }, 1500)

    }

    let hitWithCactus = function (bearLeftP, bearTopP) {
      if (BearHealth === 0) {
        window.location.href('gameover.html')
      }

      let cactus1Ele = $(".cactus1");
      let cactus2Ele = $(".cactus2");
      let cactus3Ele = $(".cactus3");

      const CACTUS1_POSITION = cactus1Ele.offset();
      const CACTUS2_POSITION = cactus2Ele.offset();
      const CACTUS3_POSITION = cactus3Ele.offset();

      var newBearLeftP = bearLeftP + 15; //To bring same left of bear and cactus
      var newBearTop = Math.ceil(bearTopP) + 42; //To bring same top of bear and cactus
      var newBearLeftP2 = bearLeftP - 70; //To bring same left of cactus 3 left and bear left
      var newCactusLeftP = CACTUS3_POSITION.left - 52;

      if ((newBearLeftP === CACTUS1_POSITION.left && newBearLeftP < (cactus1Ele.width() + 15)) &&
        (newBearTop === CACTUS1_POSITION.top)) {

        BearHealth -= 10;
        bearAttackAnimation();
      } else if ((newBearLeftP === CACTUS1_POSITION.left && newBearLeftP < (cactus1Ele.width() + 15)) &&
        (newBearTop === CACTUS2_POSITION.top)) {
        BearHealth -= 10;
        bearAttackAnimation();
      } else if (bearLeftP + 62 === CACTUS3_POSITION.left) {
        BearHealth -= 10;
        bearAttackAnimation();
      } else if (bearLeftP === CACTUS3_POSITION.left - 52 ||
        newBearLeftP2 >= newCactusLeftP && newCactusLeftP + 5 >= newBearLeftP2) {
        BearHealth -= 10;
        bearAttackAnimation();
      }

      $(".life h4").text(BearHealth);
    }

    // up key press
    if (pressKey == keyPressType.up) {

      if (BackgroundImg == UpBearImg1) {
        BearIMGElement.attr("src", UpBearImg2);
      } else {
        BearIMGElement.attr("src", UpBearImg1);
      }

      // Path Restriction    
      if (BearTop <= 46) {
        hitWithCactus(BearLeft, BearTop);
        BearElement.css({
          top: "46px",
        });
      } else {
        BearTop -= 10
        hitWithCactus(BearLeft, BearTop);
        BearElement.css({
          top: BearTop + "px",
        });
      }

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

      //Path Restriction
      if (BearTop >= 40 && BearLeft < FIXED_BEAR_LEFT + 60 && BearTop < FIXED_BEAR_TOP) {
        BearTop += 10;
        BearElement.css({
          top: BearTop + "px",
        });
      } else if (BearLeft > 823 && BearLeft < 930 && BearTop < 341) {
        BearTop += 10;
        BearElement.css({
          top: BearTop + "px",
        });
      }
      // else if ((BearTop >= 340 && BearTop < 348) && (BearLeft > 908 && BearLeft < 930)) {
      //   if (BearHealth === 0) {
      //     window.location.href('gameover.html')
      //   }
      // }

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

      // path restriction 1
      if (BearLeft <= FIXED_BEAR_LEFT + 60 && BearTop < 88 && BearLeft <= 930) {
        BearLeft += 10;
        hitWithCactus(BearLeft, BearTop)
        BearElement.css({
          left: BearLeft + "px"
        })
      } else if (BearLeft >= 930) {
        hitWithCactus(BearLeft, BearTop)
        BearElement.css({
          left: "930px"
        })
      } else if (BearLeft <= 930 && BearTop < 95) {
        BearLeft += 10;
        hitWithCactus(BearLeft, BearTop)
        BearElement.css({
          left: BearLeft + "px"
        })
      }

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

      // path restriction 
      if (BearLeft > FIXED_BEAR_LEFT && BearTop < 76) {

        BearLeft -= 10;

        hitWithCactus(BearLeft, BearTop);
        BearElement.css({
          left: BearLeft + "px",
        });
      }
    }

    //  space bar press
    if (pressKey == keyPressType.space) {
      if ((BearLeft < FIXED_BEAR_RIGHT && BearTop > 40) && (BackgroundImg == UpBearImg1 || BackgroundImg == UpBearImg2)) {
        BearTop -= 72;

        if ((BearTop === 46 || BearTop < 46) && !(BackgroundImg == DownBearImg1 || BackgroundImg == DownBearImg2)) {
          // Reset the animation by setting the animation-name property to an empty string
          BearElement.css("animation-name", "");
          BearElement.css("animation-duration", "");

          hitWithCactus(BearLeft, BearTop);

          BearElement.css({
            top: "46px",
            "animation-name": "bear-jump",
            "animation-duration": "1s",
          });

        } else if ((BackgroundImg == UpBearImg1 || BackgroundImg == UpBearImg2)) {
          // Reset the animation by setting the animation-name property to an empty string
          BearElement.css("animation-name", "");
          BearElement.css("animation-duration", "");

          hitWithCactus(BearLeft, BearTop);

          BearElement.css({
            top: BearTop + "px",
            "animation-name": "bear-jump",
            "animation-duration": "1s",
          });

        }

      } else if (BearLeft > 858 && (BackgroundImg == DownBearImg1 || BackgroundImg == DownBearImg2)) {

        if (BearLeft === 930 || BearLeft > 930) {
          BearElement.css("animation-name", "");
          BearElement.css("animation-duration", "");

          BearTop += 72;

          hitWithCactus(BearLeft, BearTop);

          BearElement.css({
            top: "930px",
            "animation-name": "bear-jump",
            "animation-duration": "1s",
          });
        }
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop += 72;

        hitWithCactus(BearLeft, BearTop);

        BearElement.css({
          top: BearTop + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });

      } else if (BearLeft < 26
        && (BackgroundImg == DownBearImg1 || BackgroundImg == DownBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop += 72;

        hitWithCactus(BearLeft, BearTop);

        BearElement.css({
          top: BearTop + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });

      } else if (BearLeft > 15.5 && BearLeft < 915
        && (BackgroundImg == RightBearImg1 && BearTop < 110 || BackgroundImg == RightBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        // // Update the keyframes dynamically with the new top value
        // var updatedKeyframes = {
        //   '0%': {
        //     top: BearTop + "px",
        //   },
        //   '50%': {
        //     top: (BearTop - 10) + "px",
        //   },
        //   '100%': {
        //     top: BearTop,
        //   }
        // };

        // // Apply the updated keyframes to the bear-jump animation
        // var styleSheet = document.styleSheets[0];
        // styleSheet.insertRule("@keyframes bear-jump {}", styleSheet.cssRules.length);
        // var animationRule = styleSheet.cssRules[styleSheet.cssRules.length - 1];
        // $.each(updatedKeyframes, function (key, value) {
        //   animationRule.appendRule(key + " { " + Object.entries(value).map(([prop, val]) => `${prop}: ${val};`).join(" ") + " }");
        // });

        BearLeft += 72;

        hitWithCactus(BearLeft, BearTop);

        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });


      } else if (BearLeft > FIXED_BEAR_RIGHT && BearLeft < 858
        && (BackgroundImg == LeftBearImg1 || BackgroundImg == LeftBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        // // Update the keyframes dynamically with the new top value
        // var updatedKeyframes = {
        //   '0%': {
        //     top: BearTop + "px",
        //   },
        //   '50%': {
        //     top: (BearTop - 10) + "px",
        //   },
        //   '100%': {
        //     top: BearTop,
        //   }
        // };

        // // Apply the updated keyframes to the bear-jump animation
        // var styleSheet = document.styleSheets[0];
        // styleSheet.insertRule("@keyframes bear-jump {}", styleSheet.cssRules.length);
        // var animationRule = styleSheet.cssRules[styleSheet.cssRules.length - 1];
        // $.each(updatedKeyframes, function (key, value) {
        //   animationRule.appendRule(key + " { " + Object.entries(value).map(([prop, val]) => `${prop}: ${val};`).join(" ") + " }");
        // });

        BearLeft -= 72;

        hitWithCactus(BearLeft, BearTop);
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      }

    }
  }
}








