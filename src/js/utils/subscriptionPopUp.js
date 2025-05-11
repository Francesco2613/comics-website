export function generatePopUp() {
  const registerModal = document.getElementById("register-modal");
  const registerButton = document.getElementById("register-button");
  const closeButton = document.getElementById("register-modal-close");
  const canvas = document.getElementById("confetti");

  const jsConfetti = new JSConfetti();

  if (registerModal && registerButton && closeButton) {
    registerButton.addEventListener("click", () => {
      jsConfetti.addConfetti({
        confettiColors: ["#ef4331", "#fef200", "#02bcf4"],
        confettiNumber: 800,
      });
      registerModal.classList.remove("hidden");
      console.log("Register modal open");
    });
    closeButton.addEventListener("click", () => {
      registerModal.classList.add("hidden");
      console.log("Register modal closed");
    });
  } else {
    console.warn("Register modal elements not found");
  }

  registerButton.addEventListener("click", () => {
    jsConfetti.addConfetti({
      confettiColors: ["#ef4331", "#fef200", "#02bcf4"],
      confettiNumber: 800,
    });
  });
}
