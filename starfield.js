$(function () {
  var win = window,
      width = win.innerWidth,
      height = win.innerHeight,
      canvas = document.getElementById("c"),
      mousex = width / 2,
      mousey = height / 2;
  canvas.width = width;
  canvas.height = height;

  var G = canvas.getContext("2d");
  G.globalAlpha = 0.3;

  var M = Math,
      Rnd = M.random,
      Floor = M.floor;

  var warpZ = 10,
      units = 500,
      Z = 0.02;

  function addCanvasEventListener(name, fn) {
      canvas.addEventListener(name, fn, false);
  }
  addCanvasEventListener("mousemove", function (e) {
      mousex = e.clientX;
      mousey = e.clientY;
  });
  function wheel(e) {
      var delta = 0;
      if (e.detail) {
          delta = -e.detail / 3;
      } else {
          delta = e.wheelDelta / 120;
      }
      if ((delta > 0 && Z < 1) || (delta < 0 && Z > 0.02)) {
          Z += delta / 100;
      }
  }
  addCanvasEventListener("DOMMouseScroll", wheel);
  addCanvasEventListener("mousewheel", wheel);

  function resetstar(a) {
      a.x = (Rnd() * width - width * 0.5) * warpZ;
      a.y = (Rnd() * height - height * 0.5) * warpZ;
      a.z = warpZ;
      a.px = 0;
      a.py = 0;
  }

  var stars = [];
  for (var i = 0, n; i < units; i++) {
      n = {};
      resetstar(n);
      stars.push(n);
  }

  setInterval(function () {
      G.clearRect(0, 0, width, height);

      var cx = (mousex - width / 2) + width / 2,
          cy = (mousey - height / 2) + height / 2;

      for (var i = 0; i < units; i++) {
          var n = stars[i],
              xx = n.x / n.z,
              yy = n.y / n.z,
              e = 1.0 / n.z * 5 + 1,
              r = 255,
              g = 255,
              b = 255;

          if (n.px !== 0) {
              G.strokeStyle = "rgb(" + Floor(r) + "," + Floor(g) + "," + Floor(b) + ")";
              G.lineWidth = e;
              G.beginPath();
              G.moveTo(xx + cx, yy + cy);
              G.lineTo(n.px + cx, n.py + cy);
              G.stroke();
          }

          n.px = xx;
          n.py = yy;
          n.z -= Z;

          if (n.z < Z || n.px > width || n.py > height) {
              resetstar(n);
          }
      }
  }, 25);
});
