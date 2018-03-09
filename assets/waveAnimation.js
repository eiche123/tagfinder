var s = Snap('#bottomWave path');

var startwave = "M-252,786 C-256.799198,499.333333 -208.965864,356 -108.5,356 C42.1987963,356 78,519.5 180,519.5 C282,519.5 248,460.5 327.5,460.5 C380.5,460.5 437.5,569 498.5,786 L-252,786 Z";
var endwave = "M-252.000262,786 C-228.000087,559.666667 -174,470 -90,517 C36,587.5 53.5,495.5 150.5,463 C247.5,430.5 257,622.784727 337.5,586.5 C391.166667,562.310182 444.833333,628.810182 498.5,786 L-252.000262,786 Z";

//animation
function animOn(){
  s.animate({ d: endwave }, 30000, mina.linear, animOut);
}
function animOut() {
  s.animate({ d: startwave}, 30000, mina.linear, animOn);
};

s.attr({ d: startwave});
animOn();
