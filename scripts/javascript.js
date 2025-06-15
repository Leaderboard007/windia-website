// Windia Homepage JS
console.log("✅ Windia homepage script loaded.");

// (Optional) You can auto-set the user greeting dynamically later
document.addEventListener("DOMContentLoaded", function () {
  const userGreeting = document.querySelector("h1");
  const dummyUser = "Windian123"; // Replace this when login works
  if (userGreeting) {
    userGreeting.innerHTML = `Welcome, ${dummyUser}!`;
  }
});
