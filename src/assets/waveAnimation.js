var bottomWave = Snap('#bottomWave path');
var topWave = Snap('#topWave path');

var bottomStart = "M-252,786 C-256.799198,499.333333 -208.965864,356 -108.5,356 C42.1987963,356 78,519.5 180,519.5 C282,519.5 248,460.5 327.5,460.5 C380.5,460.5 437.5,569 498.5,786 L-252,786 Z";
var bottomEnd = "M-252.000262,786 C-228.000087,559.666667 -174,470 -90,517 C36,587.5 53.5,495.5 150.5,463 C247.5,430.5 257,622.784727 337.5,586.5 C391.166667,562.310182 444.833333,628.810182 498.5,786 L-252.000262,786 Z";
var topStart = "M391,476 C343.294588,389.850432 405.5,210 308.5,137 C211.5,64 69.5,172.5 112.5,4.26325641e-14 C141.166667,-115 242.333333,-122.166667 416,-21.5 C431.136942,367.599712 422.803608,533.433045 391,476 Z";
var topEnd = "M390,476 C342.294588,389.850432 422.5,131.5 307.5,137 C192.5,142.5 142,155 111.5,-3.26849658e-13 C91.1666667,-103.333333 192.333333,-110.5 415,-21.5 C430.136942,367.599712 421.803608,533.433045 390,476 Z";

//animation
function bottomToEnd() {
  bottomWave.animate({ d: bottomEnd }, 30000, mina.linear, bottomToStart);
}

function bottomToStart() {
  bottomWave.animate({ d: bottomStart}, 30000, mina.linear, bottomToStart);

}

function topToEnd() {
  topWave.animate({d: topEnd }, 30000, mina.linear, topToStart);
}

function topToStart() {
  topWave.animate({d: topStart }, 30000, mina.linear, topToEnd);
}



bottomWave.attr({ d: bottomStart });
topWave.attr({ d: topStart });
topToEnd();
bottomToEnd();
