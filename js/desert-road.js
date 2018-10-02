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

    // avoid road appearing over sky on load
    $('.sky').css('transition','background-color 3s');

    // reinit car position when resizing window
    $(window).on('resize',function(){
        clearInterval(carPositionInterval);
        initCar(car,carHelpMessage);
    });
});

/**
 * Initialize help button and help messages
 * @param {jQuery selector} carHelpMessage 
 * @param {jQuery selector} skyHelpMessage 
 */
function initHelpButton(carHelpMessage, skyHelpMessage){
    $('.help-me').on('click',function(){

        // show car help message
        setTimeout(function(){
            carHelpMessage.show();
        },500);

        // show sky help message
        let sun = $('.sun');
        skyHelpMessage.css({
            'left': sun.position().left + sun.width() - 50,
            'top' : sun.position().top + carHelpMessage.height() - 20
        });
        setTimeout(function(){
            skyHelpMessage.show();
        },1500);

        // show speed buttons help message
    });

    // close clicked help message
    $('.help-bubble').on('click',function(){
        $(this).hide();
    })
}

/**
 * Initialize speed buttons listeners
 * @param {jQuery selector} roadLine 
 * @param {jQuery selector} cactus 
 */
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

/**
 * Initialize car interactions
 * @param {jQuery selector} car 
 * @param {jQuery selector} carHelpMessage 
 */
function initCar(car, carHelpMessage){
    // array of current left and right keyboard key state (pressed or not)
    let keysPressed = [];
    // number of pixels the car is moved on each key press
    let distancePerIteration = 10;
    let carHalfWidth = car.width() / 2;
    // set limits to keep the car on road
    let minValue = $(window).width() * 0.4 - carHalfWidth ;
    let maxValue = $(window).width() * 0.55 - carHalfWidth;
    // init left position to keep car in the center of the road when resizing window
    car.css('left','45%');

    $(window).on('keydown',function(event) { keysPressed[event.which] = true; });
    $(window).on('keyup', function(event) { keysPressed[event.which] = false; });
    
    // check every 20ms if the car has to move
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

/**
 * Check if the car is currently moving (if an arrow key is pressed)
 * @param {[Boolean]} keysPressed 
 */
function isCarMoving(keysPressed){
    return keysPressed[37] || keysPressed[39];
}

/**
 * Change the animation-duration css property value
 * @param {jQuery element} element jQuery element
 * @param {Boolean} speedup true to speedup animation / false to slow down
 * @param {Number} stepSize number of seconds to add/remove (can be decimal, i.e. 0.2 )
 */
function changeSpeed(element, speedup, stepSize){
    let duration = Number(element.css('animation-duration').replace("s",""));
    duration = speedup ? duration - stepSize : duration + stepSize;
    if(duration <= 0){
        duration = stepSize;
    }
    element.css('animation-duration', duration + "s");
}