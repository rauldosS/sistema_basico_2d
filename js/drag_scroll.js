document.addEventListener('DOMContentLoaded', function() {
    const ele = document.getElementById('graph')
    ele.style.cursor = 'grab';

    let pos = { top: 0, left: 0, x: 0, y: 0 };

    const mouseDownHandler = function(e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Get the current mouse position
            x: e.clientX,
            y: e.clientY,
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };

    const mouseMoveHandler = function(e) {
        // How far the mouse has been moved
        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        // Scroll the element
        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function() {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    // Attach the handler
    ele.addEventListener('mousedown', mouseDownHandler);
});

$('#div2').bind('scroll', function(){
    console.log('---------------------------------')
    console.log($(this).scrollTop())
    console.log($(this).innerHeight())
    console.log($(this).scrollTop() + $(this).innerHeight())
    console.log($(this)[0].scrollHeight)

    if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        console.log($('#div2').find(">:first-child").height())
        $('#div2').find(">:first-child").height(`${ $('#div2').find(">:first-child").height() + 500 }px`)
    }
})