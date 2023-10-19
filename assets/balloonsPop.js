function balloonsPop() {
    playHow.onclick = function () {
        // this will apply the css for each span
        for (let span of spans) {
            //    the class anim will be added to each span
            span.classList.add("anim");
        }
        setTimeout(function () {
            for (let span of spans) {
                //    the class anim will be removed from each span after .5s
                span.classList.remove("anim");

            }
        }, 500);
    };
}
