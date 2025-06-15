// 👤 Admin Discord ID
const YOUR_DISCORD_ID = "426857675188469773";

// 🎯 Simulated login - Replace with real Discord login later
const loggedInUserDiscordId = "426857675188469773";

// 🎭 Fake chatters list - add/remove names here
const allChatters = [
  "kancha_cheena",
  "sattaKing",
  "sunny007",
  "riderOP",
  "luckyBaba",
  "StakeHunter",
  "WindiaFan"
];

// 🌐 DOM Elements
const chatterList = document.getElementById("chatter-list");
const totalDisplay = document.getElementById("total-chatters");
const pickBtn = document.getElementById("pick-winner-btn");
const winnerBox = document.getElementById("winner");

// 🎛 Show admin-only button
if (loggedInUserDiscordId === YOUR_DISCORD_ID) {
  pickBtn.style.display = "inline-block";
}

// 🎯 Pick random winner logic
pickBtn.addEventListener("click", () => {
  if (allChatters.length === 0) return;
  const winner = allChatters[Math.floor(Math.random() * allChatters.length)];
  winnerBox.innerHTML = `🎉 <strong>${winner}</strong> is the winner! 🎉`;
});

// 🚀 Load fake chatters
function loadFakeChatters() {
  if (!chatterList) return;
  chatterList.innerHTML = "";
  allChatters.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user;
    li.style.padding = "6px";
    li.style.fontWeight = "bold";
    li.style.fontSize = "1.1em";
    li.style.color = "#fff";
    chatterList.appendChild(li);
  });

  if (totalDisplay) {
    totalDisplay.textContent = `Total live chatters: ${allChatters.length}`;
  }
}

// 🧠 Wait for page to load before running
document.addEventListener("DOMContentLoaded", loadFakeChatters);
