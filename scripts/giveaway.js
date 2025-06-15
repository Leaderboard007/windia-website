// This is your simulated Discord ID (admin)
const YOUR_DISCORD_ID = "426857675188469773";

// Simulated login ID – later we will replace with real Discord login
const loggedInUserDiscordId = "426857675188469773";

// Fake chatters list (you can modify names)
let allChatters = [
  "kancha_cheena",
  "sattaKing",
  "riderOP",
  "sunny007",
  "crypjunkie"
];

// Get DOM elements
const chatterList = document.getElementById("chatter-list");
const totalDisplay = document.getElementById("total-chatters");
const pickBtn = document.getElementById("pick-winner-btn");
const winnerBox = document.getElementById("winner");

// Only show winner button if current user is Jai (admin)
if (loggedInUserDiscordId === YOUR_DISCORD_ID) {
  pickBtn.style.display = "inline-block";
}

// Function to pick random winner
pickBtn.addEventListener("click", () => {
  if (allChatters.length === 0) return;
  const winner = allChatters[Math.floor(Math.random() * allChatters.length)];
  winnerBox.innerHTML = `🎉 <strong>${winner}</strong> is the winner! 🎉`;
});

// Load fake chatters into page
function loadFa

