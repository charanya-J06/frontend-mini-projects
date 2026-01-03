// ------------- Input References ----------------
const firstNameInput = document.getElementById("firstname-input");
const lastNameInput = document.getElementById("lastname-input");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const verifyPasswordInput = document.getElementById("verify-password");
const submitButton = document.getElementById("submit-button");

// ------------ Error References --------------
const errors = {
    firstname: {
        invalid: document.getElementById("firstname-error"),
        empty: document.getElementById("empty-firstname")
    },
    lastname: {
        invalid: document.getElementById("lastname-error"),
        empty: document.getElementById("empty-lastname")
    },
    email: {
        invalid: document.getElementById("email-error"),
        empty: document.getElementById("empty-email")
    },
    phone: {
        invalid: document.getElementById("phone-error"),
        empty: document.getElementById("empty-phone")
    },
    password: {
        invalid: document.getElementById("password-error"),
        empty: document.getElementById("empty-password")
    },
    confirmPassword: {
        invalid: document.getElementById("verify-password-error"),
        empty: document.getElementById("empty-verify-password")
    }
};

// ------------------ Validation Functions ------------------
const textVerify = text => /^[a-zA-Z]{2,}$/.test(text);
const emailVerify = email =>
    /^[a-z0-9]+(\.[a-z0-9]+)*@[a-z0-9]+(\.[a-z]{2,})+$/i.test(email);
const phoneVerify = phone => /^[0-9]{10}$/.test(phone);
const passwordVerify = password =>
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password);

// ------------------ UI Helpers ------------------
const showError = (input, errorSpan) => {
    errorSpan.classList.remove("hide");
    input.classList.add("error");
    input.classList.remove("valid");
};

const hideError = errorSpan => errorSpan.classList.add("hide");

const markValid = input => {
    input.classList.remove("error");
    input.classList.add("valid");
};

const handleEmpty = (input, emptyError, otherError) => {
    if (!input.value.trim()) {
        emptyError.classList.remove("hide");
        hideError(otherError);
        input.classList.add("error");
        return true;
    }
    hideError(emptyError);
    return false;
};

// ------------------ Field Validators ------------------
const validateField = (input, validator, errorObj) => {
    if (handleEmpty(input, errorObj.empty, errorObj.invalid)) return false;

    if (!validator(input.value)) {
        showError(input, errorObj.invalid);
        return false;
    }

    hideError(errorObj.invalid);
    markValid(input);
    return true;
};

// ------------------ Individual Field Events ------------------
firstNameInput.addEventListener("input", () =>
    validateField(firstNameInput, textVerify, errors.firstname)
);

lastNameInput.addEventListener("input", () =>
    validateField(lastNameInput, textVerify, errors.lastname)
);

emailInput.addEventListener("input", () => {
    emailInput.value = emailInput.value.toLowerCase();
    validateField(emailInput, emailVerify, errors.email);
});

phoneInput.addEventListener("input", () =>
    validateField(phoneInput, phoneVerify, errors.phone)
);

passwordInput.addEventListener("input", () =>
    validateField(passwordInput, passwordVerify, errors.password)
);

verifyPasswordInput.addEventListener("paste", e => e.preventDefault());
verifyPasswordInput.addEventListener("input", () => {
    if (handleEmpty(
        verifyPasswordInput,
        errors.confirmPassword.empty,
        errors.confirmPassword.invalid
    )) return;

    if (verifyPasswordInput.value !== passwordInput.value) {
        showError(verifyPasswordInput, errors.confirmPassword.invalid);
        return;
    }

    hideError(errors.confirmPassword.invalid);
    markValid(verifyPasswordInput);
});

// ------------------ Password Toggle ------------------
document.getElementById("toggle-password").onclick = () => {
    passwordInput.type =
        passwordInput.type === "password" ? "text" : "password";
};

document.getElementById("toggle-confirm-password").onclick = () => {
    verifyPasswordInput.type =
        verifyPasswordInput.type === "password" ? "text" : "password";
};

// ------------------ Form Validation ------------------
const isFormValid = () =>
    textVerify(firstNameInput.value) &&
    textVerify(lastNameInput.value) &&
    emailVerify(emailInput.value) &&
    phoneVerify(phoneInput.value) &&
    passwordVerify(passwordInput.value) &&
    verifyPasswordInput.value === passwordInput.value;

// Enable/Disable submit button dynamically
document.querySelector("#signup-form").addEventListener("input", () => {
    submitButton.disabled = !isFormValid();
});

// ------------------ Submit Handler ------------------
submitButton.addEventListener("click", e => {
    e.preventDefault();

    if (!isFormValid()) {
        alert("Please fix the errors before submitting.");
        return;
    }

    submitButton.disabled = true;
    submitButton.innerText = "Creating Account...";

    setTimeout(() => {
        alert("Account Created Successfully!");
        document.getElementById("signup-form").reset();

        document.querySelectorAll("input").forEach(input => {
            input.classList.remove("valid", "error");
        });
        submitButton.innerText = "Signup";
        submitButton.disabled = false;
    }, 1500);
});
