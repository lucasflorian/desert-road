$(function() {

    $(".speedup").on('click',function(){
        changeSpeed(true);
    });

    $(".slowdown").on('click',function(){
        changeSpeed(false);
    });


});

function changeSpeed(speedup){
    let $line = $('.road .line');
    let lineDuration = Number($line.css('animation-duration').replace("s",""));
    lineDuration = speedup ? lineDuration - 0.2 : lineDuration + 0.2;
    if(lineDuration <= 0){
        lineDuration = 0.2;
    }
    $line.css('animation-duration', lineDuration + "s");

    let $cactus = $('.cactus');
    let cactusDuration = Number($cactus.css('animation-duration').replace("s",""));
    cactusDuration = speedup ? cactusDuration - 1 : cactusDuration + 1;
    if(cactusDuration <= 0){
        cactusDuration = 1;
    }
    $cactus.css('animation-duration', cactusDuration + "s");
}