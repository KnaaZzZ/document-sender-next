export const normalizedEmail = (email : string) => {
    email = email.trim().toLowerCase();
    var emailArr = email.split("@");
    emailArr[0] = emailArr[0].replace(".", "");
    emailArr[1] = emailArr[1].trim(); 
    emailArr[1] = emailArr[1].split(".")[0]+"."+emailArr[1].split(".")[1];
    return emailArr[0].split(emailArr[1].split(".")[0] === "yahoo" ? "-" : "+")[0]+"@"+emailArr[1];
}

export const hashedString = (str : string) => {
    var hashValue = 5381
    for (let i = 0; i < str.length; i++) {
        hashValue = (hashValue << 5) + str.charCodeAt(i);
    }
    return hashValue.toString(16);
}

export const isValidEmail = (email : string) => {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

export const isValidPassword = (password : string) => {
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/) && password.length > 7;
}