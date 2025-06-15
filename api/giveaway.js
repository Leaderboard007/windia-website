const YOUR_DISCORD_ID = "YOUR_DISCORD_ID_HERE"; // <-- Replace with your actual Discord user ID

let allChatters = [];

const chatterList = document.getElementById("chatter-list");
const totalDisplay = document.getElementById("total-chatters");
const pickBtn = document.getElementById("pick-winner-btn");
const winnerBox = document.getElementById("winner");

// Fake login simulation for now (replace with real Discord login session logic)
const loggedInUserDiscordId = "YOUR_DISCORD_ID_HERE"; // simulate you being logged in

// Check if it's Jai
if (loggedInUserDiscordId === YOUR_DISCORD_ID) {
  pickBtn.style.display = "inline-block";
}

pickBtn.addEventListener("click", () => {
  if (allChatters.length === 0) return;
  const winner = allChatters[Math.floor(Math.random() * allChatters.length)];
  winnerBox.textContent = `🎉 Winner: ${winner}`;
});

// Temporary function until we fetch real chatters
function loadFakeChatters() {
  allChatters = ["sunny123", "rahul_dev", "riderOP", "crypjunkie", "kancha_cheena"];
  updateChatterDisplay();
}

function updateChatterDisplay() {
  chatterList.innerHTML = "";
  allChatters.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user;
    chatterList.appendChild(li);
  });
  totalDisplay.textContent = `Total live chatters: ${allChatters.length}`;
}

loadFakeChatters(); // load placeholder
