
const chatterList = document.getElementById('chatter-list');
const totalChatters = document.getElementById('total-chatters');
const winnerDiv = document.getElementById('winner');
const pickBtn = document.getElementById('pick-winner-btn');

// Jai's Discord ID
const ADMIN_DISCORD_ID = "426857675188469773";

// Fake Discord auth simulation (replace with real logic)
function isAdminUser() {
  // In real auth, check against session/cookie or fetch user ID from server
  return localStorage.getItem("discord_id") === ADMIN_DISCORD_ID;
}

// Load chatters
async function loadChatters() {
  try {
    const res = await fetch('/api/giveaway');
    const data = await res.json();

    // Populate chatters
    chatterList.innerHTML = "";
    const uniqueUsers = Array.from(new Set(data.chatters));
    uniqueUsers.forEach(name => {
      const li = document.createElement("li");
      li.textContent = name;
      chatterList.appendChild(li);
    });

    totalChatters.textContent = `Total live chatters: ${uniqueUsers.length}`;

    if (isAdminUser()) {
      pickBtn.style.display = "inline-block";
    }

    // Save names globally
    window.currentChatters = uniqueUsers;
  } catch (err) {
    console.error("Error fetching chatters:", err);
  }
}

// Pick winner
pickBtn.addEventListener("click", () => {
  if (!window.currentChatters || window.currentChatters.length === 0) return;

  const winnerName = window.currentChatters[Math.floor(Math.random() * window.currentChatters.length)];

  winnerDiv.innerHTML = `<div class="winner-show">🏆 Winner: ${winnerName} 🥳</div>`;
  confetti({
    particleCount: 200,
    spread: 100,
    origin: { y: 0.6 }
  });
});

loadChatters();
setInterval(loadChatters, 30000); // Refresh every 30 sec
