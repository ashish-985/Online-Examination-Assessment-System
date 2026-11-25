// Simple front-end demo authentication.
// IMPORTANT: This stores demo credentials in localStorage. Never use this
// approach for real accounts; a real system needs a secure backend.
const USERS_KEY = "oesUsers";
const ACTIVE_USER_KEY = "oesActiveUser";

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
}

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("fullName").value.trim();
        const rollNumber = document.getElementById("rollNumber").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password.length < 6) {
            alert("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const users = getUsers();
        const alreadyExists = users.some(function (user) {
            return user.rollNumber.toLowerCase() === rollNumber.toLowerCase();
        });

        if (alreadyExists) {
            alert("This roll number is already registered.");
            return;
        }

        users.push({ name: name, rollNumber: rollNumber, email: email, password: password });
        localStorage.setItem(USERS_KEY, JSON.stringify(users));

        alert("Registration successful. You can now log in.");
        window.location.href = "login.html";
    });
}

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const rollNumber = document.getElementById("loginRollNumber").value.trim();
        const password = document.getElementById("loginPassword").value;

        const user = getUsers().find(function (item) {
            return item.rollNumber.toLowerCase() === rollNumber.toLowerCase()
                && item.password === password;
        });

        if (!user) {
            alert("Invalid roll number or password. Please register first.");
            return;
        }

        localStorage.setItem(ACTIVE_USER_KEY, JSON.stringify({
            name: user.name,
            rollNumber: user.rollNumber,
            email: user.email
        }));

        window.location.href = "instructions.html";
    });
}
