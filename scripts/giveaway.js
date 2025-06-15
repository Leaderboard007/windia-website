// ✅ Fake chatters (replace with real integration later)
const fakeChatters = [
  "LuckyLad", "SpinMaster", "HighRoller99", "Windian777", "BigWinBro", "SlotQueen", "CryptoJunkie", "MrRisky", "BetBoss", "JackpotGirl", "RNGWarrior", "DiceLegend", "CashCraver", "RouletteRaja", "SpinNinja"
];

const chatterDiv = document.getElementById("chatters");
const pickButton = document.getElementById("pick-winner");
const winnerDiv = document.getElementById("winner");

// 👤 Only show button if correct Discord ID
const currentUserDiscordId = localStorage.getItem("discord_id"); // Set this on login
if (currentUserDiscordId === "426857675188469773") {
  pickButton.classList.remove("hidden");
}

// 📝 Populate fake chatters
function showFakeChatters() {
  chatterDiv.innerHTML = "";
  fakeChatters.forEach(user => {
    const el = document.createElement("div");
    el.className = "chatter";
    el.textContent = user;
    chatterDiv.appendChild(el);
  });

  // Optional: auto-scroll
  chatterDiv.scrollTop = chatterDiv.scrollHeight;
}

// 🎉 Confetti setup
function launchConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) return clearInterval(interval);
    confetti(Object.assign({}, defaults, {
      particleCount: 50,
      origin: { x: randomInRange(0.1, 0.9), y: Math.random() - 0.2 }
    }));
  }, 250);
}

// 🏆 Pick winner logic
pickButton.addEventListener("click", () => {
  const winner = fakeChatters[Math.floor(Math.random() * fakeChatters.length)];
  winnerDiv.innerHTML = `🏆 <strong>${winner}</strong> is the winner!`;
  winnerDiv.style.display = "block";
  launchConfetti();
});

// Init
document.addEventListener("DOMContentLoaded", showFakeChatters);
