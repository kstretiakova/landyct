const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(express.json());
app.use(cors());

// Налаштування для завантаження файлів
const upload = multer({
    dest: "uploads/", // Папка для тимчасового збереження файлів
    limits: { fileSize: 5 * 1024 * 1024 }, // Обмеження на розмір файлу: 5MB
});

// Налаштування Nodemailer для надсилання електронної пошти
const transporter = nodemailer.createTransport({
    service: "gmail", // Або інший email-сервіс
    auth: {
        user: "your-email@gmail.com", // Ваша електронна пошта
        pass: "your-email-password", // Пароль додатку (замість справжнього пароля акаунта)
    },
});

// Маршрут для першої форми (Apply Form)
app.post("/apply", upload.single("cv"), async (req, res) => {
    const { jobPosition, firstName, lastName, email } = req.body;

    // Перевірка наявності всіх даних
    if (!jobPosition || !firstName || !lastName || !email || !req.file) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Відправка електронного листа
        await transporter.sendMail({
            from: '"Job Application" <your-email@gmail.com>', // Відправник
            to: "contact@ypojrecruitment.com", // Одержувач
            subject: `New Job Application: ${jobPosition}`,
            text: `A new job application has been submitted.\n\n
            Job Position: ${jobPosition}\n
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Email: ${email}`,
            attachments: [
                {
                    filename: req.file.originalname,
                    path: req.file.path, // Шлях до завантаженого файлу
                },
            ],
        });

        // Видалення файлу після успішної відправки
        fs.unlink(req.file.path, (err) => {
            if (err) console.error("Error deleting file:", err);
        });

        res.status(200).json({ message: "Application submitted successfully and email sent!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email." });
    }
});

// Маршрут для другої форми (Yacht Crew Request)
app.post("/yacht-crew", async (req, res) => {
    const { position, yachtType, firstName, lastName, email, contact, details } = req.body;

    // Перевірка наявності всіх обов'язкових полів
    if (!position || !yachtType || !firstName || !lastName || !email || !contact) {
        return res.status(400).json({ message: "All required fields must be filled." });
    }

    try {
        // Відправка електронного листа
        await transporter.sendMail({
            from: '"Yacht Crew Request" <your-email@gmail.com>', // Відправник
            to: "contact@ypojrecruitment.com", // Одержувач
            subject: `New Yacht Crew Request: ${position}`,
            text: `A new yacht crew request has been submitted.\n\n
            Position: ${position}\n
            Yacht Type & Size: ${yachtType}\n
            First Name: ${firstName}\n
            Last Name: ${lastName}\n
            Email: ${email}\n
            Contact: ${contact}\n
            Additional Details: ${details || "N/A"}`,
        });

        res.status(200).json({ message: "Yacht Crew Request submitted successfully and email sent!" });
    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ message: "Error sending email." });
    }
});

// Запуск сервера
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
