function u(t) {
    return COORDS[Math.floor(COORDS.length * t)][0] / 50;
}

function v(t) {
    return COORDS[Math.floor(COORDS.length * t)][1] / -50;
}

const n = 3000;
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

function getCircles(num) {
    var circles = [];
    for (var f = -1 * num; f < num; f++) {
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