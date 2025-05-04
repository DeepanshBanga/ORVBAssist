document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (email === "" || password === "") {
      alert("Please fill in both email and password.");
      return;
    }

    // Firebase login
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Login successful
        const user = userCredential.user;
        alert(`Welcome back, ${user.email}`);
        // Redirect to profile/dashboard page
        window.location.href = "profile.html";
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert("Login failed: " + error.message);
      });
  });
});
