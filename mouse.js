var mX = 0, mY = 0,
    sX = 0, sY = 0,
    queue = [],
    interval = 200,
    recIntv = null,
    playIntv = null,
    closestElement = null,
    b = document.body,
    de = document.documentElement,
    cursor = document.getElementById("cursor"),
    // record = document.getElementById("record"),
    play = document.getElementById("play");

var opts = {
    includeSelf: true,
    // onlyY:true,
    sameX: false,
    sameY: false,
};

window.onload = function () {
    mX = 0, mY = 0,
        sX = 0, sY = 0,
        queue = [],
        interval = 200,
        recIntv = null,
        playIntv = null,
        b = document.body,
        de = document.documentElement,
        cursor = document.getElementById("cursor"),
        // record = document.getElementById("record"),
        play = document.getElementById("play");


    window.onmousemove = function (e) {
        e = e || window.event;
        if (e.pageX || e.pageY) {
            mX = e.pageX;
            mY = e.pageY;
        } else {
            mX = e.clientX + (de.scrollLeft || b.scrollLeft) -
                (de.clientLeft || 0);
            mY = e.clientY + (de.scrollTop || b.scrollTop) -
                (de.clientTop || 0);
        }

        var point = {
                x: e.pageX,
                y: e.pageY
            };

        var selectables = $('.selectable');

        selectables
            .removeClass('selected');
        $.nearest(point, '.selectable', opts)
            .addClass('selected');

        closestElement = $('.selected');
        // console.log(closestElement[0].value|| closestElement[0].innerText);

    };

    window.onscroll = function () {
        if (window.pageXOffset || window.pageYOffset) {
            sX = window.pageXOffset;
            sY = window.pageYOffset;
        } else {
            sX = de.scrollLeft || b.scrollLeft;
            sY = de.scrollTop || b.scrollTop;
        }
    };
};

var record = function (start) {
    if (start) {
        queue.length = 0;
        recIntv = setInterval(function () {
            queue.push([mX, mY, sX, sY, closestElement[0].value|| closestElement[0].innerText]);
        }, interval);
        // this.innerHTML = "Stop";
        cursor.style.display = "none";
        // play.disabled = true;
    } else {
        // this.innerHTML = "Record";
        clearInterval(recIntv);
        queue=[];
        recIntv = null;
        // play.disabled = false;
    }
};

// play.onclick = function () {
//     var i = 0;
//     if (playIntv === null) {
//         cursor.style.display = "inherit";
//         play.disabled = record.disabled = true;
//         playIntv = setInterval(function () {
//             if (i < queue.length) {
//                 cursor.style.left = queue[i][0] + "px";
//                 cursor.style.top = queue[i][1] + "px";
//                 window.scrollTo(queue[i][2], queue[i][3]);
//                 i++;
//             } else {
//                 clearInterval(playIntv);
//                 playIntv = null;
//                 play.disabled = record.disabled = false;
//             }
//         }, interval);
//     }
// };
