$(function() {

    $(".speedup").on('click',function(){
        changeSpeed(true);
    });

    $(".slowdown").on('click',function(){
        changeSpeed(false);
    });

    let car = $('.car-container');
    let maxValue = $(window).width() - car.width() ;
    let keysPressed = {};
    let distancePerIteration = 10;

    function calculateNewValue(oldValue, keyCode1, keyCode2) {
        var newValue = parseInt(oldValue, 10)
                    - (keysPressed[keyCode1] ? distancePerIteration : 0)
                    + (keysPressed[keyCode2] ? distancePerIteration : 0);
        return newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
    }

    $(window).keydown(function(event) { keysPressed[event.which] = true; });
    $(window).keyup(function(event) { keysPressed[event.which] = false; });

    setInterval(function() {
        car.css({
            left: function(index ,oldValue) {
                return calculateNewValue(oldValue, 37, 39);
            }
        });
    }, 20);

    $('.sky').css('transition','background-color 3s');

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