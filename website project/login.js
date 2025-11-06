
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please fill in both email and password.");
    return;
  }

  alert("Login successful!");

  setTimeout(() => {
    window.location.href = "home.html";
  }, 500);
});


const signupCard = document.getElementById("signupCard");
document.getElementById("openSignup").addEventListener("click", (e) => {
  e.preventDefault();
  signupCard.classList.add("active");
});
function closeSignup() {
  signupCard.classList.remove("active");
}
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullname").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!fullName || !email || !password || !confirmPassword) {
    alert("Please fill in all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  alert("Registration successful!"); 
  closeSignup(); 
});
