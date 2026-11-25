// Display the result saved by exam.js.
const result = JSON.parse(localStorage.getItem("oesLastResult") || "null");

if (result) {
    document.getElementById("examName").textContent = result.examName;
    document.getElementById("studentName").textContent =
        "Student: " + result.studentName + " (" + result.rollNumber + ")";
    document.getElementById("score").textContent = result.correct + " / " + result.total;
    document.getElementById("percentage").textContent = result.percentage + "%";
    document.getElementById("correctAnswers").textContent = result.correct;
    document.getElementById("wrongAnswers").textContent = result.wrong;
    document.getElementById("timeTaken").textContent = result.timeTaken + " min";
    document.getElementById("status").textContent = result.percentage >= 40 ? "Passed" : "Needs Improvement";
} else {
    document.getElementById("studentName").textContent = "No examination result found. Please attempt an exam first.";
}
