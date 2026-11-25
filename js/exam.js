// Beginner-friendly MCQ examination logic.
const questions = [
    { question: "Which of the following is a programming language?", options: ["HTML", "CSS", "Java", "SQL"], answer: 2 },
    { question: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Control Processing User"], answer: 0 },
    { question: "Which company developed Java?", options: ["Microsoft", "Sun Microsystems", "Apple", "Google"], answer: 1 },
    { question: "Which symbol is used to end most Java statements?", options: [".", ":", ";", ","], answer: 2 },
    { question: "Which one is an input device?", options: ["Monitor", "Printer", "Keyboard", "Speaker"], answer: 2 },
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Transfer Main Link", "Home Tool Markup Language"], answer: 0 },
    { question: "Which part is called the brain of the computer?", options: ["RAM", "CPU", "Hard disk", "Mouse"], answer: 1 },
    { question: "Which memory is volatile?", options: ["ROM", "Hard disk", "RAM", "DVD"], answer: 2 },
    { question: "Which language is mainly used to style web pages?", options: ["HTML", "CSS", "SQL", "C"], answer: 1 },
    { question: "Which of these is an operating system?", options: ["Windows", "Google", "HTML", "Intel"], answer: 0 },
    { question: "What is the full form of URL?", options: ["Uniform Resource Locator", "Universal Record Link", "Unified Resource Line", "User Reference Location"], answer: 0 },
    { question: "Which device is used to print documents?", options: ["Scanner", "Printer", "Router", "Joystick"], answer: 1 },
    { question: "Which number system uses only 0 and 1?", options: ["Decimal", "Octal", "Binary", "Hexadecimal"], answer: 2 },
    { question: "Which shortcut is commonly used to copy selected text?", options: ["Ctrl + X", "Ctrl + V", "Ctrl + C", "Ctrl + Z"], answer: 2 },
    { question: "Which one is a web browser?", options: ["Linux", "Chrome", "Python", "Java"], answer: 1 },
    { question: "What does LAN stand for?", options: ["Local Area Network", "Large Access Node", "Long Area Network", "Linked Application Network"], answer: 0 },
    { question: "Which storage device generally has no moving parts?", options: ["HDD", "SSD", "DVD drive", "Floppy disk"], answer: 1 },
    { question: "Which of these is used to query a relational database?", options: ["CSS", "SQL", "HTTP", "XML"], answer: 1 },
    { question: "What is the smallest unit of data?", options: ["Byte", "Bit", "Kilobyte", "Megabyte"], answer: 1 },
    { question: "Which protocol is commonly used to browse secure websites?", options: ["FTP", "HTTP", "HTTPS", "SMTP"], answer: 2 }
];

const answers = {};
let currentQuestion = 0;
let secondsLeft = 30 * 60;
let timerId;
const startTime = Date.now();

const questionHeading = document.getElementById("questionHeading");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const questionNumbers = document.getElementById("questionNumbers");
const answeredCount = document.getElementById("answeredCount");
const timerText = document.getElementById("timer");
const studentLabel = document.getElementById("studentLabel");

const activeUser = JSON.parse(localStorage.getItem("oesActiveUser") || "null");
if (activeUser && studentLabel) {
    studentLabel.textContent = "Roll No: " + activeUser.rollNumber;
}

function showQuestion() {
    const item = questions[currentQuestion];
    questionHeading.textContent = "Question " + (currentQuestion + 1);
    questionText.textContent = item.question;
    optionsContainer.innerHTML = "";

    item.options.forEach(function (option, index) {
        const label = document.createElement("label");
        label.className = "option";

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = index;
        radio.checked = answers[currentQuestion] === index;
        radio.addEventListener("change", function () {
            answers[currentQuestion] = index;
            updateQuestionNumbers();
        });

        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + option));
        optionsContainer.appendChild(label);
    });

    updateQuestionNumbers();
    document.getElementById("previousButton").disabled = currentQuestion === 0;
    document.getElementById("nextButton").disabled = currentQuestion === questions.length - 1;
}

function updateQuestionNumbers() {
    answeredCount.textContent = "Answered: " + Object.keys(answers).length + " / " + questions.length;
    questionNumbers.innerHTML = "";

    questions.forEach(function (_, index) {
        const button = document.createElement("button");
        button.type = "button";
        button.textContent = index + 1;
        if (index === currentQuestion) button.classList.add("active");
        if (answers[index] !== undefined) button.classList.add("answered");
        button.addEventListener("click", function () {
            currentQuestion = index;
            showQuestion();
        });
        questionNumbers.appendChild(button);
    });
}

function updateTimer() {
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    timerText.textContent = "Time Left: " + minutes + ":" + String(seconds).padStart(2, "0");

    if (secondsLeft <= 0) {
        clearInterval(timerId);
        submitExam(true);
        return;
    }
    secondsLeft--;
}

function submitExam(timeUp) {
    if (!timeUp && !confirm("Are you sure you want to submit the examination?")) return;

    clearInterval(timerId);
    let correct = 0;
    questions.forEach(function (item, index) {
        if (answers[index] === item.answer) correct++;
    });

    const user = JSON.parse(localStorage.getItem("oesActiveUser") || "null");
    const total = questions.length;
    const result = {
        examName: "Computer Fundamentals",
        studentName: user ? user.name : "Guest Student",
        rollNumber: user ? user.rollNumber : "Not provided",
        correct: correct,
        wrong: total - correct,
        total: total,
        percentage: Math.round((correct / total) * 100),
        timeTaken: Math.floor((Date.now() - startTime) / 60000),
        timeUp: Boolean(timeUp),
        date: new Date().toLocaleString()
    };

    localStorage.setItem("oesLastResult", JSON.stringify(result));
    window.location.href = "results.html";
}

document.getElementById("previousButton").addEventListener("click", function () {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion();
    }
});

document.getElementById("nextButton").addEventListener("click", function () {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    }
});

document.getElementById("submitExam").addEventListener("click", function () {
    submitExam(false);
});

showQuestion();
updateTimer();
timerId = setInterval(updateTimer, 1000);
