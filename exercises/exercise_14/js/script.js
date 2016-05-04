
$(document).ready(function(){
$('.draggable').draggable();

$('.resizable').resizable({
    handles: 'se, sw'
});

$('.resizable').parent().rotatable();


});