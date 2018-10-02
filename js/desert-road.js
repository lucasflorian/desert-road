var carPositionInterval;

$(function() {

    let roadLine = $('.road .line');
    let cactus = $('.cactus');
    var car = $('.car-container');
    var carHelpMessage =  $('.help-car');
    var skyHelpMessage =  $('.help-sky');

    initSpeedButtons(roadLine,cactus);
    initCar(car,carHelpMessage);
    initHelpButton(carHelpMessage, skyHelpMessage);

    //avoid road appearing over sky on load
    $('.sky').css('transition','background-color 3s');

    //reinit car position when resizing window
    $(window).on('resize',function(){
        clearInterval(carPositionInterval);
        initCar(car,carHelpMessage);
    });
});


function initHelpButton(carHelpMessage, skyHelpMessage){
    $('.help-me').on('click',function(){

        //show car help message
        setTimeout(function(){
            carHelpMessage.show();
        },500);

        //show sky help message
        let sun = $('.sun');
        skyHelpMessage.css({
            'left': sun.position().left + sun.width() - 50,
            'top' : sun.position().top + carHelpMessage.height() - 20
        });
        setTimeout(function(){
            skyHelpMessage.show();
        },1500);

        //show speed buttons help message
    });

    $('.help-bubble').on('click',function(){
        $(this).hide();
    })
}

function initSpeedButtons(roadLine, cactus){
    $(".speedup").on('click',function(){ 
        changeSpeed(roadLine, true, 0.2);
        changeSpeed(cactus, true, 1);
    });

    $(".slowdown").on('click',function(){
        changeSpeed(roadLine, false, 0.2);
        changeSpeed(cactus, false, 1);
    });
}

function initCar(car, carHelpMessage){
    let keysPressed = [];
    let distancePerIteration = 10;
    let carHalfWidth = car.width() / 2;
    let minValue = $(window).width() * 0.4 - carHalfWidth ;
    let maxValue = $(window).width() * 0.55 - carHalfWidth;
    //init left position to keep car in the center of the road when resizing window
    car.css('left','45%');

    $(window).on('keydown',function(event) { keysPressed[event.which] = true; });
    $(window).on('keyup', function(event) { keysPressed[event.which] = false; });
    carPositionInterval = setInterval(function() {
        if(isCarMoving(keysPressed)){
            car.css({
                left: function(index ,oldValue) {
                    var newValue = parseInt(oldValue, 10)
                    - (keysPressed[37] ? distancePerIteration : 0)
                    + (keysPressed[39] ? distancePerIteration : 0);
                    return newValue < minValue ? minValue : newValue > maxValue ? maxValue : newValue;
                }
            });
        
        }
    }, 20);
}

function isCarMoving(keysPressed){
    return keysPressed[37] || keysPressed[39];
}

function changeSpeed(element, speedup, stepSize){
    let duration = Number(element.css('animation-duration').replace("s",""));
    duration = speedup ? duration - stepSize : duration + stepSize;
    if(duration <= 0){
        duration = stepSize;
    }
    element.css('animation-duration', duration + "s");
}