const scriptURL = 'https://script.google.com/macros/s/AKfycbwmY5L-COX0hfyuCVov57kdHZsJbWZ60F0zcaWEIk7p-_e0cGoi0c_HL16TOwdEghH-/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");

form.addEventListener('submit', e => {
    e.preventDefault()

    const emailInput = form.querySelector('input[name="Email"]');
    const email = emailInput.value.trim();

    emailInput.addEventListener("input", () => {
        msg.innerHTML = "";
    });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        msg.style.color = "red";
        msg.innerHTML = "Please enter a valid email address.";
        return;
    }
    msg.style.color = "#fff";
    msg.innerHTML = "Submitting...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => response.json())
        .then(data => {
            console.log(data.result);
            if (data.result === "duplicate") {
                msg.style.color = "orange";
                msg.innerHTML = "This email is already subscribed.";
                return;
            }
            if (data.result === "success") {
                msg.style.color = "#1fa607";
                msg.innerHTML = "Thanks for joining us!";
                form.reset();
                setTimeout(() => msg.innerHTML = "", 5000);
            }
        })
        .catch(() => {
            msg.style.color = "red";
            msg.innerHTML = "Something went wrong. Try again!";
        })

})