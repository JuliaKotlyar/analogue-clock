const canvas = document.getElementById('canvas'); // created a canvas object
const ctx = canvas.getContext('2d'); // create a 2D drawing object for the canvas object
let radius = canvas.height / 2; // calculate the clock radius
ctx.translate(radius, radius); // position of the object (center)
radius *= 0.9;

// draw the clock face

function drawClock() {
    drawFace(ctx, radius);
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
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

drawClock();
