document.addEventListener("DOMContentLoaded", () => {
  const jobPositionInput = document.getElementById("jobPosition");

  // Модифікуємо Apply button для перенесення інформації
  document.querySelectorAll(".apply-btn").forEach((applyButton) => {
      applyButton.addEventListener("click", (event) => {
          event.preventDefault(); // Зупиняємо стандартну поведінку посилання

          // Отримуємо назву посади
          const jobDiv = event.target.closest(".job");
          const jobTitle = jobDiv.querySelector("h3").textContent.split(" (")[0]; // Витягуємо тільки назву без місця

          // Встановлюємо вибрану посаду у поле "Job Name Position"
          jobPositionInput.value = jobTitle;

          // Переміщення до секції Apply
          const applySection = document.getElementById("apply");
          applySection.scrollIntoView({
              behavior: "smooth"
          });
      });
  });
});
