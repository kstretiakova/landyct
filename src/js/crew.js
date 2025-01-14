// Додаємо обробник події для другої форми
document.querySelector(".yacht-crew-form").addEventListener("submit", function (event) {
  event.preventDefault();

  // Збираємо дані з полів форми
  const position = document.getElementById("position").value.trim();
  const yachtType = document.getElementById("yacht-type").value.trim();
  const firstName = document.getElementById("first-name").value.trim();
  const lastName = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const details = document.getElementById("details").value.trim();

  // Перевірка на заповнення всіх обов'язкових полів
  if (!position || !yachtType || !firstName || !lastName || !email || !contact) {
      alert("Please fill out all required fields.");
      return;
  }

  // Перевірка валідності email
  if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
  }

  // Формуємо дані для відправки
  const requestData = {
      position,
      yachtType,
      firstName,
      lastName,
      email,
      contact,
      details
  };

  // Відправляємо POST-запит на сервер
  fetch("http://localhost:3000/yacht-crew", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error("Failed to submit the form. Please try again.");
      }
      return response.json();
  })
  .then(data => {
      console.log(data.message);
      showCrewSuccessModal();
  })
  .catch(error => {
      console.error(error.message);
      alert("There was an error submitting the form. Please try again later.");
  });
});

// Функція для показу модального вікна
function showCrewSuccessModal() {
  const modal = document.createElement("div");
  modal.id = "crewSuccessModal";
  modal.innerHTML = `
      <div class="modal-content">
          <h2>Request Submitted</h2>
          <p>Your request has been successfully submitted! We will contact you soon.</p>
          <button id="closeCrewModalButton">Close</button>
      </div>
  `;
  document.body.appendChild(modal);

  // Додаємо стилі для модального вікна
  const style = document.createElement("style");
  style.textContent = `
      #crewSuccessModal {
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
  document.getElementById("closeCrewModalButton").addEventListener("click", function () {
      document.body.removeChild(modal);
  });
}

// Функція для перевірки валідності email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
