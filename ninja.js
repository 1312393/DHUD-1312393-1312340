var point = 0;
var gameover = 0;

function drawMan() {
  var w = 200;
  var h = 400;
  var canvas = document.getElementById('myCanvas');
  if (canvas.getContext) {
    context = canvas.getContext("2d");
    with(canvas) {
      setAttribute("width", 1000)
      setAttribute("height", 1000)
    }
    with(context) {
      strokeStyle = "#000000";
      lineWidth = "5";
      clearRect(0, 0, 800, 800);

      context.font = '40pt Aria';
      context.fillStyle = 'red';
      context.fillText(point, 500, 100);

      arc(w / 2, h / 2, h / 20, 0, Math.PI * 2, true);
      moveTo(w / 2, h / 2 + (h / 20));
      lineTo(w / 2, h - (h / 5));

      /*
          Draw Legs
      */
      moveTo(w / 2, h - (h / 3));
      lineTo(w / 2 + (h / 20), h - (h / 50) - 30);
      moveTo(w / 2, h - (h / 5));
      lineTo(w / 2 - (h / 20), h - (h / 50) - 30);
      /*
          Draw Arms
      */
      moveTo(w / 2, (h / 2 + (h / 20) + h - (h / 4)) / 2);
      lineTo(w / 2 + h / 10, (h / 2 + (h / 20) + h - (h / 4)) / 2 - 20);
      moveTo(w / 2, (h / 2 + (h / 20) + h - (h / 4)) / 2);
      lineTo(w / 2 + h / 10, (h / 2 + (h / 20) + h - (h / 4)) / 2);

      /*Draw columns*/


      moveTo(60, 359);
      lineTo(60, 412);

      moveTo(150, 362);
      lineTo(60, 362);

      moveTo(150, 359);
      lineTo(150, 412);

      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      };
      var random = 0;
      random += randomIntFromInterval(200, 500);
      var random2 = 0;
      random2 += randomIntFromInterval(20, 70);
      moveTo(75 + random, 359);
      lineTo(75 + random, 412);

      moveTo(75 + random2 + random, 362);
      lineTo(75 + random, 362);

      moveTo(75 + random2 + random, 359);
      lineTo(75 + random2 + random, 412);
      var k1 = 75 + random2 + random;
      var k2 = 75 + random;


      //moveTo(w/2+h/10,340);
      // lineTo(w/2+h/10, 50);
      var gameReady = true;
      var players = [];
      var posX = w / 2 + h / 10;
      var posY = 350;
      var posXa = w / 2 + h / 10;
      var posYa = 350;
      var newX = w / 2 + h / 10;
      var newY = 350;
      var moveX = 0;
      var moveY = 0;


      var posXb = w / 2 + h / 10;
      var posYb = 350;
      var fiX = 0;
      var fiY = 0;

      // new vars needed for movement
      var velX = 0;
      var velY = 0;
      var speed = 5;
      var long = 0;

      function movePlayer() {
        if (newY > 350) {
          newY = 350;
        }
        newX = w / 2 + h / 10;
        var tx = newX - posX,
          ty = newY - posY,
          dist = Math.sqrt(tx * tx + ty * ty);

        if (dist >= speed) {
          velX = (tx / dist) * speed;
          velY = (ty / dist) * speed;
          posX += velX;
          posY += velY;
        } else {

        }
      }

      function moveBall() {
        moveY = 350;

        var tx = moveX - posXa,
          ty = moveY - posYa,
          dist = Math.sqrt(tx * tx + ty * ty);

        if (dist >= speed) {
          velX = (tx / dist) * speed;
          velY = (ty / dist) * speed;
          posXa += velX;
          posYa += velY;
        }
      }

      function bodyMove() {
        //alert(posYa);
        moveBall();
        context.clearRect(w / 2 + h / 10, 300, long + 500, 50);
        context.fillRect(posXa, posYa - 50, 50, 50);
        //context.clearRect(140, 50, canvas.width,300);
        // setTimeout(function(){  context.clearRect(posXa, posYa-50, 700, 50);}, 4000);
        requestAnimationFrame(bodyMove);
      }

      function readyMove() {
        if (gameReady) {
          bodyMove();

        } else {
          setTimeout(isGameReady, 100);
        }
      }

      function isGameReady() {
        if (gameReady) {
          drawCanvas();

        } else {
          setTimeout(isGameReady, 100);
        }
      }

      canvas.onmousedown = function(e) {
        newX = e.offsetX; // -33;
        newY = moveY = fiY = e.offsetY; // - 55.25;
        long = 350 - newY;
        moveX = posXa + long - 40;
        fiX = posXb + long;

      }

      function playAgain() {
        //context.fillRect(w/2+h/10, 300, 900, 50);

        clearRect(0, 0, 800, 800);
        drawMan();
        //alert(' again?');
      }

      function check() {
        var k = fiX;
        if ((k <= k1) && (k >= k2)) {
          point += 1;
          gameover = 0;

          //alert('diem den ' + k + 'goc trai' + k2 + 'goc phai' + k1);
          setTimeout(function() {
            playAgain();
          }, 10);

          // alert('diem hien tai la '+point);
        } else {
          gameover = 1;
        }

        if (gameover == 1) {
          var haha = "Game Over ! Điểm của bạn là  " + point;
          // context.clearRect(0,0,800,800);
          context.font = '40pt Aria';
          context.fillStyle = 'red';
          context.fillText(haha, 0, 150);
          // alert('diem den ' + k + 'goc trai' + k2 + 'goc phai' + k1);
          // alert("GAME OVER!!Tong diem  cua ban la " +point);
          // gameReady = False;
          //setTimeout(function() {alert("Chơi lại không ?";},1000);
          point = 0;
          setTimeout(function() {
            playAgain();
          }, 2000);
        }


      }
      canvas.onmouseup = function(e) {
        setTimeout(function() {
          collapse();
        }, 1000);
        setTimeout(function() {
          readyMove();
        }, 3000);
        setTimeout(function() {
          test();
          //alert('hey~!');

        }, 6000);
        setTimeout(function() {
          check();
        }, 5000);
      }

      function collapse() {
        //alert('hihi');
        //context.clearRect(140, 0, canvas.width, canvas.height);
        context.clearRect(w / 2 + h / 10, 300, long, 50);


        // long = 350-newY ;
        //context.moveTo(w / 2 + h / 10, 350);
        // context.lineTo(w / 2 + h / 10 + 50, 0);
        while (newY < 350) {

          setTimeout(function() {
            context.fillRect(newX, newY, long, 10);
          }, 1000);
          newY = newY + 1;
          if (newY < 350) {
            setTimeout(function() {
              context.clearRect(140, 0, long, 350);
            }, 1000);
          }
          setTimeout(function() {
            context.clearRect(140, 0, long - 200, long);
          }, 1000);
        }
        //var tx = newX - posX,
        // ty = newY - posY,
        // dist = Math.sqrt(tx * tx + ty * ty);

        // if (dist >= speed) {
        //  velX = (tx / dist) * speed;
        //  velY = (ty / dist) * speed;
        //  posX += velX;
        //  posY += velY;
        // }
      }

      function drawCanvas() {
        movePlayer();
        // context.clearRect(140, 0, canvas.width, canvas.height);
        context.fillRect(posX, posY, 10, 10);

        requestAnimationFrame(drawCanvas);

      }


      isGameReady();

      stroke();
    }



  }

}
window.onresize = function() {
  drawMan();
}

drawMan();
