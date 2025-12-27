# 📧 Email Subscription Form with Google Sheets Backend

A responsive **email subscription landing page** that stores subscriber emails securely in **Google Sheets** using **Google Apps Script** as a backend API.  
The project includes **email validation**, **duplicate prevention**, and **automatic timestamping**.

---

## 🌐 Live Demo
[Click Here](https://frontend-mini-projects-email-subscription-system.vercel.app/)

> The live demo interacts with a deployed Google Apps Script Web App, similar to how real-world frontend applications communicate with backend APIs.

---

## ✨ Features

- ✅ Responsive UI
- 📩 Email format validation
- 🚫 Duplicate email prevention (server-side)
- 🔐 Secure backend using Google Apps Script
- 🕒 Automatic timestamp for each subscription
- ⚡ Real-time success / error messages
- ☁️ No traditional backend server required

---

## 🛠️ Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling & responsiveness  
- **JavaScript (Vanilla)** – Form handling & API calls  
- **Google Apps Script** – Backend API  
- **Google Sheets** – Data storage  

---

## 🧠 How It Works

```
Frontend (HTML / CSS / JS)
↓ fetch()
Google Apps Script (Web App API)
↓
Google Sheets (Database)

1. User submits an email via the form  
2. Frontend validates email format  
3. Request is sent to Google Apps Script Web App  
4. Backend:
   - Normalizes email
   - Checks for duplicates
   - Stores email with timestamp
5. User receives instant feedback  

```

---

## 📊 Google Sheet Structure

The Google Sheet uses the following headers (Row 1):

Email | timestamp

- `Email` → Subscriber email  
- `timestamp` → Auto-generated date & time of submission  

---

## 🔐 Backend & Data Privacy

For **security and best practices**, the following are kept **private**:

- Google Sheet (database)
- Google Apps Script project (backend logic)

This reflects **real-world application architecture**, where databases and backend services are not publicly accessible.

---

## ⚙️ Local Setup (Optional)

If you want to test this project with your own Google Sheet:

1. Create a Google Sheet  
2. Add headers in Row 1:
Email | timestamp

3. Open **Extensions → Apps Script**
4. Paste the provided Apps Script code
5. Run `intialSetup()` once
6. Deploy as **Web App**
- Execute as: **Me**
- Access: **Anyone**
7. Replace the Web App URL in `script.js`

---

## 🧪 Duplicate Prevention Logic

- Emails are trimmed and converted to lowercase
- Existing emails are normalized before comparison
- LockService prevents race conditions
- Exact duplicates are blocked reliably

---

```
## 📁 Project Structure

├── index.html
├── style.css
├── script.js
├── apps-script.gs 👈 backend logic
├── BackgroundImage.jpg
├── send-icon.png
└── README.md

```

---

## 📈 Possible Enhancements

- 📬 Email confirmation system
- 📊 Subscriber analytics dashboard
- 🔐 reCAPTCHA integration
- 📁 CSV export
- 🌙 Dark / Light theme toggle

---

## 🎯 Use Cases

- Newsletter subscriptions  
- Product launch waitlists  
- Event registrations  
- Portfolio contact forms  
- Startup landing pages  

---

### ⭐ Final Note

This project demonstrates:
- Frontend–backend integration
- API-based architecture
- Data validation & security awareness
- Clean UI and documentation