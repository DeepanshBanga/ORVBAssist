document.addEventListener("DOMContentLoaded", function () {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    const checkoutAllButton = document.getElementById("checkout-all");
    const cartListElement = document.getElementById("cart-list");
    const cartTotalElement = document.getElementById("cart-total");
    const productCards = document.querySelectorAll(".product-card");
    let cart = []; // This will be the single, global cart

    // Function to update the cart UI within a specific product card
    function updateProductCardCart(productCard) {
        const productName = productCard.querySelector(".add-to-cart").getAttribute("data-name");
        const productCartList = productCard.querySelector(".cart-list");
        const productCartTotal = productCard.querySelector(".cart-total");
        productCartList.innerHTML = "";
        let productTotal = 0;

        cart.forEach(item => {
            if (item.name === productName) {
                const listItem = document.createElement("li");
                listItem.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
                productCartList.appendChild(listItem);
                productTotal += item.price * item.quantity;
            }
        });
        productCartTotal.textContent = productTotal.toFixed(2);
    }

    // Function to update the separate cart UI
    function updateCartDisplay() {
        cartListElement.innerHTML = "";
        let total = 0;

        cart.forEach((item) => {
            const listItem = document.createElement("li");
            listItem.textContent = `${item.name} - ₹${item.price} x ${item.quantity}`;
            cartListElement.appendChild(listItem);
            total += item.price * item.quantity;
        });

        cartTotalElement.textContent = total.toFixed(2);

        // Update individual product card carts
        productCards.forEach(card => updateProductCardCart(card));
    }

    // Function to add item to cart
    function addItemToCart(button) {
        const name = button.getAttribute("data-name");
        const price = parseFloat(button.getAttribute("data-price"));

        const existingItem = cart.find((item) => item.name === name);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartDisplay();
    }

    // Function to handle checkout all
    function handleCheckoutAll() {
        let totalAmount = 0;
        cart.forEach((item) => {
            totalAmount += item.price * item.quantity;
        });

        alert(`Total amount for all items: ₹${totalAmount.toFixed(2)}`);
        // In a real application, you would proceed to a checkout page here.
    }

    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
            addItemToCart(this);
        });
    });

    // Add event listener to the "Checkout All" button
    if (checkoutAllButton) {
        checkoutAllButton.addEventListener("click", handleCheckoutAll);
    }

    // Initial update of all carts
    updateCartDisplay();
});