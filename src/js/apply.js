// Додаємо обробник події для відображення вибраного файлу
document.getElementById("cv").addEventListener("change", function () {
    const fileInput = document.getElementById("cv");
    const fileList = fileInput.files;
    const fileNameDisplay = document.getElementById("fileNameDisplay");

    // Перевірка: дозволяється лише один файл
    if (fileList.length > 1) {
        alert("You can only upload one file.");
        fileInput.value = ""; // Очищаємо вибір файлу
        fileNameDisplay.textContent = "No file selected"; // Очищаємо текст
        return;
    }

    // Відображаємо ім'я файлу або повідомлення про відсутність вибору
    if (fileList.length === 1) {
        fileNameDisplay.textContent = `Selected file: ${fileList[0].name}`;
        fileNameDisplay.style.color = "#28a745"; // Зелений колір для успішного вибору
    } else {
        fileNameDisplay.textContent = "No file selected.";
        fileNameDisplay.style.color = "#dc3545"; // Червоний колір для помилки
    }
});

// Додаємо обробник події для відправлення форми
document.getElementById("applyForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Отримуємо значення з полів форми
    const jobName = document.getElementById("jobName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const cv = document.getElementById("cv").files[0];

    // Перевірка на заповнення всіх полів
    if (!jobName || !firstName || !lastName || !email || !cv) {
        alert("Please fill out all fields.");
        return;
    }

    // Перевірка валідності email
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    // Перевірка дозволених типів файлів
    if (!isValidFileType(cv)) {
        alert("Only PDF, DOC, or DOCX files are allowed.");
        return;
    }

    // Показуємо стилізоване модальне вікно
    showSuccessModal();
});

// Функція для перевірки валідності email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Функція для перевірки типу файлу
function isValidFileType(file) {
    const allowedExtensions = ["pdf", "doc", "docx"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    return allowedExtensions.includes(fileExtension);
}

// Функція для показу модального вікна
function showSuccessModal() {
    const modal = document.createElement("div");
    modal.id = "successModal";
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Application Submitted</h2>
            <p>Your application has been successfully submitted! We will contact you soon.</p>
            <button id="closeModalButton">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    // Додаємо стилі для модального вікна
    const style = document.createElement("style");
    style.textContent = `
        #successModal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .modal-content {
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            animation: fadeIn 0.3s ease-in-out;
        }
        .modal-content h2 {
            margin: 0 0 10px;
            color: #28a745;
        }
        .modal-content p {
            margin: 0 0 20px;
            color: #333;
        }
        .modal-content button {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s;
        }
        .modal-content button:hover {
            background-color: #218838;
        }
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Закриваємо модальне вікно при натисканні кнопки
    document.getElementById("closeModalButton").addEventListener("click", function () {
        document.body.removeChild(modal);
    });
}
