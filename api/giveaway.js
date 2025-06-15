const YOUR_DISCORD_ID = "426857675188469773";
const loggedInUserDiscordId = "426857675188469773"; // Simulate Jai being logged in

let allChatters = [];

const chatterList = document.getElementById("chatter-list");
const totalDisplay = document.getElementById("total-chatters");
const pickBtn = document.getElementById("pick-winner-btn");
const winnerBox = document.getElementById("winner");

// Show button only for Jai
if (loggedInUserDiscordId === YOUR_DISCORD_ID) {
  pickBtn.style.display = "inline-block";
}

pickBtn.addEventListener("click", () => {
  if (allChatters.length === 0) return;
  const winner = allChatters[Math.floor(Math.random() * allChatters.length)];
  winnerBox.textContent = `🎉 Winner: ${winner}`;
});

// Load placeholder chatters
function loadFakeChatters() {
  allChatters = ["kancha_cheena", "sattaKing", "riderOP", "sunny007", "crypjunkie"];
  updateChatterDisplay();
}

function updateChatterDisplay() {
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
  totalDisplay.textContent = `Total live chatters: ${allChatters.length}`;
}

document.addEventListener("DOMContentLoaded", loadFakeChatters);
