const canvas = document.getElementById('canvas'); // created a canvas object
const ctx = canvas.getContext('2d'); // create a 2D drawing object for the canvas object
let radius = canvas.height / 2; // calculate the clock radius
ctx.translate(radius, radius); // position of the object (center)
radius *= 0.9;
setInterval(drawClock, 1000); //start clock tik-tik

// draw the clock face

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    let grad;
    ctx.beginPath(); // create outline
    ctx.arc(0, 0, radius, 0, 2 * Math.PI); // draw arc
    ctx.fillStyle = 'white'; // white face background of the clock
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI); // draw the center of the clock
    ctx.fillStyle = '#333';
    ctx.fill();
}

// draw numbers

function drawNumbers(ctx, radius) {
    let ang;
    let num;
    ctx.font = radius * 0.15 + 'px arial';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    for (num = 1; num < 13; num++) {
        ang = (num * Math.PI) / 6;
        ctx.rotate(ang); // add rotation(turning), ang (rotation angle clockwise)
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

// draw time

function drawTime(ctx, radius) {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();

    //hour

    hour = hour % 12;
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);

    //minutes

    minute = ((minute * Math.PI) / 30) * ((second * Math.PI) / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);

    //seconds

    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

//draw hands

function drawHand(ctx, position, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(position);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-position);
}
