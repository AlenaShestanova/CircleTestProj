const small = document.getElementById('smallCircle')
const big = document.getElementById('bigCircle')
let bigCircleObj = big.getBoundingClientRect();
bigCircleObj["centerX"] = bigCircleObj["x"] + bigCircleObj["width"] / 2;
bigCircleObj["centerY"] = bigCircleObj["y"] + bigCircleObj["height"] / 2;
let smallCircleObj = small.getBoundingClientRect();
smallCircleObj["centerX"] = smallCircleObj["x"] + smallCircleObj["width"] / 2;
smallCircleObj["centerY"] = smallCircleObj["y"] + smallCircleObj["height"] / 2;
small.style.left = "100px"
small.style.top = "60px"
let out = true
let dx, dy
let pointer = {
    x: 0,
    y: 0
}
big.addEventListener('mousemove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY
    out = false;
})
//если курсор за границей большого круга, маленький круг останавливается
big.addEventListener('mouseleave', () => {
    dx = 0;
    dy = 0;
})
let vel = 5;
let rad = 20;

function direction() {
    let leftCoordNum = +small.style.left.substring(0, small.style.left.indexOf('px'));
    let topCoordNum = +small.style.top.substring(0, small.style.top.indexOf('px'));
//Проверка, дошел ли круг до границы большого круга
    if (Math.pow(leftCoordNum - bigCircleObj.centerX + 20, 2) + Math.pow(topCoordNum - bigCircleObj.centerY + 20, 2) <= Math.pow(bigCircleObj.width / 2 - smallCircleObj.width / 2, 2)) {
        if (pointer.x < leftCoordNum && pointer.x > (leftCoordNum - rad)) {
            dx = vel;
        }
        if (pointer.x > leftCoordNum && pointer.x < (leftCoordNum + rad)) {
            dy = -1 * vel
        }
        if (pointer.y > topCoordNum && pointer.y < (topCoordNum + rad)) {
            dx = -1 * vel
        }
        if (pointer.y < topCoordNum && pointer.y > (topCoordNum - rad)) {
            dy = vel
        }
        //круг останавлявается, если курсор выходит из ближайшей области
        let moveRight = pointer.x < (leftCoordNum) && pointer.x > (leftCoordNum) - rad;
        let moveLeft = pointer.x > (leftCoordNum) && pointer.x < (leftCoordNum) + rad;
        let moveTop = pointer.y > (topCoordNum) && pointer.y < (topCoordNum) + rad;
        let moveBottom = pointer.y < (topCoordNum) && pointer.y > (topCoordNum) - rad;
        if (!moveRight && !moveLeft && !moveTop && !moveBottom) {
            dx = dy = 0;
        }
    }
    //остановка движения круга, если круг дошел до границы
    else {
        dx = dy = 0;
        out = true
    }
}

//перерисовка круга
function draw() {
    let left = small.style.left
    let top = small.style.top
    small.style.left = +(left.substring(0, left.indexOf('px'))) + dx + "px"
    small.style.top = +(top.substring(0, top.indexOf('px'))) + dy + "px"
}

setInterval(() => {
    if (out == false) {
        direction();
        draw()
    }
}, 50)

