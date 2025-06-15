// ✨ Dummy chatters (real integration comes next)
const fakeChatters = [
  "WindianBhai", "LuckyPlayer", "JackpotKing", "SpinMaster",
  "StakeWarrior", "UPIBoy", "DiceDon", "SlotQueen",
  "BananaMan", "WildWagerer", "ChatChamp", "BonusHunter"
];

// Show fake chatters in scrolling area
function renderChatters() {
  const container = document.getElementById('chatters');
  container.innerHTML = '';
  fakeChatters.forEach(name => {
    const div = document.createElement('div');
    div.className = 'chatter';
    div.textContent = name;
    container.appendChild(div);
  });
}

// Pick a random winner
function pickRandomWinner() {
  const winner = fakeChatters[Math.floor(Math.random() * fakeChatters.length)];
  const winnerDiv = document.getElementById('winner');
  winnerDiv.textContent = `🎉 Winner: ${winner}! 🎉`;
  winnerDiv.style.display = 'block';

  // 🎊 Fire confetti
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 }
  });
}

// Show pick button only for Jai (Discord ID based)
function checkDiscordID() {
  const discordID = localStorage.getItem("discord_id");
  if (discordID === "426857675188469773") {
    document.getElementById('pick-winner').classList.remove('hidden');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderChatters();
  checkDiscordID();
  document.getElementById('pick-winner').addEventListener('click', pickRandomWinner);
});
