$(function() {

    $(".speedup").on('click',function(){
        changeSpeed(true);
    });

    $(".slowdown").on('click',function(){
        changeSpeed(false);
    });


});

function changeSpeed(speedup){
    let $roadLineSelector = $('.road .line');
    let animDuration = Number($roadLineSelector.css('animation-duration').replace("s",""));
    animDuration = speedup ? animDuration + 0.1 : animDuration - 0.1;
    if(animDuration < 0){
        animDuration = 0.2;
    }
    $roadLineSelector.css('animation-duration', animDuration + "s");
}