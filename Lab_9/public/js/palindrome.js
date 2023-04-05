const validateText = /[^0-9a-z]/gi;
let myForm = document.getElementById('userForm');
let textArea = document.getElementById('phrase');
let orederedList = document.getElementById('attempts');
let errorPara = document.getElementById('error-message');
errorPara.style.display = "none";

const isPalindrome = str => {
    if (!str || typeof str !== 'string' || str.trim().length === 0) {
        return 'Invalid str';
    }
    let reversed = [...str].reverse().join('');
    return reversed === str;
}

if (myForm) {
    myForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let text = textArea.value.toLowerCase().trim().replace(validateText, '');
        console.log(text);
        console.log(validateText.test(text));
        if (text === "" || text.length === 0) {
            errorPara.innerHTML = "Invalid Phrase";
            if (errorPara.style.display === "none") {
                errorPara.style.display = "block";
            }
        } else {
            errorPara.style.display = "none";
            let li = document.createElement('li');
            if (isPalindrome(text)) {
                li.classList.add('is-palindrome');
            } else {
                li.classList.add('not-palindrome');
            }
            attempts.appendChild(li);
            li.innerHTML = textArea.value;
        }
    });
}