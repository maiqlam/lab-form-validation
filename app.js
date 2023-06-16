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
let validUser = false;
let validEmail = false;
let validPassword = false;
let verifyPassword = false;

userReg.addEventListener('change', function(event) {
    if (!usernamePattern.test(userReg.value)) {
        if (userReg.value === '') {
            showError(`Username cannot be blank.`);
        } else {
        showError(`Username must be between 4 to 16 characters long and contain at least two unique characters. Username cannot contain any special characters or spaces between characters.`); }
    } else {
        noError();
        validUser = true;
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
        validEmail = true;
    }
});

const passwordReg = document.querySelector('#passwordReg');
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[^\s]{12,}$/;
const passwordExclude = /(?=.*password)/i;
// const passwordRestrict = new RegExp(`(?=.*${userReg.value})`);
const passwordCheck = document.querySelector('#passwordCheck');
passwordReg.addEventListener('input', function (event) {
    const passwordRestrict = new RegExp(`(?=.*${userReg.value})`);
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
        validPassword = true;
    }
    }
);

passwordCheck.addEventListener('change', function(event) {
    if (passwordCheck.value !== passwordReg.value) {
        showError(`Passwords must match.`);
    } else {
        noError();
        verifyPassword = true;
    }
});

const terms = document.querySelector('#terms');

registration.addEventListener('submit', function(event){
    event.preventDefault();
    
    let username = userReg.value.toLowerCase();
    let email = emailReg.value.toLowerCase();
    let password = passwordReg.value;
    let database = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = database.some(function(user) {
        return user.user === username;
    });
    console.log(existingUser);
    if (existingUser) {
        alert("Username already exists.");
        event.stopPropagation;
        return;
    }
    let registeredEmail = database.some(function(user){
        return user.email === email;
    });
    console.log(registeredEmail);
    if (registeredEmail) {
        alert("This email is already registered to an account. Please use a different email.");
        event.stopPropagation;
        return;
    }

    if(!validPassword) {
        alert("Password not valid. See password requirements.")
        event.stopPropagation;
        return;
    }

    if(!verifyPassword) {
        alert("Passwords must match.")
        event.stopPropagation;
        return;
    }

    else {    
        database.push({user: username, email: email, password: password});
        localStorage.setItem("users", JSON.stringify(database));
        alert("Account registration successful.");
        console.log(database);

        userReg.value = "";
        emailReg.value = "";
        passwordReg.value = "";
        passwordCheck.value = "";
        terms.checked = false;
    }
});

const loginForm = document.querySelector('#login');
const userLog = document.querySelector('#userLog');
const passwordLog = document.querySelector('#passwordLog');
const stayLoggedIn = document.querySelector('#persist');

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    
    let loginUser = userLog.value.toLowerCase();
    let loginPass = passwordLog.value;
    let database = JSON.parse(localStorage.getItem("users")) || [];
    let existingAcct = database.find(function(user) {
        return user.user === loginUser;
    });
    if (existingAcct) {
        if (existingAcct.password === loginPass) {
            userLog.value = "";
            passwordLog.value = "";
            if (stayLoggedIn.checked) {
                alert(`User will remain logged in.`)
            } else {
                alert(`You have successfully logged in.`)
            }
        } else {
            alert(`Password is incorrect. Please try again.`)
        }
    }
    else if (!existingAcct) {
        alert(`User does not exist.`);
    }
    });