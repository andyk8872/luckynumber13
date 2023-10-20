let enterButton = document.getElementsByClassName('enterButton');

enterButton[0].addEventListener('click', myPlay);

function myPlay() {
    var scaryEnterSound = document.getElementsByClassName('scaryEnterSound');
    scaryEnterSound[0].play();
};

/* eyeball function on mainpage */
const balls = document.getElementsByClassName("ball");
document.onmousemove = function () {
    let x = event.clientX * 100 / window.innerWidth + "%";
    let y = event.clientY * 100 / window.innerHeight + "%";
    // event.cilentX => get the horizontal coordinate of the mouse
    // event.cilentY => get the vertical coordinate of the mouse
    // window.innerWidth => get the browser width
    // window.innerHeight => get the browser height

    for (let i = 0; i < 2; i++) {
        balls[i].style.left = x;
        balls[i].style.top = y;
        balls[i].style.transform = "translate(-" + x + ", -" + y + ")";
    }
}