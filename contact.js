document.addEventListener('DOMContentLoaded', function() {
  // This code will now run AFTER the HTML is fully loaded

  // Example: If you have a form and a submit button
  const contactForm = document.querySelector('form'); // Or use an ID if you have one: document.getElementById('myContactForm');
  const submitButton = document.querySelector('form button[type="submit"]'); // Adjust selector if needed

  if (submitButton) { // Check if the button exists
      submitButton.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default form submission (for now)

          // Get form data (replace with your actual form handling logic)
          const fullName = document.getElementById('full-name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;

          console.log('Form data:', { fullName, email, message });

          // You would typically send this data to a server here
          // fetch('/submit-contact-form', { ... })
          //   .then(response => { ... })
          //   .catch(error => { ... });

          alert('Form submitted (in this example, data is only logged to the console).');
      });
  } else {
      console.error('Submit button not found!');
  }

  // Add any other JavaScript functionality here
});