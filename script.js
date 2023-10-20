


let enterButton = document.getElementsByClassName('enterButton'); 

enterButton[0].addEventListener('click', myPlay); 

function myPlay() {
    var scaryEnterSound = document.getElementsByClassName('scaryEnterSound');
    scaryEnterSound[0].play();
} ;