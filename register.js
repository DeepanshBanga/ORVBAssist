import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// Your Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent form from submitting normally

    const fullname = document.getElementById("fullname").value.trim();
    const email = document.getElementById("email").value.trim();
    const contact = document.getElementById("contact").value.trim();
    const address = document.getElementById("address").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirmPassword").value.trim();

    if (!fullname || !email || !contact || !address || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user's display name
      await updateProfile(user, {
        displayName: fullname
      });

      // Store additional user data in Firestore
      const usersCollection = collection(db, "users");
      await setDoc(doc(usersCollection, user.uid), {
        uid: user.uid,
        name: fullname,
        email: email,
        contact: contact,
        address: address
        // You can add other relevant information here
      });

      alert(`Welcome, ${fullname}! Your account has been created.`);
      window.location.href = "login.html"; // Redirect to login page after successful registration

    } catch (error) {
      console.error("Error creating user:", error);
      alert(`Registration failed: ${error.message}`);
    }
  });
});