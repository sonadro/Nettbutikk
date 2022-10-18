const passordInput = document.querySelector(".passord");

const letterMsg = document.querySelector(".letterErr");
const numberMsg = document.querySelector(".numberErr");
const symbolMsg = document.querySelector(".symbolErr");
const lengthMsg = document.querySelector(".lengthErr");

const letterPattern = /[a-z]/i;
const numberPattern = /[1-9]/;
const symbolPattern = /[ !"#¤%&/()=?`@£$€{},.;:_'*^¨~|§\\-]/;
const lengthPattern = /^.{6,50}$/;
const scriptPattern = /<script.*<\/script>/mi;
const dbPattern = /^.*database.*$/mi;

let validPw = false;
passordInput.addEventListener("keyup", () => {
    validPw = true;

    // Password has letter
    if (letterPattern.test(passordInput.value)) {
        letterMsg.classList.remove("pwErr");
        letterMsg.classList.add("pwValid");
    } else {
        letterMsg.classList.add("pwErr");
        letterMsg.classList.remove("pwValid");
        validPw = false;
    }

    // Password has number
    if (numberPattern.test(passordInput.value)) {
        numberMsg.classList.remove("pwErr");
        numberMsg.classList.add("pwValid");
    } else {
        numberMsg.classList.add("pwErr");
        numberMsg.classList.remove("pwValid");
        validPw = false;
    }
    
    // Password has symbol
    if (symbolPattern.test(passordInput.value)) {
        symbolMsg.classList.remove("pwErr");
        symbolMsg.classList.add("pwValid");
    } else {
        symbolMsg.classList.add("pwErr");
        symbolMsg.classList.remove("pwValid");
        validPw = false;
    }
    
    // Password has length
    if (lengthPattern.test(passordInput.value)) {
        lengthMsg.classList.remove("pwErr");
        lengthMsg.classList.add("pwValid");
    } else {
        lengthMsg.classList.add("pwErr");
        lengthMsg.classList.remove("pwValid");
        validPw = false;
    }
});

const loginForm = document.querySelector(".loginForm");

loginForm.addEventListener("submit", e => {
    e.preventDefault();

    if (validPw === false) {
        console.log("STOP THAT!");
    }

    if (!scriptPattern.test(passordInput.value) && !dbPattern.test(passordInput.value)) {
        console.log("The password can be registered");
    } else {
        console.log("The password cannot be registered");
    }
});