// Log script load confirmation
console.log("Windia homepage script loaded!");

// Example: Simulate dynamic user greeting
document.addEventListener("DOMContentLoaded", function () {
  const usernamePlaceholder = document.querySelector("h1");

  // Replace with actual login system later — for now use placeholder
  const dummyUsername = "Windian123";

  if (usernamePlaceholder) {
    usernamePlaceholder.innerHTML = `Welcome, ${dummyUsername}`;
  }
});
