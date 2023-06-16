const registration = document.querySelector('#registration');

const userReg = document.querySelector('#userReg');


const errorDisplay = document.querySelector('#errorDisplay');
function showError(errorMsg) {
    errorDisplay.style.display = 'block';
    errorDisplay.innerText = errorMsg;
}

function noError() {
    errorDisplay.style.display = 'none';
}
const usernamePattern = /^(?:(\w)(?!\1)){2}\w{2,16}$/;

userReg.addEventListener('change', function(event) {
    if (!usernamePattern.test(userReg.value)) {
        if (userReg.value === '') {
            showError(`Username cannot be blank.`);
        } else {
        showError(`Username must be between 4 to 16 characters long and contain at least two unique characters. Username cannot contain any special characters or spaces between characters.`); }
    } else {
        noError();
    }
});

const emailReg = document.querySelector('#emailReg');
const emailPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const emailRestriction = /@example\.com$/;

emailReg.addEventListener('change', function(event){
    if (!emailPattern.test(emailReg.value) || emailRestriction.test(emailReg.value)) {
        showError(`Email must be a valid email address.`);
    } else {
        noError();
    }
});

const passwordReg = document.querySelector('#passwordReg');
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{12,}$/;
const passwordExclude = /(?=.*password)/i;
const passwordRestrict = new RegExp(`(?=.*${userReg.value})`);
const passwordCheck = document.querySelector('#passwordCheck');
passwordReg.addEventListener('input', function (event) {
    if (passwordReg.value.length < 12) {
        showError(`Minimum of 12 characters required.`)
    }
    else if (!passwordPattern.test(passwordReg.value)) {
        showError(`Password must contain each of the following: uppercase character, lowercase character, numerical character, and a special character (!@#$%^&*).`);
    } 
    else if (passwordExclude.test(passwordReg.value)) {
            showError(`Password cannot contain any variation of the following string: 'password'`)
        }
    else if (passwordRestrict.test(passwordReg.value)) {
        showError(`Password cannot contain username.`)
    } else {
        noError();
    }
    }
);

passwordCheck.addEventListener('change', function(event) {
    if (passwordCheck.value !== passwordReg.value) {
        showError(`Passwords must match.`);
    } else {
        noError();
    }
});

const terms = document.getElementsByName('terms');

registration.addEventListener('submit', function(event){
    event.preventDefault();


})