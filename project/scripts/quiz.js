/*====================================================================================
====================================QUIZ_JS===========================================
====================================================================================*/

/** 
 * This script handles the functionality for a book recommendation quiz
 * on the Your Book Club website.
 */

document.addEventListener("DOMContentLoaded", () => {
    //=============================QUIZ_SUBMISSION==================================
    const quizForm = document.getElementById("quiz-form");
    quizForm.addEventListener("submit", (event) => {
        event.preventDefault();
        let score = 0;
        const answers = document.querySelectorAll('input[type="radio"]:checked');

        // Calculate score based on selected answers
        answers.forEach((answer) => {
            score += parseInt(answer.value);
        });

        // Determine book recommendation based on score
        let result = "";
        if (score <= 5) {
            result = "We recommend a lighthearted romance!";
        } else if (score <= 10) {
            result = "How about a thrilling mystery?";
        } else {
            result = "You should try an intense drama!";
        }

        // Display result and save progress
        document.getElementById("quiz-result").textContent = result;
        localStorage.setItem("quizScore", score);
    });

    //=============================RESET_QUIZ======================================
    // Reset quiz functionality
    const resetButton = document.getElementById("reset-quiz");
    resetButton.addEventListener("click", () => {
        quizForm.reset();
        document.getElementById("quiz-result").textContent = "";
        localStorage.removeItem("quizScore");
    });
});