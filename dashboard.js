// Initialize Firebase (make sure this is already done in index.html)
// **IMPORTANT:** You should initialize Firebase in your main HTML file (index.html, or wherever your shared code is).  Do NOT re-initialize it here unless this is the *only* place you're using Firebase.

// Firebase references
const auth = firebase.auth();
const db = firebase.firestore();

// Elements
const userNameEl = document.getElementById("user-name");
const userEmailEl = document.getElementById("user-email");
const userContactEl = document.getElementById("user-contact");
const userAddressEl = document.getElementById("user-address");
const userVehicleModelEl = document.getElementById("user-vehicle-model");

const editBtn = document.getElementById("edit-profile-btn");
const modal = document.getElementById("edit-profile-modal");
const closeModal = document.getElementById("close-modal");

const form = document.getElementById("edit-profile-form");
const nameInput = document.getElementById("edit-name");
const emailInput = document.getElementById("edit-email");
const contactInput = document.getElementById("edit-contact");
const addressInput = document.getElementById("edit-address");
const vehicleModelInput = document.getElementById("edit-vehicle-model");
const passwordInput = document.getElementById("edit-password");

// Load user data
auth.onAuthStateChanged(user => {
    if (user) {
        const userId = user.uid;
        db.collection("users").doc(userId).get().then(doc => {
            if (doc.exists) {
                const data = doc.data();
                userNameEl.textContent = data.name || '';
                userEmailEl.textContent = user.email;
                userContactEl.textContent = data.contact || '';
                userAddressEl.textContent = data.address || '';
                userVehicleModelEl.textContent = data.vehicleModel || '';
            }
        });
    } else {
        window.location.href = "login.html"; // Redirect if not logged in
    }
});

// Open modal
editBtn.addEventListener("click", () => {
    modal.style.display = "block";

    // Pre-fill form
    nameInput.value = userNameEl.textContent;
    emailInput.value = userEmailEl.textContent;
    contactInput.value = userContactEl.textContent;
    addressInput.value = userAddressEl.textContent;
    vehicleModelInput.value = userVehicleModelEl.textContent;
});

// Close modal
closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

// Submit form
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    const updatedData = {
        name: nameInput.value.trim(),
        contact: contactInput.value.trim(),
        address: addressInput.value.trim(),
        vehicleModel: vehicleModelInput.value.trim()
    };

    const promises = [];

    // Update Firestore
    promises.push(
        db.collection("users").doc(user.uid).set(updatedData, { merge: true })
    );

    // Optionally update email
    if (emailInput.value.trim() !== user.email) {
        promises.push(user.updateEmail(emailInput.value.trim()));
    }

    // Optionally update password
    const newPassword = passwordInput.value.trim();
    if (newPassword) {
        promises.push(user.updatePassword(newPassword));
    }

    Promise.all(promises)
        .then(() => {
            alert("Profile updated successfully!");
            location.reload(); // Reload to update view
        })
        .catch(error => {
            console.error("Update error:", error);
            alert("Error updating profile: " + error.message);
        });
});