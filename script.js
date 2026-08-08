function openMessage() {

  const message = document.getElementById("message");

  message.classList.remove("hidden");

  const emojis = [
    "🤍",
    "🌙",
    "✨",
    "💫",
    "🌸"
  ];

  for (let i = 0; i < 25; i++) {

    const element = document.createElement("div");

    element.className = "floating";

    element.innerText =
      emojis[Math.floor(Math.random() * emojis.length)];

    element.style.left =
      Math.random() * 100 + "vw";

    element.style.animationDuration =
      (4 + Math.random() * 4) + "s";

    element.style.fontSize =
      (14 + Math.random() * 14) + "px";

    document.body.appendChild(element);

    setTimeout(() => {

      element.remove();

    }, 8000);

  }

  document.querySelector("button").innerText =
    "Allah tumhe hamesha khush rakhe 🤲🤍";

}
