const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d')
let smCircleRad=25;
let bigCircleRad=200
let pointerX;
let pointerY;
let out = false
const bigCircle = () => {
    context.beginPath();
    context.arc(canvas.width / 2, canvas.height / 2, bigCircleRad, 0, Math.PI * 2, true)
    context.closePath()
    context.stroke()
}

const smallCircle = (x, y) => {
    context.beginPath();
    context.arc(x, y, smCircleRad, 0, Math.PI * 2, true)
    context.closePath()
    context.fill();
    context.stroke()
}
document.onmousemove = (e) => {
    pointerX = e.clientX - canvas.offsetLeft
    pointerY = e.clientY - canvas.offsetTop
}
function draw() {
    if (Math.pow(pointerX - canvas.width / 2, 2) + Math.pow(pointerY - canvas.height / 2, 2) <= Math.pow(bigCircleRad-smCircleRad, 2)) {
        out = false

    }
    if (!out) {
        if (Math.pow(pointerX - canvas.width / 2, 2) + Math.pow(pointerY - canvas.height / 2, 2) <= Math.pow(bigCircleRad-smCircleRad, 2)) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            smallCircle(pointerX, pointerY)
            bigCircle()
            out = false

        } else {
            bigCircle()
            out = true

        }
    }
}
setInterval(draw, 10)
bigCircle()
smallCircle(canvas.width / 2, canvas.height / 2)