const isEmpty = (string) => {
    if(string.trim() === '') return true;
    return false;
}

const isEmail = (email) => {
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(email.match(emailRegEx)) return true;
    else return false;
}

exports.validateSignupData = (newUser) => {
    let errors = {};

    if(isEmpty(newUser.email)) {
        errors.email = "Can't be empty";
    }
    else if(!isEmail(newUser.email)) {
        errors.email = "Invalid email"
    }

    if(isEmpty(newUser.password)) {
        errors.password = "Can't be empty";
    }
    
    if(newUser.password !== newUser.confirmPassword) {
        errors.confirmPassword = "Password do not match"
    }

    if(isEmpty(newUser.firstName)) {
        errors.handle = "Can't be empty"
    }

    if(isEmpty(newUser.lastName)) {
        errors.handle = "Can't be empty"
    }

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true  : false
    }
}

exports.validateLoginData = (user) => {
    let errors = {};
    if(isEmpty(user.email)) errors.email = "Can't be empty";
    if(isEmpty(user.password)) errors.password = "Can't be empty";
    
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false
    }
}