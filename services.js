/* services.js (or you can integrate this into your main.js) */

document.addEventListener('DOMContentLoaded', function() {
    const requestButtons = document.querySelectorAll('.service-item .btn-primary');

    requestButtons.forEach(button => {
        button.addEventListener('click', handleServiceRequest);
    });

    function handleServiceRequest(event) {
        event.preventDefault(); // Prevent default link behavior (if it's an <a> tag)

        const serviceItem = event.target.closest('.service-item');
        const serviceName = serviceItem.querySelector('h2').textContent;
        const serviceDescription = serviceItem.querySelector('p').textContent;

        // 1. Basic Alert (Replace with a better UI)
        alert(`Service Requested: ${serviceName}\nDescription: ${serviceDescription}\n\n`);

        // 2.  Redirect to Contact Form (Alternative)
        // window.location.href = 'contact.html'; //  If you want to use the existing contact form

        // 3.  Create a Modal Form (More User-Friendly - Recommended)
        //    createRequestModal(serviceName, serviceDescription);  // Function to create a dynamic modal (see below)

        // In a real application, you would:
        // - Collect more user details (location, vehicle info, etc.)
        // - Send the data to your server using fetch()
        // - Handle success/error responses from the server
    }

    function createRequestModal(serviceName, serviceDescription) {
        // Create modal elements
        const modal = document.createElement('div');
        modal.classList.add('service-request-modal');

        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        const closeButton = document.createElement('span');
        closeButton.classList.add('close-modal');
        closeButton.innerHTML = '&times;';  // "x" symbol
        closeButton.addEventListener('click', () => modal.remove());

        const heading = document.createElement('h2');
        heading.textContent = `Request: ${serviceName}`;

        const description = document.createElement('p');
        description.textContent = serviceDescription;

        const form = document.createElement('form');
        form.innerHTML = `
            <label for="name">Your Name:</label>
            <input type="text" id="name" name="name" required><br>

            <label for="phone">Phone Number:</label>
            <input type="text" id="phone" name="phone" required><br>

            <label for="location">Location:</label>
            <textarea id="location" name="location" rows="3" required></textarea><br>

            <button type="submit" class="btn btn-primary">Submit Request</button>
        `;

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            //  Collect form data here and send to server using fetch()
            const name = form.querySelector('#name').value;
            const phone = form.querySelector('#phone').value;
            const location = form.querySelector('#location').value;

            console.log('Request Data:', { serviceName, name, phone, location });
            alert('Service request submitted! (Data logged to console)');
            modal.remove(); // Close the modal
        });


        // Assemble the modal
        modalContent.appendChild(closeButton);
        modalContent.appendChild(heading);
        modalContent.appendChild(description);
        modalContent.appendChild(form);
        modal.appendChild(modalContent);
        document.body.appendChild(modal);  // Add modal to the page

        // Basic modal styling (add to your style.css for better control)
        const style = document.createElement('style');
        style.textContent = `
            .service-request-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .service-request-modal .modal-content {
                background-color: white;
                padding: 20px;
                border-radius: 8px;
                width: 80%;
                max-width: 500px;
                position: relative;
            }

            .close-modal {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 20px;
                cursor: pointer;
            }

            .service-request-modal label {
                display: block;
                margin-top: 10px;
            }

            .service-request-modal input,
            .service-request-modal textarea {
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }
});