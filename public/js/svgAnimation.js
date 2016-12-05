$(function() {

    var $circle = $("#circling1,#circling2"), degree = 0, timer; 
    function rotate() {
        
        $circle.css({ WebkitTransform: 'rotate(' + degree + 'deg)'});  
        $circle.css({ '-moz-transform': 'rotate(' + degree + 'deg)'});                      
        timer = setTimeout(function() {
            ++degree; rotate();
        },5);
    };
    $('.play').on('click',function(){
    	rotate();
    });
    $('.pause').on('click',function(){
    	clearTimeout(timer);
    });
    $('.stop').on('click',function(){
    	clearTimeout(timer);
    });
    
    //clearTimeout(timer);
}); 


    
