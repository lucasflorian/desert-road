$(function() {

    let roadLine = $('.road .line');
    let cactus = $('.cactus');
    var car = $('.car-container');
    var carHelpMessage =  $('.help-1');
    var skyHelpMessage =  $('.help-2');

    initSpeedButtons(roadLine,cactus);
    initCar(car,carHelpMessage);
    initHelpButton(carHelpMessage, skyHelpMessage);

    $('.sky').css('transition','background-color 3s');

   
    moveHelpWithCar(car, carHelpMessage);
    
});

function initHelpButton(carHelpMessage, skyHelpMessage){
    $('.help-me').on('click',function(){
        setTimeout(function(){
            carHelpMessage.show();
        },500);

        let sun = $('.sun');
        skyHelpMessage.css({
            'left': sun.position().left + sun.width() - 50,
            'top' : sun.position().top + carHelpMessage.height() - 20
        });
        setTimeout(function(){
            skyHelpMessage.show();
        },1500);
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
    let keysPressed = {};
    let distancePerIteration = 10;
    let maxValue = $(window).width() - car.width() ;

    $(window).on('keydown',function(event) { keysPressed[event.which] = true; });
    $(window).on('keyup', function(event) { keysPressed[event.which] = false; });
    setInterval(function() {
        car.css({
            left: function(index ,oldValue) {
                var newValue = parseInt(oldValue, 10)
                - (keysPressed[37] ? distancePerIteration : 0)
                + (keysPressed[39] ? distancePerIteration : 0);
                return newValue < 0 ? 0 : newValue > maxValue ? maxValue : newValue;
            }
        });
        
       // moveHelpWithCar(car, carHelpMessage);
    }, 20);
}

function moveHelpWithCar(car, carHelpMessage){
    carHelpMessage.css({
        'left': car.position().left + car.width() - 50,
        'top' : car.position().top - carHelpMessage.height() - 40
    });
}

function changeSpeed(element, speedup, stepSize){
    let duration = Number(element.css('animation-duration').replace("s",""));
    duration = speedup ? duration - stepSize : duration + stepSize;
    if(duration <= 0){
        duration = stepSize;
    }
    element.css('animation-duration', duration + "s");
}