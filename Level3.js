let BearHealth = 100;
var isPaused = false;

$(document).ready(function () {
  $(document).keypress(function (e) { });

  BearHealth = localStorage.getItem('bearHealth');
  var isFirstTimeL3 = localStorage.getItem("isFirstTime3") ? localStorage.getItem("isFirstTime3") : false;
  playBackgroundSound(true);

  if (BearHealth <= 0) {
    window.location.href = "level1.html";
  } else {
    $(".life h4").text(BearHealth);
  }

  //Pause
  $(".pause").click(() => {
    const bee1Element = $(".bee1");
    const bee2Element = $(".bee2");
    const bee3Element = $(".bee3");
    bee1Element.css("animation-play-state", "paused");
    bee2Element.css("animation-play-state", "paused");
    bee3Element.css("animation-play-state", "paused");
    isPaused = true;
  })

  //Pause
  $(".play").click(() => {
    const bee1Element = $(".bee1");
    const bee2Element = $(".bee2");
    const bee3Element = $(".bee3");
    bee1Element.css("animation-play-state", "running");
    bee2Element.css("animation-play-state", "running");
    bee3Element.css("animation-play-state", "running");
    isPaused = false;
  })

  //Stop
  $(".stop").click(() => {
    window.location.href = "level1.html";
  })

  //Hint
  if (!isFirstTimeL3) {
    const hintElement = $(".hint");
    hintElement.css({
      "display": "flex"
    })

    setTimeout(() => {

      hintElement.css({
        "display": "none"
      })

      localStorage.setItem("isFirstTime3", true);
    }, 4000)
  }

  const bee1Element = $('.bee1');
  const bee2Element = $('.bee2');
  const bee3Element = $('.bee3');
  const bearElement = $('.bear-con');

  if (!isPaused) {
    setInterval(function () {
      if (!isPaused) {
        if (BearHealth === 0) {
          window.location.href = "gameover.html";
        }

        var bearPosition = bearElement.offset();

        var bee1Position = bee1Element.offset();
        var bee2Position = bee2Element.offset();
        var bee3Position = bee3Element.offset();

        var bee1PositionDistance = getDistance(bee1Position, bearPosition);
        var bee2PositionDistance = getDistance(bee2Position, bearPosition);
        var bee3PositionDistance = getDistance(bee3Position, bearPosition);

        //distance < 300 && distance > 100
        if (bee1PositionDistance < 75) {
          playBackgroundSound(false);
          playSound("source/sound effects/041488_bees-60482.mp3")
          bee1Element.css("animation-play-state", "paused");
          bearAttackAnimation();
          BearHealth -= 10;
        } else if (bee2PositionDistance < 75) {
          playBackgroundSound(false);
          playSound("source/sound effects/041488_bees-60482.mp3")
          bee2Element.css("animation-play-state", "paused");
          bearAttackAnimation();
          BearHealth -= 10;
        } else if (bee3PositionDistance < 75) {
          playBackgroundSound(false);
          playSound("source/sound effects/041488_bees-60482.mp3")
          bee3Element.css("animation-play-state", "paused");
          bearAttackAnimation();
          BearHealth -= 10;
        } else {
          bee1Element.css("animation-play-state", "running");
          bee2Element.css("animation-play-state", "running");
          bee3Element.css("animation-play-state", "running");
          stopSound();
        }

        $(".life h4").text(BearHealth);
      }
    }, 300);
  }

  if (!isPaused) {
    setInterval(function () {
      if (!isPaused) {

        var flameElement = $(".flame1");
        var flamePosition = flameElement.offset();
        var bearPosition = bearElement.offset();

        var bee1Position = bee1Element.offset();
        var bee2Position = bee2Element.offset();
        var bee3Position = bee3Element.offset();

        var bee1PositionDistance = getDistance(bee1Position, bearPosition);
        var bee2PositionDistance = getDistance(bee2Position, bearPosition);
        var bee3PositionDistance = getDistance(bee3Position, bearPosition);

        var flameDistance = getDistance(flamePosition, bearPosition);

        if (bee1PositionDistance < 160) {
          playSound("source/sound effects/041488_bees-60482.mp3")
        } else if (bee2PositionDistance < 160) {
          playSound("source/sound effects/041488_bees-60482.mp3")
        } else if (bee3PositionDistance < 160) {
          playSound("source/sound effects/041488_bees-60482.mp3")
        } else if (flameDistance < 160) {
          playSound("source/sound effects/crackling-fireplace-nature-sounds-8012.mp3")
        }

        $(".life h4").text(BearHealth);
      }
    }, 300);
  }


});

function getDistance(bee, bear) {
  var dl = bee.left - bear.left;
  var dt = bee.top - bear.top;
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
    case 17:
      //   alert("Ctrl key");
      AttackBee();
      break;
  }
};

function AttackBee() {
  changeAvatar();
  const bee1Element = $('.bee1');
  const bee2Element = $('.bee2');
  const bee3Element = $('.bee3');
  const bearElement = $('.bear-con');

  var bearPosition = bearElement.offset();

  var bee1Position = bee1Element.offset();
  var bee2Position = bee2Element.offset();
  var bee3Position = bee3Element.offset();

  var bee1PositionDistance = getDistance(bee1Position ? bee1Position : 0, bearPosition);
  var bee2PositionDistance = getDistance(bee2Position ? bee2Position : 0, bearPosition);
  var bee3PositionDistance = getDistance(bee3Position ? bee3Position : 0, bearPosition);

  if (bee1PositionDistance < 150) {
    bee1Element.remove(); //To remove bee element from dom element
  } else if (bee2PositionDistance < 150) {
    bee2Element.remove();
  } else if (bee3PositionDistance < 150) {
    bee3Element.remove();
  }
}

function changeAvatar() {
  const bearElement = $('.bear-con');

  let BearIMGElement = $(".bear-con img");

  let UpBearImg1 = "source/MoveWithNet/WIthNetBack_1.png"
  let UpBearImg2 = "source/MoveWithNet/WIthNetBack_2.png"

  let DownBearImg1 = "source/MoveWithNet/FrontWithNet_1.png"
  let DownBearImg2 = "source/MoveWithNet/FrontWithNet_2.png"

  let RightBearImg1 = "source/MoveWithNet/WIthNet_R_1.png";
  let RightBearImg2 = "source/MoveWithNet/WIthNet_R_2.png";

  let LeftBearImg1 = "source/MoveWithNet/WIthNet_L_1.png";
  let LeftBearImg2 = "source/MoveWithNet/WIthNet_L_2.png";

  let BackgroundImg = BearIMGElement.attr("src");

  BearIMGElement.hide()

  if (BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2) {
    bearElement.css({
      "animation": "attackBackLeft 0.6s linear 1"
    })
  } else if (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2) {
    bearElement.css({
      "animation": "attackSideRight 0.6s linear 1"
    })
  }
  else if (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2) {
    bearElement.css({
      "animation": "attackSideLeft 0.6s linear 1"
    })
  }

  setTimeout(() => {
    bearElement.css("animation", "");
    BearIMGElement.show()
  }, 1100)

}

const BEAR_ELEMENT = $(".bear-con");
const FIXED_BEAR_POSITION = BEAR_ELEMENT.offset();
const FIXED_BEAR_LEFT = FIXED_BEAR_POSITION.left;
const FIXED_BEAR_TOP = FIXED_BEAR_POSITION.top;

function hitByObstacles() {
  if (BearHealth === 0) {
    window.location.href = "gameover.html";
  }
  let BearIMGElement = $(".bear-con img");

  let UpBearImg1 = "source/MoveWithNet/WIthNetBack_1.png"
  let UpBearImg2 = "source/MoveWithNet/WIthNetBack_2.png"

  let DownBearImg1 = "source/MoveWithNet/FrontWithNet_1.png"
  let DownBearImg2 = "source/MoveWithNet/FrontWithNet_2.png"

  let RightBearImg1 = "source/MoveWithNet/WIthNet_R_1.png";
  let RightBearImg2 = "source/MoveWithNet/WIthNet_R_2.png";

  let LeftBearImg1 = "source/MoveWithNet/WIthNet_L_1.png";
  let LeftBearImg2 = "source/MoveWithNet/WIthNet_L_2.png";

  let BackgroundImg = BearIMGElement.attr("src");

  var bearElement = $(".bear-con");
  var bearPosition = $(".bear-con").offset();
  var bearLeft = bearPosition.left;
  var bearTop = bearPosition.top;

  var cactus1Position = $(".cactus1").offset();
  var cactus1Element = $(".cactus1");

  var flameElement = $(".flame1");
  var flamePosition = $(".flame1").offset();

  var cactus2Position = $(".cactus2").offset();
  var cactus2Element = $(".cactus2");

  var cactus1Left = cactus1Position.left;
  var cactus1left2 = cactus1Position.left - 69;
  var cactus1left3 = cactus1Position.left - 63;
  var bearTop1 = bearTop + bearElement.height() - 40;
  var bearTop2 = bearTop + bearElement.height();
  var flameTop1 = flamePosition.top + flameElement.height() - 15;
  var bearLeft1 = bearLeft + bearElement.width() + 6;
  var cactus2Left1 = cactus2Position.left + cactus2Element.width();

  if ((bearLeft >= cactus1Left + cactus1Element.width() - 8 && bearLeft < cactus1Left + cactus1Element.width() - 3)
    && (bearTop < 450 && bearTop >= 405)
    && (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2)) {
    bearAttackAnimation()
    BearHealth -= 10;
  } else if ((cactus1left2 <= bearLeft && cactus1left3 >= bearLeft)
    && (bearTop < 450 && bearTop >= 405)
    && (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2)) {
    bearAttackAnimation()
    BearHealth -= 10;
  } else if ((bearTop1 >= flamePosition.top - 2 && bearTop1 <= flameTop1)
    && (bearLeft <= 268 && bearLeft >= 205)
    && (BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2)) {
    bearAttackAnimation()
    BearHealth -= 10;
  } else if ((bearTop2 > flamePosition.top + 8 && bearTop2 < flamePosition.top + 13)
    && (bearLeft <= 268 && bearLeft >= 205)
    && (BackgroundImg === DownBearImg1 || BackgroundImg === DownBearImg2)) {
    bearAttackAnimation()
    BearHealth -= 10;
  } else if ((bearLeft1 >= cactus2Position.left - 1 && bearLeft1 <= cactus2Position.left + 7)
    && (bearTop >= 133 && bearTop <= 200)
    && (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2)) {
    bearAttackAnimation()
    BearHealth -= 10;
  } else if ((bearLeft + 6 <= cactus2Left1 && bearLeft + 6 > cactus2Left1 - 5)
    && (bearTop >= 133 && bearTop <= 200)
    && (BackgroundImg === LeftBearImg1 || BackgroundImg === LeftBearImg2)) {
    bearAttackAnimation()
    BearHealth -= 10;
  }

  $(".life h4").text(BearHealth);
}

function BearMove(pressKey) {
  if (!isPaused) {
    let BearElement = $(".bear-con");
    let BearIMGElement = $(".bear-con img");

    let UpBearImg1 = "source/MoveWithNet/WIthNetBack_1.png"
    let UpBearImg2 = "source/MoveWithNet/WIthNetBack_2.png"

    let DownBearImg1 = "source/MoveWithNet/FrontWithNet_1.png"
    let DownBearImg2 = "source/MoveWithNet/FrontWithNet_2.png"

    let RightBearImg1 = "source/MoveWithNet/WIthNet_R_1.png";
    let RightBearImg2 = "source/MoveWithNet/WIthNet_R_2.png";

    let LeftBearImg1 = "source/MoveWithNet/WIthNet_L_1.png";
    let LeftBearImg2 = "source/MoveWithNet/WIthNet_L_2.png";

    let BearPosition = BearElement.offset();
    let BearLeft = BearPosition.left;
    let BearTop = BearPosition.top;

    let BackgroundImg = BearIMGElement.attr("src");

    if ((BearLeft >= 680 && BearLeft <= 1000) &&
      (BearTop >= 155 && BearTop <= 200)) {
      const bee1Element = $('.bee1');
      const bee2Element = $('.bee2');
      const bee3Element = $('.bee3');
      bee1Element.css("animation-play-state", "paused");
      bee2Element.css("animation-play-state", "paused");
      bee3Element.css("animation-play-state", "paused");
      isPaused = true;

      var completeElement = $(".win");
      completeElement.css({
        "display": "block"
      })

      localStorage.clear();

      setTimeout(() => {
        window.location.href = "index.html"
      }, 3000)
    }

    // up key press
    if (pressKey == keyPressType.up) {

      if (BackgroundImg == UpBearImg1) {
        BearIMGElement.attr("src", UpBearImg2);
      } else {
        BearIMGElement.attr("src", UpBearImg1);
      }



      if ((BearTop <= FIXED_BEAR_TOP + 1 && BearTop >= 411)) {
        BearTop -= 10;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
        });
      } else if ((BearLeft <= 268 && BearLeft >= 205)
        && (BearTop <= 448 && BearTop >= 136)) {
        BearTop -= 10;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
        });
      } else if ((BearLeft >= 680 && BearLeft <= 1000) &&
        (BearTop >= 155 && BearTop <= 200)) {
        BearTop -= 10;
        hitByObstacles();
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

      if ((BearTop >= 133 && BearTop <= 448) && (BearLeft >= 204 && BearLeft <= 253)) {
        BearTop += 10;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
        });
      } else if ((BearTop >= 405 && BearTop < 510)
        && (BearLeft <= 756 && BearLeft >= 711)
        && (BackgroundImg === DownBearImg1 || BackgroundImg == DownBearImg2)) {
        BearTop += 10;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
        });
      } else if ((BearTop >= 133 && BearTop <= 182)
        && (BearLeft >= 650 && BearLeft <= 703)) {
        hitByObstacles();
        BearElement.css({
          top: "179px"
        })
      }
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

      if ((BearTop <= 182 && BearTop >= 129) &&
        (BearLeft >= 205 && BearLeft <= 687)) {
        BearLeft += 10;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
        });
      } else if ((BearTop >= 405 && BearTop <= 447)
        && (BearLeft >= 204 && BearLeft <= 745)) {
        BearLeft += 10;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
        });
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



      if ((BearTop < 450 && BearTop >= 405) &&
        (BearLeft <= (FIXED_BEAR_LEFT + BEAR_ELEMENT.width()) && BearLeft >= 210)) {
        BearLeft -= 10;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
        });
      } else if ((BearTop <= 182 && BearTop >= 133) && (BearLeft >= 210 && BearLeft <= 703)) {
        BearLeft -= 10;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
        });
      }
    }

    //Space Key
    if (pressKey === keyPressType.space) {

      if ((BearTop <= FIXED_BEAR_TOP + 1 && BearTop >= 488)
        && (BackgroundImg === UpBearImg1 || BackgroundImg == UpBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop -= 50;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearLeft >= 716 && BearLeft <= 756)
        && (BearTop >= 406) && (BackgroundImg === UpBearImg1 || BackgroundImg == UpBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        hitByObstacles();
        BearElement.css({
          top: "411px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearLeft - 70 <= 230)
        && (BackgroundImg === LeftBearImg1 || BackgroundImg == LeftBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        hitByObstacles();
        BearElement.css({
          left: "210px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });

      } else if ((BearTop < 450 && BearTop >= 405) &&
        (BearLeft <= (FIXED_BEAR_LEFT + BEAR_ELEMENT.width()) && BearLeft >= 210)
        && (BackgroundImg === LeftBearImg1 || BackgroundImg == LeftBearImg2)) {

        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearLeft -= 70;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if (BearTop <= 214
        && (BackgroundImg === UpBearImg1 || BackgroundImg === UpBearImg2)) {
        BearElement.css({
          top: "135.5px",
        });
      } else if ((BearLeft <= 268 && BearLeft >= 205)
        && (BearTop <= 448 && BearTop >= 136)
        && (BackgroundImg === UpBearImg1 || BackgroundImg == UpBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop -= 50;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearLeft >= 618)
        && (BearTop <= 182 && BearTop >= 129)
        && (BackgroundImg === RightBearImg1 || BackgroundImg == RightBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        hitByObstacles();
        BearElement.css({
          left: "687px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearTop <= 182 && BearTop >= 129) &&
        (BearLeft >= 205 && BearLeft <= 687)
        && (BackgroundImg === RightBearImg1 || BackgroundImg == RightBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearLeft += 70;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearTop <= 182 && BearTop >= 129) &&
        (BearLeft >= 205 && BearLeft <= 689)
        && (BackgroundImg === LeftBearImg1 || BackgroundImg == LeftBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearLeft -= 70;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if (BearTop >= 400
        && (BackgroundImg === DownBearImg1 || BackgroundImg == DownBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");
        hitByObstacles();
        BearElement.css({
          top: "444px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearTop >= 133 && BearTop <= 448)
        && (BearLeft >= 204 && BearLeft <= 253)
        && (BackgroundImg === DownBearImg1 || BackgroundImg == DownBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearTop += 50;
        hitByObstacles();
        BearElement.css({
          top: BearTop + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
      } else if ((BearTop >= 405 && BearTop <= 447)
        && (BearLeft >= 204 && BearLeft <= 745)
        && (BackgroundImg === RightBearImg1 || BackgroundImg === RightBearImg2)) {
        // Reset the animation by setting the animation-name property to an empty string
        BearElement.css("animation-name", "");
        BearElement.css("animation-duration", "");

        BearLeft += 70;
        hitByObstacles();
        BearElement.css({
          left: BearLeft + "px",
          "animation-name": "bear-jump",
          "animation-duration": "1s",
        });
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

      audioElement.src = "source/sound effects/null.mp3";
      audioElement.volume = 0.1;
      audioElement.loop = true;
      audioElement.play()
    } else {
      var audioElement = $("#mainBackgroundAudio")[0];
      audioElement.pause();
    }
  }
}