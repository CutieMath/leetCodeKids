let spinner = document.querySelector(".spinner");
let btn = document.getElementById("start");
let number = Math.ceil(Math.random() * 1000);

btn.onclick = function(){
    spinner.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * 1000);
}