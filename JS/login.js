const passordInput = document.querySelector('.passord');
const mailInput = document.querySelector('.mailInput');
const submitButton = document.querySelector('.submit');

const mailMsg = document.querySelector('.mailErr');
const letterMsg = document.querySelector('.letterErr');
const numberMsg = document.querySelector('.numberErr');
const symbolMsg = document.querySelector('.symbolErr');
const lengthMsg = document.querySelector('.lengthErr');

const mailPattern = /[a-z0-9!#$%&'+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-z0-9](?:[a-z0-9-][a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const letterPattern = /[a-z]/i;
const numberPattern = /[1-9]/;
const symbolPattern = /[ !'#¤%&/()=?`@£$€{},.;:_'*^¨~|§\\-]/;
const lengthPattern = /^.{13,50}$/;
const scriptPattern = /<script.*<\/script>/mi;
const dbPattern = /^.*database.*$/mi;

validEmail = false;
mailInput.addEventListener('keyup', () => {
    if (mailPattern.test(mailInput.value)) {
        mailMsg.textContent = 'Gyldig mail';
        mailMsg.classList.remove('pwErr');
        mailMsg.classList.add('pwValid');
        validEmail = true;
    } else {
        mailMsg.textContent = 'Ugyldig mail';
        mailMsg.classList.add('pwErr');
        mailMsg.classList.remove('pwValid');
        validEmail = false;
    }

    // Show submit button
    if (validEmail && validPw && !scriptPattern.test(passordInput.value) && !dbPattern.test(passordInput.value)) {
        submitButton.classList.remove('d-none');
        letterMsg.parentElement.classList.add('d-none');
    } else {
        submitButton.classList.add('d-none');
        letterMsg.parentElement.classList.remove('d-none');
    }
});

let validPw = false;
passordInput.addEventListener('keyup', () => {
    validPw = true;

    // Password has letter
    if (letterPattern.test(passordInput.value)) {
        letterMsg.classList.remove('pwErr');
        letterMsg.classList.add('pwValid');
    } else {
        letterMsg.classList.add('pwErr');
        letterMsg.classList.remove('pwValid');
        validPw = false;
    }

    // Password has number
    if (numberPattern.test(passordInput.value)) {
        numberMsg.classList.remove('pwErr');
        numberMsg.classList.add('pwValid');
    } else {
        numberMsg.classList.add('pwErr');
        numberMsg.classList.remove('pwValid');
        validPw = false;
    }
    
    // Password has symbol
    if (symbolPattern.test(passordInput.value)) {
        symbolMsg.classList.remove('pwErr');
        symbolMsg.classList.add('pwValid');
    } else {
        symbolMsg.classList.add('pwErr');
        symbolMsg.classList.remove('pwValid');
        validPw = false;
    }
    
    // Password has length
    if (lengthPattern.test(passordInput.value)) {
        lengthMsg.classList.remove('pwErr');
        lengthMsg.classList.add('pwValid');
    } else {
        lengthMsg.classList.add('pwErr');
        lengthMsg.classList.remove('pwValid');
        validPw = false;
    }

    // Show submit button
    if (validEmail && validPw && !scriptPattern.test(passordInput.value) && !dbPattern.test(passordInput.value)) {
        submitButton.classList.remove('d-none');
        letterMsg.parentElement.classList.add('d-none');
    } else {
        submitButton.classList.add('d-none');
        letterMsg.parentElement.classList.remove('d-none');
    }
});

const loginForm = document.querySelector('.loginForm');

loginForm.addEventListener('submit', e => {
    e.preventDefault();

    if (validPw && !scriptPattern.test(passordInput.value) && !dbPattern.test(passordInput.value)) {
        console.log('YOUR LOGIN IS VALID :D');
    } else {
        console.log('YOUR LOGIN AIN\'T VALID MAN >:C');
    }
});