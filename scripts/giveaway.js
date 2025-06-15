const YOUR_DISCORD_ID = "426857675188469773";
const loggedInUserDiscordId = "426857675188469773";

const allChatters = [
  "kancha_cheena", "sattaKing", "sunny007",
  "riderOP", "luckyBaba", "StakeHunter", "WindiaFan"
];

const chatterList = document.getElementById("chatter-list");
const totalDisplay = document.getElementById("total-chatters");
const pickBtn = document.getElementById("pick-winner-btn");
const winnerBox = document.getElementById("winner");

if (loggedInUserDiscordId === YOUR_DISCORD_ID) {
  pickBtn.style.display = "inline-block";
}

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

pickBtn.addEventListener("click", () => {
  let cycles = 30;
  let current = 0;

  const interval = setInterval(() => {
    const randomName = allChatters[Math.floor(Math.random() * allChatters.length)];
    winnerBox.textContent = `🎰 Picking: ${randomName}`;
    current++;

    if (current >= cycles) {
      clearInterval(interval);
      const finalWinner = allChatters[Math.floor(Math.random() * allChatters.length)];
      winnerBox.innerHTML = `🎉 <strong>${finalWinner}</strong> is the winner! 🎉`;
      winnerBox.classList.add("winner-show");
    }
  }, 100);
});

document.addEventListener("DOMContentLoaded", loadFakeChatters);
