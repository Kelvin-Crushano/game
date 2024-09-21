let bearHasNet = false;
var isPaused = false;
var BearHealth = 100;
var isFirstTime = false;
var show = false;

$(document).ready(function () {
  $(document).keypress(function (e) { });
  BearHealth = localStorage.getItem('bearHealth');
  var isFirstTimeL2 = localStorage.getItem("isFirstTime2") ? localStorage.getItem("isFirstTime2") : false;
  playBackgroundSound(true);

  if (BearHealth <= 0) {
    window.location.href = "level1.html";
  } else {
    $(".life h4").text(BearHealth);
  }

  //Pause
  $(".pause").click(() => {
    const chopperElement = $('.chopper');
    chopperElement.css("animation-play-state", "paused");
    isPaused = true;
  })

  //Play
  $(".play").click(() => {
    const chopperElement = $('.chopper');
    chopperElement.css("animation-play-state", "running");
    isPaused = false;
  })

  //Stop
  $(".stop").click(() => {
    location.reload();
  })

  //object
  $("#ok").click(() => {
    const objectElement = $(".object");
    objectElement.css({
      "display": "none"
    })

    show = true;
  })

  //Hint
  if (!isFirstTimeL2) {
    const hintElement = $(".hint");
    hintElement.css({
      "display": "flex"
    })

    setTimeout(() => {

      hintElement.css({
        "display": "none"
      })

      localStorage.setItem("isFirstTime2", true);
    }, 4000)
  }

  const chopperElement = $('.chopper');
  const bearElement = $('.bear-con');

  if (!isPaused) {
    setInterval(function () {
      if (!isPaused) {
        if (BearHealth === 0) {
          window.location.href = "gameover.html";
        }

        var movablePos = chopperElement.offset();
        var obstaclePos = bearElement.offset();
        var distance = getDistance(movablePos, obstaclePos);

        if (distance < 100) {
          playBackgroundSound(false);
          playSound("source/sound effects/heavymachinegun-6998.mp3")
          chopperElement.css("animation-play-state", "paused");
          bearAttackAnimation();
          BearHealth -= 10;
        } else {
          chopperElement.css("animation-play-state", "running");
          stopSound();
        }

        $(".life h4").text(BearHealth);
      }
    }, 300);
  }

  if (!isPaused) {
    setInterval(function () {
      if (!isPaused) {

        var movablePos = chopperElement.offset();
        var obstaclePos = bearElement.offset();
        var distance = getDistance(movablePos, obstaclePos);

        const flameElement1 = $('.flame1');
        var flame1Position = flameElement1.offset();
        var flame1Distance = getDistance(flame1Position, obstaclePos);

        const flameElement2 = $('.flame2');
        var flame2Position = flameElement2.offset();
        var flame2Distance = getDistance(flame2Position, obstaclePos);

        if (distance < 300 && distance > 100) {
          playSound("source/sound effects/Helicopter Sound Effects - MP3_WAV FREE Download - Page 2_3.mp3")
        } else if (flame1Distance < 160) {
          playSound("source/sound effects/crackling-fireplace-nature-sounds-8012.mp3")
        } else if (flame2Distance < 160) {
          playSound("source/sound effects/crackling-fireplace-nature-sounds-8012.mp3")
        }
      }
    }, 300);
  }

    // Timer for the net visibility
  setTimeout(() => {
    var netElement = $(".net");
    netElement.css({
      "display": "none"
    })
  }, 4000)
});

let keyPressType = {
  left: "left",
  right: "right",
  up: "up",
  down: "down",
  space: "Space",
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

const BEAR_ELEMENT = $(".bear-con");
const BEAR_START_LEFT_POSITION = BEAR_ELEMENT.offset().left;
const BEAR_START_TOP_POSITION = BEAR_ELEMENT.offset().top;


function getDistance(chopper, bear) {
  var dl = chopper.left - bear.left;
  var dt = chopper.top - bear.top;
  return Math.sqrt(dl * dl + dt * dt);
}

function bearAttackAnimation() {
  var BearElement = $(".bear-con");

  // Reset the animation by setting the animation-name property to an empty string
  BearElement.css("animation-name", "");
  BearElement.css("animation-duration", "");

  BearElement.css({
    "animation": "hit-bear 0.6s linear 3",
  });
}

function hitByBarriers() {
  if (BearHealth === 0) {
    window.location.href = "gameover.html";
  }
  const flameElement1 = $('.flame1');
  var flame1Position = flameElement1.offset();

  const flameElement2 = $('.flame2');
  var flame2Position = flameElement2.offset();

  const bearElement = $(".bear-con");
  var bearPosition = bearElement.offset();

  const cactusElement = $(".cactus")
  var cactusPosition = cactusElement.offset();

  let BearIMGElement = $(".bear-con img");
  let BackgroundImg = BearIMGElement.attr("src");

  let UpBearImg1 = "source/Bear/set 2/bg1.png";
  let UpBearImg2 = "source/Bear/set 2/bg2.png";

  let UpNetBearImg1 = "source/MoveWithNet/WIthNetBack_1.png"
  let UpNetBearImg2 = "source/MoveWithNet/WIthNetBack_2.png"

  let DownBearImg1 = "source/Bear/set 1/DownBear1.png";
  let DownBearImg2 = "source/Bear/set 1/DownBear2.png";

  let DownNetBearImg1 = "source/MoveWithNet/FrontWithNet_1.png"
  let DownNetBearImg2 = "source/MoveWithNet/FrontWithNet_2.png"

  let RightBearImg1 = "source/Bear/set 1/RightBear1.png";
  let RightBearImg2 = "source/Bear/set 1/RightBear2.png";

  let RightNetBearImg1 = "source/MoveWithNet/WIthNet_R_1.png";
  let RightNetBearImg2 = "source/MoveWithNet/WIthNet_R_2.png";

  let LeftBearImg1 = "source/Bear/set 1/LeftBear1.png";
  let LeftBearImg2 = "source/Bear/set 1/LeftBear2.png";

  let LeftNetBearImg1 = "source/MoveWithNet/WIthNet_L_1.png";
  let LeftNetBearImg2 = "source/MoveWithNet/WIthNet_L_2.png";

  var newFlame1TopP = flame1Position.top; //300px for example
  var newFlame1TopP1 = flame1Position.top - flameElement1.height();
  var newFlame2TopP = flame2Position.top;
  var bearNewTopPosition = bearPosition.top + bearElement.height();
  var bearNewTopPosition1 = bearPosition.top + 50;
  var bearNewTopPosition2 = bearPosition.top + 35.5
  var cactusNewPosition = cactusPosition.left;
  var bearLeftPosition1 = bearPosition.left + bearElement.width(); //Bear width + bear left for meet cactus left position
  var cactusNewPosition2 = cactusPosition.left + cactusElement.width(); //Cactus width + cactus left for meet bear left position

  if ((bearNewTopPosition >= newFlame1TopP - 1 && bearNewTopPosition <= newFlame1TopP + 4)
    && (bearPosition.left > 159 && bearPosition.left < 250) &&
    (BackgroundImg === DownBearImg1 || BackgroundImg === DownBearImg2
      || BackgroundImg === DownNetBearImg1 || BackgroundImg === DownNetBearImg2)) {
    bearAttackAnimation();
    BearHealth -= 10;
  } else if ((bearNewTopPosition2 > newFlame1TopP1 + 1 && bearNewTopPosition2 < newFlame1TopP1 + 6)
    && (bearPosition.left > 159 && bearPosition.left < 250) &&
    (BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2
      || BackgroundImg === UpNetBearImg1 || BackgroundImg === UpNetBearImg2)) {
    bearAttackAnimation();
    BearHealth -= 10;
  } else if ((cactusNewPosition - 2 <= bearLeftPosition1 && cactusNewPosition + 2 >= bearLeftPosition1) &&
    (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2
      || BackgroundImg === RightNetBearImg1 || BackgroundImg === RightNetBearImg2) &&
    (bearPosition.top >= 428 && bearPosition.top <= 459)) {
    bearAttackAnimation();
    BearHealth -= 10
  } else if ((BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2
    || BackgroundImg === LeftNetBearImg1 || BackgroundImg === LeftNetBearImg2) &&
    (bearPosition.top >= 428 && bearPosition.top <= 459) &&
    (bearPosition.left + 20 <= cactusNewPosition2 + 2 && bearPosition.left + 20 >= cactusNewPosition2 - 2)) {
    bearAttackAnimation();
    BearHealth -= 10
  } else if ((BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2
    || BackgroundImg === UpNetBearImg1 || BackgroundImg === UpNetBearImg2) &&
    (newFlame2TopP <= bearNewTopPosition1 && newFlame2TopP + 2 >= bearNewTopPosition1) &&
    (bearPosition.left < 1000 + 2 && bearPosition.left > 898)) {
    bearAttackAnimation();
    BearHealth -= 10
  } else if ((BackgroundImg === DownBearImg1 || BackgroundImg === DownBearImg2
    || BackgroundImg === DownNetBearImg1 || BackgroundImg === DownNetBearImg2) &&
    (newFlame2TopP - 40 <= bearNewTopPosition1 && newFlame2TopP - 38 >= bearNewTopPosition1) &&
    (bearPosition.left < 1000 + 2 && bearPosition.left > 898)) {
    bearAttackAnimation();
    BearHealth -= 10
  }

  $(".life h4").text(BearHealth);
}

function BearMove(pressKey) {
  if (!isPaused) {

    let BearElement = $(".bear-con");
    let BearIMGElement = $(".bear-con img");

    let UpBearImg1 = "source/Bear/set 2/bg1.png";
    let UpBearImg2 = "source/Bear/set 2/bg2.png";

    let UpNetBearImg1 = "source/MoveWithNet/WIthNetBack_1.png"
    let UpNetBearImg2 = "source/MoveWithNet/WIthNetBack_2.png"

    let DownBearImg1 = "source/Bear/set 1/DownBear1.png";
    let DownBearImg2 = "source/Bear/set 1/DownBear2.png";

    let DownNetBearImg1 = "source/MoveWithNet/FrontWithNet_1.png"
    let DownNetBearImg2 = "source/MoveWithNet/FrontWithNet_2.png"

    let RightBearImg1 = "source/Bear/set 1/RightBear1.png";
    let RightBearImg2 = "source/Bear/set 1/RightBear2.png";

    let RightNetBearImg1 = "source/MoveWithNet/WIthNet_R_1.png";
    let RightNetBearImg2 = "source/MoveWithNet/WIthNet_R_2.png";

    let LeftBearImg1 = "source/Bear/set 1/LeftBear1.png";
    let LeftBearImg2 = "source/Bear/set 1/LeftBear2.png";

    let LeftNetBearImg1 = "source/MoveWithNet/WIthNet_L_1.png";
    let LeftNetBearImg2 = "source/MoveWithNet/WIthNet_L_2.png";

    let BearPosition = BearElement.offset();
    let BearLeft = BearPosition.left;
    let BearTop = BearPosition.top;

    let BackgroundImg = BearIMGElement.attr("src");

    if ((BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2
      || BackgroundImg === DownBearImg1 || BackgroundImg === DownBearImg2
      || BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2
      || BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2)
      && (BearLeft > 928 && BearLeft < 1000) && (BearTop <= 70 && BearTop > 50)) {

      var objectElement = $(".object");
      objectElement.css({
        "display": "flex"
      })

      var netElement = $(".net");
      netElement.css({
        "display": "block"
      })

      setTimeout(() => {
        var netElement = $(".net");
        netElement.css({
          "display": "none"
        })
      }, 3000)

    } else if (BackgroundImg === UpNetBearImg1 || BackgroundImg === UpNetBearImg2) {
      if (((BearLeft > 928 && BearLeft < 1000) && (BearTop <= 70 && BearTop > 16))
        && (BackgroundImg === UpNetBearImg1 || BackgroundImg === UpNetBearImg2)) {
        const chopperElement = $('.chopper');
        chopperElement.css("animation-play-state", "paused");
        isPaused = true;

        var completeElement = $(".win");
        completeElement.css({
          "display": "block"
        })

        localStorage.setItem("bearHealth", BearHealth);

        setTimeout(() => {
          window.location.href = "level3.html"
        }, 1500)
      }
    }

    // up key press
    if (pressKey == keyPressType.up) {
      if (bearHasNet) {
        if (BackgroundImg == UpNetBearImg1) {
          BearIMGElement.attr("src", UpNetBearImg2);
        } else {
          BearIMGElement.attr("src", UpNetBearImg1);
        }
      } else {
        if (BackgroundImg == UpBearImg1) {
          BearIMGElement.attr("src", UpBearImg2);
        } else {
          BearIMGElement.attr("src", UpBearImg1);
        }
      }

      if (BearTop > 68 && BearLeft < 215 && BearTop < 453) {
        BearTop -= 10;
        hitByBarriers();
        BearElement.css({
          top: BearTop + "px",
        });
      } else if (BearLeft > 928 && BearLeft < 1000 && BearTop > 16) {
        BearTop -= 10;
        hitByBarriers();
        BearElement.css({
          top: BearTop + "px",
        });
      }

    }

    // down key
    if (pressKey == keyPressType.down) {
      if (bearHasNet) {
        if (BackgroundImg == DownNetBearImg1) {
          BearIMGElement.attr("src", DownNetBearImg2);
        } else {
          BearIMGElement.attr("src", DownNetBearImg1);
        }
      } else {
        if (BackgroundImg == DownBearImg1) {
          BearIMGElement.attr("src", DownBearImg2);
        } else {
          BearIMGElement.attr("src", DownBearImg1);
        }
      }

      if (BearLeft > 169 && BearTop < 439) {
        BearTop += 10;
        hitByBarriers();
        BearElement.css({
          top: BearTop + "px",
        });
      } else if (BearTop >= 439) {
        BearElement.css({
          top: "440px",
        });
      }
    }

    // right key
    if (pressKey == keyPressType.right) {

      if (bearHasNet) {
        if (BackgroundImg == RightNetBearImg1) {
          BearIMGElement.attr("src", RightNetBearImg2);
        } else {
          BearIMGElement.attr("src", RightNetBearImg1);
        }
      } else {
        if (BackgroundImg == RightBearImg1) {
          BearIMGElement.attr("src", RightBearImg2);
        } else {
          BearIMGElement.attr("src", RightBearImg1);
        }
      }

      if (BearTop >= 68 && BearTop <= 92 && BearLeft >= -0.5 && BearLeft < 185.5) {
        BearLeft += 10;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
        });
      } else if ((BearTop >= 428 && BearTop <= 459) && BearLeft >= 165 && BearLeft <= 933) {
        BearLeft += 10;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
        });
      } else if (BearTop >= 68 && BearTop <= 92 && BearLeft > 185 && BearLeft < 898) {
        BearElement.css({
          left: "185.5px",
        });
      } else if (BearLeft > 944) {
        BearElement.css({
          left: "945px",
        });
      }
    }

    // left key 
    if (pressKey == keyPressType.left) {

      if (bearHasNet) {
        if (BackgroundImg == LeftNetBearImg1) {
          BearIMGElement.attr("src", LeftNetBearImg2);
        } else {
          BearIMGElement.attr("src", LeftNetBearImg1);
        }
      } else {
        if (BackgroundImg == LeftBearImg1) {
          BearIMGElement.attr("src", LeftBearImg2);
        } else {
          BearIMGElement.attr("src", LeftBearImg1);
        }
      }

      if (BearLeft < BEAR_START_LEFT_POSITION) {
        BearElement.css({
          left: BEAR_START_LEFT_POSITION + "px",
        });
      } else if ((BearLeft >= BEAR_START_LEFT_POSITION && BearLeft <= 204) &&
        (BearTop >= 75 && BearTop <= 95)) {

        BearLeft -= 10;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
        });
      } else if ((BearTop >= 428 && BearTop <= 459) && (BearLeft >= 191 && BearLeft <= 1000) &&
        (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2
          || BackgroundImg === LeftNetBearImg1 || BackgroundImg === LeftNetBearImg2)) {

        BearLeft -= 10;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
        });
      }
    }

    //Space key
    if (pressKey == keyPressType.space) {

      if ((BearTop >= 68 && BearTop <= 92 && BearLeft >= -0.5 && BearLeft < 185.5)
        && (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2
          || BackgroundImg === RightNetBearImg1 || BackgroundImg === RightNetBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        // Update the keyframes dynamically with the new top value
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

        // Apply the updated keyframes to the bear-jump animation
        // var styleSheet = document.styleSheets[0];
        // console.log("Style Sheet : ", document.styleSheets[0])
        // styleSheet.insertRule("@keyframes bear-jump {}", styleSheet.cssRules.length);
        // var animationRule = styleSheet.cssRules[styleSheet.cssRules.length - 1];
        // $.each(updatedKeyframes, function (key, value) {
        //   animationRule.appendRule(key + " { " + Object.entries(value).map(([prop, val]) => `${prop}: ${val};`).join(" ") + " }");
        // });

        BearLeft += 46.5;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "0.6s",
        });
      } else if ((BearTop >= 68 && BearTop <= 92 && BearLeft >= -0.5 && BearLeft < 185.5)
        && (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2
          || BackgroundImg === LeftNetBearImg1 || BackgroundImg === LeftNetBearImg2)) {
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

        BearLeft += 46.5;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "0.6s",
        });
      } else if ((BearTop >= 68 && BearTop <= 92) && BearLeft > 185 && BearLeft < 898 &&
        (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2
          || BackgroundImg === LeftNetBearImg1 || BackgroundImg === LeftNetBearImg2)) {
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

        BearElement.css({
          left: "185.5px",
          "animation-name": "bear-jump",
          "animation-duration": "0.6s",
        });
      } else if ((BearLeft > 169 && BearTop < 439) &&
        (BackgroundImg === DownBearImg1 || BackgroundImg === DownBearImg2
          || BackgroundImg === DownNetBearImg1 || BackgroundImg === DownNetBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop += 46.5;
        hitByBarriers();
        if (BearTop > 439) {
          BearElement.css({
            top: "440px",
            "animation-name": "bear-jump",
            "animation-duration": "0.6s",
          });
        } else {
          BearElement.css({
            top: BearTop + "px",
            "animation-name": "bear-jump",
            "animation-duration": "0.6s",
          });
        }
      } else if ((BearTop >= 428 && BearTop <= 459) && (BearLeft >= 165 && BearLeft <= 933)
        && (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2
          || BackgroundImg === RightNetBearImg1 || BackgroundImg === RightNetBearImg2)) {
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

        BearLeft += 62;
        hitByBarriers();
        if (BearLeft > 943) {
          BearElement.css({
            left: "945px",
            "animation-name": "bear-jump",
            "animation-duration": "0.6s",
          });
        } else {
          BearElement.css({
            left: BearLeft + "px",
            "animation-name": "bear-jump",
            "animation-duration": "0.6s",
          });
        }

      } else if ((BearTop >= 202 && BearTop <= 250) && (BearLeft >= 930 && BearLeft <= 960)) {
        bearHasNet = true;
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearElement.css({
          "animation-name": "catch-net",
          "animation-duration": "1s",
        })

        if (BackgroundImg == UpBearImg1 || BackgroundImg === UpBearImg2) {
          if (BackgroundImg == UpBearImg1) {
            BearIMGElement.attr("src", UpNetBearImg1);
          } else {
            BearIMGElement.attr("src", UpNetBearImg2);
          }
        } else if (BackgroundImg === DownBearImg1 || BackgroundImg === DownBearImg2) {
          if (BackgroundImg === DownBearImg1) {
            BearIMGElement.attr("src", DownNetBearImg1);
          } else {
            BearIMGElement.attr("src", DownNetBearImg1);
          }
        }
      } else if ((BearLeft > 928 && BearLeft < 1000 && BearTop > 16)
        && (BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2
          || BackgroundImg === UpNetBearImg1 || BackgroundImg === UpNetBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop -= 46.5;
        hitByBarriers();
        BearElement.css({
          top: BearTop + "px",
          "animation-name": "bear-jump",
          "animation-duration": "0.6s",
        });
      } else if ((BearTop >= 428 && BearTop <= 459) && (BearLeft >= 191 && BearLeft <= 1000) &&
        (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2
          || BackgroundImg === LeftNetBearImg1 || BackgroundImg === LeftNetBearImg2)) {
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

        BearLeft -= 62;
        hitByBarriers();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "0.6s",
        });
      } else if ((BearLeft > 184 && BearLeft <= 203) && (BearTop < 455 && BearTop >= 68)
        && (BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2
          || BackgroundImg === UpNetBearImg1 || BackgroundImg === UpNetBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop -= 46.6;
        hitByBarriers();
        if (BearTop < 67) {
          BearElement.css({
            top: "68px",
            "animation-name": "bear-jump",
            "animation-duration": "0.6s",
          });
        } else {
          BearElement.css({
            top: BearTop + "px",
            "animation-name": "bear-jump",
            "animation-duration": "0.6s",
          });
        }

      }

    }
  }

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

function playBackgroundSound(state) {
  if (!isPaused) {
    if (state) {
      var audioElement = $("#mainBackgroundAudio")[0];

      audioElement.src = "source/sound effects/Level_1,2.mp3";
      audioElement.volume = 0.1;
      audioElement.loop = true;
      audioElement.play()
    } else {
      var audioElement = $("#mainBackgroundAudio")[0];
      audioElement.pause();
    }
  }
}
