# Signup Form with Real-Time Validation

A clean and responsive **Signup Form with Real-Time Client-Side Validation** built using **HTML, CSS, and Vanilla JavaScript**.  
This project focuses on user input validation, UX feedback, and form interaction logic — without any backend.

---

## 🌐 Live Demo
[Click Here](https://frontend-mini-projects-signup-form-validation.vercel.app/)

## ✨ Features

- Real-time input validation
- Required field checks with clear error messages
- Email format validation
- Phone number validation (10 digits)
- Strong password validation  
  - Minimum 8 characters  
  - Must contain letters, numbers, and special characters
- Confirm password matching
- Show / Hide password toggle
- Dynamic enable / disable of submit button
- Visual feedback for valid and invalid inputs
- Fully responsive design

## Tech Stack

- **HTML5** – Structure  
- **CSS3** – Styling & responsiveness  
- **JavaScript (Vanilla)** – Validation & interaction logic  
- **Font Awesome** – Icons  

## Implementation Overview

- Each field is validated dynamically as the user types
- Invalid inputs are highlighted immediately with helpful messages
- The **Signup** button remains disabled until all validations pass
- Form behavior and UI state are managed entirely on the client side
- The form can be reset programmatically after successful submission without page reload

## ⚠️ Backend & Data Persistence Note

This project focuses **only on client-side validation**.

- No backend or database is used
- Submitted data is not stored
- The same user can submit the form multiple times (expected behavior)

These limitations are **intentional** to keep the project focused on frontend validation logic.

## 🎯 Learning Outcomes

- DOM manipulation
- Regular expressions for input validation
- Form UX best practices
- Dynamic UI feedback
- Clean and reusable JavaScript functions
- Structuring a frontend project effectively