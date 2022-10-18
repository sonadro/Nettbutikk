let passordInput = document.querySelector(".passord");
console.log(passordInput);

let errorMsgs = document.querySelector(".errorMsg");
console.log(errorMsgs);

const letterPattern = /[a-z]/gmi;
const numberPattern = /[1-9]/gmi;
const symbolPattern = /[ !"#¤%&/()=?`@£$€{},.-;:_'*^¨~<>|§]/gmi;
const lengthPattern = /^.{6,50}$/gmi;

passordInput.addEventListener("keyup", e => {

    //Password has letter
    if (letterPattern.test(passordInput.value)) {
        console.log("A");
    }
});