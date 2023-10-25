let s = ["", "", "", "", "", ""];

let iconarea = document.querySelector("#iconarea");



function download() {
    var link = document.createElement('a');
    link.download = 'chip_icon.png';
    link.href = document.getElementById('canvas').toDataURL()
    link.click();
}

// chip icon drawing onto canvas
function drawicon() {
    let pinAmmount = document.getElementById("pinAmmount_number").value * 1;
    if (pinAmmount % 2 == 0 && pinAmmount >= 2) {

        var canvaselement = document.getElementById("canvas");
        canvas = canvaselement.getContext("2d");
        
        // height = 2 * 30 for padding on top and bottom, border is 2* 3 pixel??, 10 pixel margin for pins, 22 pixel for pin height
        // 2 * 33 + pinAmmount * 16 + 10
        var variableheight = 76 + (pinAmmount * 16); // confirmed, works as expected
        
        canvaselement.style.height = variableheight+"px"; // wtf javascript, this dont make sense
        canvaselement.height = variableheight;
        canvaselement.width = 340;
        // actually it makes sense, you have to adjust both the html element size, and the canvas size
        

        canvas.globalAlpha = 1.00;
        canvas.fillStyle="#FFFFFF";
        canvas.fillRect(0, 0, 340, variableheight);
        
        
        // canvas style setup
        canvas.fillStyle = "#000000";
        canvas.strokeStyle = "#000000";
        canvas.lineWidth = 3;
        
        
        // for testing
        
        
        // draw body
        // case width is 100px, centered, 340/2 = 170 , -50 -> 120 -> x:120;y:30, width:100, height: pinammount*16 + 10
        // +1 for xy and -3 for size because border, but +3 on y, i dont understand lol, probly don math wrong
        canvas.strokeRect(121.5, 31.5, 97, (pinAmmount * 16) + 13);
        // delete 33px for noch
        canvas.fillStyle = "#FFFFFF";
        canvas.fillRect(155, 30, 30, 3);
        canvas.fillStyle = "#000000";
        // center at 170 30, radius is yes
        // the center y is actually a bit lower
        // lol we get to do arc, yesss
        canvas.beginPath();
        canvas.arc(170, 33, 16.5, 0, Math.PI);
        canvas.stroke();
        
        
        // loop to draw pins
        for (i = 0; i < pinAmmount/2; i++) {
            // x 170-26-50  y30 + 10, size 26x22
            canvas.strokeRect(98.5, 44.5+i*32, 23, 19);
            canvas.strokeRect(218.5, 44.5+i*32, 23, 19);
        }
        
        
        // loop to draw pin numbers
        canvas.font = "18px Roboto";
        for (i = 0; i < pinAmmount/2; i++) {
            canvas.textAlign = "start";
            canvas.fillText(i+1, 128, 60+i*32);
            canvas.textAlign = "end";
            canvas.fillText(pinAmmount-i, 212.5, 60+i*32);
        }
        
    } else {
        alert("pin number must be even and above 0!");
        document.getElementById("pinAmmount_number").value = 2
    }
}

function drawtext(textid) {
    
    let pinAmmount = document.getElementById("pinAmmount_number").value * 1;
    var text = document.getElementById("text"+textid).value;

    //console.log(text);

    var canvaselement = document.getElementById("canvas");
    canvas = canvaselement.getContext("2d");
    canvas.font = "20px Roboto";
    
    if (textid <= pinAmmount / 2) {
        canvas.fillStyle = "#FFFFFF";
        canvas.fillRect(14, 10+textid*32, 80, 24);
        canvas.fillStyle = "#000000"
        canvas.textAlign = "end";
        canvas.fillText(text, 94, 29+textid*32);
    }
    else {
        canvas.fillStyle = "#FFFFFF";
        canvas.fillRect(244, 42 + (pinAmmount - textid) * 32, 96, 24);
        canvas.fillStyle = "#000000"
        canvas.textAlign = "start";
        canvas.fillText(text, 246, 61 + (pinAmmount - textid) * 32);
    }

    ul(textid);
    ul(textid);
}

function underlineCanvas(color, _pinNumber) {
    let pinAmmount = document.getElementById("pinAmmount_number").value * 1;
    var canvaselement = document.getElementById("canvas");
    canvas = canvaselement.getContext("2d");

    var textlen = Math.ceil(canvas.measureText(document.getElementById("text"+_pinNumber).value).width);

    canvas.fillStyle = color;

    if (_pinNumber <= pinAmmount / 2) {
        canvas.fillRect(94 - textlen, 10+_pinNumber*32, textlen, 2);
    } else {
        canvas.fillRect(246, 42 + (pinAmmount - _pinNumber) * 32, textlen, 2);
    }
}

// chip icon dom placing
function SetPinNumber() {
    let pinAmmount = document.getElementById("pinAmmount_number").value * 1;
    
    if (pinAmmount % 2 == 0 && pinAmmount >= 2) {
        //get containers
        let sides = document.querySelectorAll(
            '#leftboxtext, #leftbox, #leftboxnumbers, #rightboxnumbers, #rightbox, #rightboxtext'
        );
        
        //empty containers
        for (let i = 0; i < sides.length; i++) {
            s[i] = "";
        }

        //fill list with new elements
        for (let i = 0; i < pinAmmount/2; i++) {
            s[0] += '<input type="text" id="text' +(i+1)+ '"  onchange="drawtext(' +(i+1)+ ');">';
            s[1] += '<div class="pinLeft"></div>';
            s[2] += '<input type="button" value="' +(i+1)+ '" onclick="ul(' +(i+1)+ ');">';
            s[3] += '<div class="pinRight"></div>';
            s[4] += '<input type="text" id="text' +(pinAmmount-i)+ '"  onchange="drawtext(' +(pinAmmount-i)+ ');">';
            s[5] += '<input type="button" value="' +(pinAmmount-i)+ '" onclick="ul(' +(pinAmmount-i)+ ');">';
        }

        //write to html
        for (let i = 0; i < sides.length; i++) {
            sides[i].innerHTML = s[i];
        }
    }
}

// ul stands for underline, as when you click the number in the chip icon the input pin is inverted
function ul(pinNumber) {
    let text = document.querySelector('#text' +pinNumber);
    if (text.classList.contains("underlined")) {
        text.classList.remove("underlined");
        underlineCanvas("#FFFFFF", pinNumber);
    }
    else {
        text.classList.add("underlined");
        underlineCanvas("#000000", pinNumber);
    }
}

setTimeout(drawicon, 200);