// Calculates the point at a specific point along a cubic bezier curve. 
// The points are the intial, 2 control points, and the final. 0 <= t <= 1
// https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B%C3%A9zier_curves
function curve(points, t) {
    x = (1 - t)**3 * points[0][0] + 3*((1 - t)**2) * t * points[1][0] + 3 * (1-t) * t**2 * points[2][0] + t**3 * points[3];
    y = (1 - t)**3 * points[0][1] + 3*((1 - t)**2) * t * points[1][1] + 3 * (1-t) * t**2 * points[2][1] + t**3 * points[3];
    return [x, y];
}

// const COORDS = [
//     [-1.176, -1.618],
//     [0, 2],
//     [1.176, -1.618],
//     [-1.902, 0.618],
//     [1.902, 0.928]
// ]
function u(t) {
    return COORDS[Math.floor(COORDS.length * t)][0] / 50;
}
function v(t) {
    return COORDS[Math.floor(COORDS.length * t)][1] / -50;
}

// function u(t) {
//   if (t >= 0 && t < 1/4) {
//     return(-64 * t**2 + 32 * t)
//   }    
//   if (t >= 1/4 && t < 2/4) {
//     return(-12 * t + 7)
//   }    
//   if (t >= 2/4 && t < 3/4) {
//     return(-16 * t**2 + 8 * t + 1)
//   }    
//   if (t >= 3/4 && t <= 4/4) {
//     return(96 * t**2 - 160 * t + 64)
//   }    
// // }

// function v(t) {
//   if (t >= 0 && t < 1/4) {
//     return(-64 * t**2 + 4);
//   } if (t >= 1/4 && t < 2/4) {
//     return(-16 * t + 4);
//   }  if (t >= 2/4 && t < 3/4) {
//     return(-96 * t**2 + 128 * t - 44);
//   }  if (t >= 3/4 && t <= 4/4) {
//     return(-160 * t**2 + 304 * t - 140);
//   }
// }
  

var n = 3000;
function a(f) {
    var a = 0;
    for (var k = 0; k < n; k++) {
        a += (1/n) * ((Math.cos(2 * Math.PI * f * k/n) * u(k/n)) + Math.sin(2 * Math.PI * f * k/n) * v(k/n));
    }
    return a;
}

function b(f) {
    var b = 0;
    for (var k = 0; k < n; k++) {
        b += (1/n) * ((Math.cos(2 * Math.PI * f * k/n) * v(k/n)) - Math.sin(2 * Math.PI * f * k/n) * u(k/n));
    }
    return(b)
}


function getCircles() {
    var circles = [];
    for (var f = -100; f < 100; f++) {
        var x = a(f);
        var y = b(f);
        circles.push({
            radius: Math.sqrt(x ** 2 + y ** 2),
            theta: (Math.atan(y / x)) + ((x < 0) ? Math.PI : 0),
            frequency: f
        });
    }
    return circles;
}