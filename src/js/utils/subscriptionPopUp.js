export function generateConfetti() {
  const button = document.querySelector("#subscription");
  const canvas = document.querySelector("#confetti");

  const jsConfetti = new JSConfetti();

  button.addEventListener("click", () => {
    jsConfetti.addConfetti({
      confettiColors: ["#ef4331", "#fef200", "#02bcf4"],
      confettiNumber: 800,
    });
  });
}
