const registration = document.querySelector('#registration');

const userReg = document.querySelector('#userReg');

const errorDisplay = document.querySelector('#errorDisplay');
// const showError = 
// let errorMsg = [];
const usernamePattern = /^(?:(\w)(?!\1)){2}\w{2,16}$/;

userReg.addEventListener('change', function(event) {
    if (!usernamePattern.test(userReg.value)) {
        errorDisplay.style.display = 'block';
        if (userReg.value === '') {
            errorDisplay.innerText = `Username cannot be blank.`;
        } else {
        errorDisplay.innerText = `Username must be between 4 to 16 characters long and contain at least two unique characters. Username cannot contain any special characters or spaces between characters.`; }
    } else {
        errorDisplay.style.display = 'none';
    }
});