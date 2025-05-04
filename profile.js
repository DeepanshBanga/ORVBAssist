import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';

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

document.addEventListener('DOMContentLoaded', function() {
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeBtn = document.querySelector('.close');
    const editProfileForm = document.getElementById('edit-profile-form');

    const userNameDisplay = document.getElementById('user-name');
    const userEmailDisplay = document.getElementById('user-email');
    const userContactDisplay = document.getElementById('user-contact');
    const userAddressDisplay = document.getElementById('user-address');

    let currentUser = null; // Store the currently logged-in user

    // Function to open the modal
    function openEditProfileModal() {
        if (!currentUser) return; // Don't open if no user is logged in

        // Populate the form with current user data
        document.getElementById('edit-name').value = userNameDisplay.textContent;
        document.getElementById('edit-email').value = userEmailDisplay.textContent;
        document.getElementById('edit-contact').value = userContactDisplay.textContent;
        document.getElementById('edit-address').value = userAddressDisplay.textContent;

        editProfileModal.style.display = 'block';
    }

    // Function to close the modal
    function closeEditProfileModal() {
        editProfileModal.style.display = 'none';
    }

    // Event listeners
    editProfileBtn.addEventListener('click', openEditProfileModal);
    closeBtn.addEventListener('click', closeEditProfileModal);

    // Close the modal if the user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target === editProfileModal) {
            closeEditProfileModal();
        }
    });

    // Handle form submission with Firebase update
    editProfileForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        if (!currentUser) return; // Don't proceed if no user is logged in

        // Get updated values from the form
        const newName = document.getElementById('edit-name').value;
        const newContact = document.getElementById('edit-contact').value;
        const newAddress = document.getElementById('edit-address').value;

        try {
            // Update Firestore document
            const userDocRef = doc(db, "users", currentUser.uid);
            await updateDoc(userDocRef, {
                name: newName,
                contact: newContact,
                address: newAddress
            });

            // Update the displayed user information
            userNameDisplay.textContent = newName;
            userContactDisplay.textContent = newContact;
            userAddressDisplay.textContent = newAddress;

            alert('Profile updated successfully!');
            closeEditProfileModal();

        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
    });

    // Firebase Auth state listener
    onAuthStateChanged(auth, (user) => {
        if (user) {
            currentUser = user; // Set the currentUser
            const uid = user.uid;
            fetchUserData(uid); // Fetch user data when auth state changes to logged in
        } else {
            currentUser = null; // Clear currentUser
            window.location.href = "login.html"; // if not logged in
        }
    });


    // Function to fetch user data from Firestore
    async function fetchUserData(uid) {
        try {
            const userDocRef = doc(db, "users", uid);
            const docSnap = await getDoc(userDocRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                userNameDisplay.textContent = data.name || "";
                userEmailDisplay.textContent = data.email || "";
                userContactDisplay.textContent = data.contact || "";
                userAddressDisplay.textContent = data.address || "";
                //  document.getElementById("user-vehicle-model").textContent = data.vehicleModel || ""; // Assuming this is in your HTML
            } else {
                console.log("No such document!");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
});