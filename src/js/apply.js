document.getElementById("applyForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const jobName = document.getElementById("jobName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const cv = document.getElementById("cv").files[0];

    if (!jobName || !firstName || !lastName || !email || !cv) {
        alert("Please fill out all fields.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!isValidFileType(cv)) {
        alert("Only PDF, DOC, or DOCX files are allowed.");
        return;
    }

    alert("Your application has been submitted successfully!");
    // Further backend integration here.
});

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidFileType(file) {
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}