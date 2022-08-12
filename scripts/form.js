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
            input_fields[0].value = circle.radius;
            input_fields[1].value = circle.theta;
            input_fields[2].value = circle.frequency;
        }
    }
}

function plus() {
    const element = document.createElement("div");
    element.setAttribute("class", "circle-input");
    element.innerHTML = '<a class = "exit" href = "#" onclick = "exit(this)">x</a><br/>Radius:   <input type = "text" placeholder = "0.5"></input><br/><br/>Theta:   <input type = "text" placeholder = "90"></input><br/><br/>Frequency:   <input type = "text" placeholder = "1"></input><br/><br/>'
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
        circles.push({
            radius: parseFloat(input_fields[0].value),
            theta: parseFloat(input_fields[1].value),
            frequency: parseFloat(input_fields[2].value)
        })
    }
    document.cookie = "circles=" + JSON.stringify(circles);
    window.location.replace("draw.html");
}