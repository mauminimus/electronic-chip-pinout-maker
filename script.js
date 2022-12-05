let s = ["", "", "", "", "", ""];

function SetPinNumber() {
    let pinAmmount = document.getElementById("pinAmmount_number").value * 1;
    
    if (pinAmmount % 2 == 0) {
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
            s[0] += '<input type="text" id="text' +(i+1)+ '">';
            s[1] += '<div class="pinLeft"></div>';
            s[2] += '<input type="button" value="' +(i+1)+ '" onclick="ul(' +(i+1)+ ');">';
            s[3] += '<div class="pinRight"></div>';
            s[4] += '<input type="text" id="text' +(pinAmmount-i)+ '">';
            s[5] += '<input type="button" value="' +(pinAmmount-i)+ '" onclick="ul(' +(pinAmmount-i)+ ');">';
        }

        //write to html
        for (let i = 0; i < sides.length; i++) {
            sides[i].innerHTML = s[i];
        }
    }
    else {
        alert("pin ammount must be even!")
    }
}

function ul(pinNumber) {
    let text = document.querySelector('#text' +pinNumber);
    if (text.classList.contains("underlined")) {
        text.classList.remove("underlined");
    }
    else {
        text.classList.add("underlined");
    }
}