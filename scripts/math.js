// Calculates the point at a specific point along a cubic bezier curve. 
// The points are the intial, 2 control points, and the final. 0 <= t <= 1
// https://en.wikipedia.org/wiki/B%C3%A9zier_curve#Cubic_B%C3%A9zier_curves
function curve(points, t) {
    x = (1 - t)**3 * points[0][0] + 3*((1 - t)**2) * t * points[1][0] + 3 * (1-t) * t**2 * points[2][0] + t**3 * points[3];
    y = (1 - t)**3 * points[0][1] + 3*((1 - t)**2) * t * points[1][1] + 3 * (1-t) * t**2 * points[2][1] + t**3 * points[3];
    return [x, y];
}

function integrate(lower, upper, f) {
    var n = 1000;
    var sum = 0;
    for (var i = 0; i < n; i++) {
        sum += f((i/n) * (upper - lower) + lower);
    }
    sum /= n / (upper-lower);    
    if (Math.abs(sum) < 0.01) {
        sum = 0;
    }
    return sum;
}

// x: 0-1
function f(x) {
    return Math.sin(x);
}