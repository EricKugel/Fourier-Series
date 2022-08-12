var canvas;
var ctx;
const FPS = 24;
const SIZE = 50

var circles = [];
var colors = ["red", "orange", "yellow", "green", "blue", "purple", "black"]
var circles = [
  {
    radius: 1,
    theta: Math.PI / 2,
    frequency: 0
  },
  {
    radius: 1,
    theta: 0,
    frequency: 1,
  },
  {
    radius: 1,
    theta: 0,
    frequency: -1
  },
  {
    radius: -1/2,
    theta: 0,
    frequency: 2
  },
  {
    radius: 1/2,
    theta: 0,
    frequency: -2
  }
]

class Circle {
    // speed is in radians per tick
    constructor(index) {
        this.theta = circles[index].theta;
        if (index = 0) {
          this.x = screen.innerWidth / 2;
          this.y = screen.innerHeight / 2;
        } else {
          this.x = circles[index - 1].circle.point_x;
          this.y = circles[index - 1].circle.point_y
        }
        this.radius = circles[index].radius * SIZE;
        this.speed = (circles[index].frequency * Math.PI * 2) / FPS;
        this.point_x = this.x + Math.cos(this.theta)
        this.point_y = this.y + Math.sin(this.theta);
        this.index = index;
        circles[index].circle = this;
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
    circles.push(new Circle(window.innerWidth / 2, window.innerHeight / 2, Math.PI * 2 / (FPS * 4), 50, 5));
    tick();
}

function tick() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (var i = 0; i < circles.length; i++) {
        circles[i].update();
        circles[i].draw();
    }
    setTimeout(tick, 40);
}