// Small demo interaction for the admin dashboard.
const createExamButton = document.getElementById("createExamButton");

if (createExamButton) {
    createExamButton.addEventListener("click", function (event) {
        event.preventDefault();

        const examName = prompt("Enter the new examination name:");
        if (!examName || !examName.trim()) return;

        const questionCount = prompt("Enter the number of questions:", "20");
        const duration = prompt("Enter duration in minutes:", "30");

        if (!questionCount || !duration || Number(questionCount) < 1 || Number(duration) < 1) {
            alert("Please enter valid numbers.");
            return;
        }

        const tableBody = document.querySelector(".table-panel tbody");
        const row = document.createElement("tr");
        [examName.trim(), questionCount, duration + " min", "Draft"].forEach(function (value) {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);

        alert("Demo exam added to this page. It is not saved to a server.");
    });
}
