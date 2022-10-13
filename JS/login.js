const passordInput = document.querySelector(".passord");
// const letterMsg = document.querySelector(".");

const letterPattern = /[a-z]/gmi;
const numberPattern = /[1-9]/gmi;
const symbolPattern = /[ !"#¤%&/()=?`@£$€{},.-;:_'*^¨~<>|§]/gmi;
const lengthPattern = /^.{6,50}$/gmi;

passordInput.addEventListener("keyup", e => {

    //Password has letter
    if (letterPattern.test(passordInput)) {

    }
});