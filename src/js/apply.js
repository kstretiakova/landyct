// Додаємо обробку форми "Apply for a Position" (перша форма)
document.getElementById("cv").addEventListener("change", function () {
  const fileInput = document.getElementById("cv");
  const fileList = fileInput.files;
  const fileNameDisplay = document.getElementById("fileNameDisplay");

  if (fileList.length > 1) {
      alert("You can only upload one file.");
      fileInput.value = "";
      fileNameDisplay.textContent = "No file selected";
      return;
  }

  if (fileList.length === 1) {
      fileNameDisplay.textContent = `Selected file: ${fileList[0].name}`;
      fileNameDisplay.style.color = "#28a745";
  } else {
      fileNameDisplay.textContent = "No file selected.";
      fileNameDisplay.style.color = "#dc3545";
  }
});

document.getElementById("applyForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const formData = new FormData();
  formData.append("jobPosition", document.getElementById("jobPosition").value.trim());
  formData.append("firstName", document.getElementById("firstName").value.trim());
  formData.append("lastName", document.getElementById("lastName").value.trim());
  formData.append("email", document.getElementById("email").value.trim());
  formData.append("cv", document.getElementById("cv").files[0]);

  try {
      const response = await fetch("/apply", {
          method: "POST",
          body: formData,
      });

      if (response.ok) {
          showSuccessModal("Application submitted successfully!");
      } else {
          alert("Failed to submit the application. Please try again.");
      }
  } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
  }
});

// Додаємо обробку форми "Yacht Crew Request" (друга форма)
document.querySelector(".yacht-crew-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const position = document.getElementById("position").value.trim();
  const yachtType = document.getElementById("yacht-type").value.trim();
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const details = document.getElementById("details").value.trim();

  // Перевірка на заповнення всіх полів
  if (!position || !yachtType || !firstName || !lastName || !email || !contact || !details) {
      alert("Please fill out all fields.");
      return;
  }

  // Перевірка валідності email
  if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  const requestData = {
      position,
      yachtType,
      firstName,
      lastName,
      email,
      contact,
      details,
  };

  try {
      const response = await fetch("/yacht-crew", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
      });

      if (response.ok) {
          showSuccessModal("Yacht crew request submitted successfully!");
      } else {
          alert("Failed to submit the yacht crew request. Please try again.");
      }
  } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again later.");
  }
});

// Загальна функція для перевірки валідності email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Функція для показу модального вікна успіху
function showSuccessModal(message) {
  const modal = document.createElement("div");
  modal.id = "successModal";
  modal.innerHTML = `
      <div class="modal-content">
          <h2>Success</h2>
          <p>${message}</p>
          <button id="closeModalButton">Close</button>
      </div>
  `;
  document.body.appendChild(modal);

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

  document.getElementById("closeModalButton").addEventListener("click", function () {
      document.body.removeChild(modal);
  });
}
