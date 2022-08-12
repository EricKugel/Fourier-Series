var canvas;
var ctx;
const FPS = 24;

var circles = [];
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
var points = [];

class Circle {
    // speed is in radians per tick
    constructor(x, y, speed, size, children) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = speed;
        this.point_x = this.x + this.size;
        this.point_y = this.y;
        this.theta = 0;
        this.child = null;
        this.children = children;
        if (children > 0) {
            this.child = new Circle(this.point_x, this.point_y, this.speed * 2, this.size / 2, children - 1);
        }
    }

    update(coords = null) {
        if (coords != null) {
            this.x = coords[0];
            this.y = coords[1];
        }
        this.theta += this.speed
        if (this.theta > 2 * Math.PI) {
            this.theta = this.theta % Math.PI;
        }
        this.point_x = this.x + Math.cos(this.theta) * this.size;
        this.point_y = this.y - Math.sin(this.theta) * this.size;
        if (this.child != null) {
            this.child.update([this.point_x, this.point_y]);
        } else {
            points.push([this.point_x, this.point_y]);
        }
    }

    draw() {
        ctx.strokeStyle = colors[this.children % colors.length];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.point_x, this.point_y);
        ctx.stroke();
        if (this.child != null) {
            this.child.draw();
        }
    }    
}

window.onload = function() {
    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    ctx = canvas.getContext("2d");
    main();
}

function main() {
    circles.push(new Circle(window.innerWidth / 2, window.innerHeight / 2, Math.PI * 2 / (FPS * 4), 250, 10));
    tick();
}

function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].draw();
    }

    if (points.length > 0) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (var i = 0; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
    }
    setTimeout(tick, 40);
}