var canvas;
var ctx;
const FPS = 60;
const SPEED_SCALE = 0.5;
const SIZE = 50;
var circle;

const points = [];
var circles;
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"];
class Circle {
    constructor(index = 0) {
        this.theta = circles[index].theta;
        if (index == 0) {
          this.x = window.innerWidth / 2;
          this.y = window.innerHeight / 2;
        } else {
          this.x = circles[index - 1].circle.point_x;
          this.y = circles[index - 1].circle.point_y
        }
        this.radius = circles[index].radius * SIZE;
        if (this.radius < 0) {
            this.radius = Math.abs(this.radius);
            this.theta += Math.PI;
        }
        this.speed = SPEED_SCALE * (circles[index].frequency * Math.PI * 2) / FPS;
        this.point_x = this.x + Math.cos(this.theta) * this.radius;
        this.point_y = this.y + Math.sin(this.theta) * this.radius;
        this.index = index;
        circles[index].circle = this;
        if (index < circles.length - 1) {
            new Circle(index + 1);
        }
    }

    update() {
        if (this.index != 0) {
            this.x = circles[this.index - 1].circle.point_x;
            this.y = circles[this.index - 1].circle.point_y;
        }
        this.theta += this.speed
        if (this.theta > 2 * Math.PI) {
            this.theta = this.theta % Math.PI;
        }
        this.point_x = this.x + Math.cos(this.theta) * this.radius;
        this.point_y = this.y - Math.sin(this.theta) * this.radius;
        if (this.index < circles.length - 1) {
            circles[this.index + 1].circle.update();
        } else {
            points.push([this.point_x, this.point_y]);
        }
    }

    draw() {
        if (circles[this.index].frequency != 0) {
            ctx.strokeStyle = colors[(Math.round(Math.abs(circles[this.index].frequency)) - 1) % colors.length];
            ctx.beginPath();
            ctx.arc(this.x, this.y, Math.abs(this.radius), 0, 2 * Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.point_x, this.point_y);
            ctx.stroke();
        }
        if (this.index < circles.length - 1) {
            circles[this.index + 1].circle.draw();
        }
    }    
}

function main() {
    var unsorted_circles = JSON.parse(document.cookie.substring(8));
    circles = []
    for (var i = 0; i < unsorted_circles.length; i++) {
        var unsorted_circle = unsorted_circles[i];
        var radius = unsorted_circle.radius;
        var added = false;
        for (var j = 0; j < circles.length; j++) {
            if (Math.abs(radius) > Math.abs(circles[j].radius)) {
                circles.splice(j, 0, unsorted_circle);
                added = true;
                break;
            }
        }
        if (!added) {
            circles.push(unsorted_circle);
        }
    }

    canvas = document.getElementById("canvas");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    ctx = canvas.getContext("2d");
    circle = new Circle();
    tick();
}

function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    circle.update();
    circle.draw();

    if (points.length > 0) {
        ctx.strokeStyle = "black";
        ctx.beginPath();
        ctx.moveTo(points[0][0], points[0][1]);
        for (var i = 0; i < points.length; i++) {
            ctx.lineTo(points[i][0], points[i][1]);
        }
        ctx.stroke();
    }
    setTimeout(tick, 1000 / FPS);
}

window.onload = function() {
  main();
}