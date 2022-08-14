var circles = [];

window.onload = function() {
    if (document.cookie != "") {
        circles = JSON.parse(document.cookie.substring(8));
        for (var i = 1; i < circles.length; i++) {
            plus();
        }

        for (var i = 0; i < circles.length; i++) {
            var circle = circles[i];
            var input_fields = document.getElementsByClassName("circle-input")[i].getElementsByTagName("input");
            input_fields[0].value = Math.cos(circle.theta) * circle.radius + ", " + Math.sin(circle.theta) * circle.radius;
            input_fields[1].value = circle.frequency;
        }
    }
}

function plus() {
    const element = document.createElement("div");
    element.setAttribute("class", "circle-input");
    element.innerHTML = '<a class = "exit" href = "#" onclick = "exit(this)">x</a><br/>X, Y   <input type = "text" placeholder = "2, 3"></input><br/><br/>Frequency:   <input type = "text" placeholder = "1"></input><br/><br/>'
    document.getElementById("form-contents").appendChild(element);
}

function exit(element) {
    document.getElementById("form-contents").removeChild(element.parentElement);
}

function graph() {
    circles = [];
    var inputs = document.getElementsByClassName("circle-input");
    for (var i = 0; i < inputs.length; i++) {
        var input = inputs[i];
        var input_fields = input.getElementsByTagName("input");
        var point = input_fields[0].value.split(",");
        var x = parseFloat(point[0]);
        var y = parseFloat(point[1]);
        circles.push({
            radius: Math.sqrt(x ** 2 + y ** 2),
            theta: (Math.atan(y / x)) + ((x < 0) ? Math.PI : 0),
            frequency: parseFloat(input_fields[1].value)
        });
    }

    document.cookie = "circles=" + JSON.stringify(circles);
    window.location.replace("draw.html");
}