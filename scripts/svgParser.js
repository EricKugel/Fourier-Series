var x = 0;
var y = 0;

const COORDS = [];
const COORDS_PER_NODE = 30;

function doTheThing(path) {
    let objects = path.split(" ");
    var op = objects[0];
    var queue = [];
    for (var i = 1; i < objects.length; i++) {
        if (objects[i].includes(",")) {
            let nums = objects[i].split(",");
            queue.push([parseFloat(nums[0]), parseFloat(nums[1])]);
            if (op == "M" && queue.length == 1) {
                M(queue[0][0], queue[0][1]);
            } else if (op == "m" && queue.length == 1) {
                m(queue[0][0], queue[0][1]);
            } else if (op == "L" && queue.length == 1) {
                L(queue[0][0], queue[0][1]);
            } else if (op == "l" && queue.length == 1) {
                l(queue[0][0], queue[0][1]);
            } else if (op == "C" && queue.length == 3) {
                C(queue[0][0], queue[0][1], queue[1][0], queue[1][1], queue[2][0], queue[2][1]);
            } else if (op == "c" && queue.length == 3) {
                c(queue[0][0], queue[0][1], queue[1][0], queue[1][1], queue[2][0], queue[2][1]);
            } else if (op == "Q" && queue.length == 2) {
                Q(queue[0][0], queue[0][1], queue[1][0], queue[1][1]);
            } else if (op == "q" && queue.length == 2) {
                q(queue[0][0], queue[0][1], queue[1][0], queue[1][1]);
            } else {
                continue;
            }
            queue = [];
        } else {
            if (!"MmLlCcQqZzHhVv".includes(objects[i])) {
                alert(objects[i]);
                return;
            }
            op = objects[i];
        }
    }
}

function M(a, b) {
    x = a;
    y = b;
}

function m(a, b) {
    M(x+a, y+b);
}

function L(a, b) {
    let lineLength = Math.hypot(a-x, b-y);
    for (var i = 0; i < COORDS_PER_NODE; i++) {
        COORDS.push([(a-x) * (i/COORDS_PER_NODE) + x, 
                     (b-y) * (i/COORDS_PER_NODE) + y]);
    }
    M(a, b);
}

function l(a, b) {
    L(x + a, y + b);
}

function H(a) {
    L(a, y);
}

function h(a) {
    H(x + a);
}

function V(a) {
    L(x, a);
}

function v(a) {
    V(y + a);
}

function C(a1, b1, a2, b2, a, b) {
    let lineLength = Math.hypot(a-x, b-y);
    for (var i = 0; i < COORDS_PER_NODE; i++) {
        let t = i / COORDS_PER_NODE;
        COORDS.push(
            [(1 - t)**3 * x + 3*((1 - t)**2) * t * a1 + 3 * (1-t) * t**2 * a2 + t**3 * a,
            (1 - t)**3 * y + 3*((1 - t)**2) * t * b1 + 3 * (1-t) * t**2 * b2 + t**3 * b]);
    }
    M(a, b);
}

function c(a1, b1, a2, b2, a, b) {
    C(a1 + x, b1 + y, a2 + x, b2 + y, a + x, b + y);
}

function Q(a1, b1, a, b) {
    let lineLength = Math.hypot(a-x, b-y);
    for (var i = 0; i < COORDS_PER_NODE; i++) {
        let t = i / COORDS_PER_NODE;
        COORDS.push(
            [(1-t) * ((1-t) * x + t * a1) + t * ((1-t) * a1 + t * a),
            (1-t) * ((1-t) * y + t * b1) + t * ((1-t) * b1 + t * b)]);
    }
    M(a, b);
}

function q(a1, b1, a, b) {
    Q(a1 + x, b1 + y, a + x, b + y);
}

function draw(fileName) {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {
        if (this.status == 404) {
            draw(404);
        } else {
            parseSVG(this.responseText);
        }
    }
    xhttp.open("GET", "lib/" + fileName + ".svg");
    xhttp.send();
}

function drawTeapot() {
    doTheThing("M 22.231604,53.172497 40.108565,47.901086 C 61.881785,79.300362 72.424608,80.675513 72.424608,80.675513 79.758745,57.527141 99.46924,51.109771 99.46924,51.109771 l 71.27865,-0.458384 0.22435,-2.525649 -73.107342,-0.68304 m 0,0 c 7.964412,-11.86067 27.445722,-7.79252 27.445722,-7.79252 -0.80218,-18.62183 22.46079,-20.05428 19.424,-0.17189 37.26221,3.95462 28.18668,9.95095 28.18668,9.95095 l 14.58568,13.93742 c 41.75469,-47.683069 98.33971,25.439132 11.02029,62.556352 l 2.70313,-10.41034 c 75.57333,-37.236205 13.98936,-84.396559 -7.80812,-46.959989 l 2.99509,60.940689 c -6.64656,13.7515 -19.02292,23.60675 -19.02292,23.60675 12.60555,3.43788 -6.18818,8.02171 -6.18818,8.02171 C 62.110977,168.22678 93.968637,153.32931 93.968637,153.32931 82.279855,147.14113 77.696019,136.59832 77.696019,136.59832 26.81544,120.0965 60.277443,78.841975 22.231604,53.172498");
    main();
}

function parseSVG(svg) {
    if (svg.match(/<path/g).length != 1) {
        alert("Invalid file (make sure there's just one path)");
        return;
    }

    const re = /[\s"]d="(.+)"/;
    const path = svg.match(re)[1];

    doTheThing(path);
    main();
}