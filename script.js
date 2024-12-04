const coffeeMenu = [
    {
        name: "Espresso",
        description: "Strong and concentrated coffee.",
        price: "$2.50",
        image: "images/espresso.jpg" // Add appropriate image file here
    },
    {
        name: "Americano",
        description: "Espresso with hot water.",
        price: "$3.00",
        image: "images/americano.jpg" // Add appropriate image file here
    },
    {
        name: "Cappuccino",
        description: "Espresso with steamed milk and foam.",
        price: "$3.50",
        image: "images/cappuccino.jpg" // Add appropriate image file here
    },
    {
        name: "Latte",
        description: "Espresso with steamed milk.",
        price: "$3.75",
        image: "images/latte.jpg" // Add appropriate image file here
    },
    {
        name: "Mocha",
        description: "Espresso with chocolate syrup and steamed milk.",
        price: "$4.00",
        image: "images/mocha.jpg" // Add appropriate image file here
    }
];

let cart = JSON.parse(localStorage.getItem("cart")) || []; // Load cart from localStorage if exists

// Display Menu
function displayMenu() {
    const coffeeList = document.getElementById("coffee-list");
    coffeeMenu.forEach(coffee => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.name}" class="coffee-image">
            <h3>${coffee.name}</h3>
            <p>${coffee.description}</p>
            <p>${coffee.price}</p>
            <button onclick="selectCoffee('${coffee.name}')">Select</button>`;
        coffeeList.appendChild(li);
    });
}

// Select Coffee and Store in LocalStorage
function selectCoffee(coffeeName) {
    const coffee = coffeeMenu.find(c => c.name === coffeeName);
    localStorage.setItem("selectedCoffee", JSON.stringify(coffee));
    goToCustomizationPage();
}

// Navigate to Customization Page
function goToCustomizationPage() {
    document.getElementById('menu').style.display = "none";
    document.getElementById('customization').style.display = "block";
}

// Add Selected Coffee to Cart
function addToCart() {
    const coffee = JSON.parse(localStorage.getItem("selectedCoffee"));
    if (!coffee) {
        alert("Please select a coffee first!");
        return;
    }

    cart.push(coffee); // Add the selected coffee to the cart
    localStorage.setItem("cart", JSON.stringify(cart)); // Save cart to localStorage

    updateCartCount(); // Update cart count in the header
    alert(`${coffee.name} added to cart.`);
}

// Update Cart Count in Header
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Toggle Cart Popup
function toggleCart() {
    const cartPopup = document.getElementById("cart-popup");
    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = ""; // Clear the cart list

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "Your cart is empty.";
        cartItems.appendChild(emptyMessage);
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerText = `${item.name} - ${item.price}`;
            const removeBtn = document.createElement("button");
            removeBtn.innerText = "Remove";
            removeBtn.onclick = () => removeFromCart(index);
            li.appendChild(removeBtn);
            cartItems.appendChild(li);
        });
    }

    cartPopup.style.display = cartPopup.style.display === "none" ? "block" : "none";
}

// Remove Item from Cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from array
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart to localStorage
    updateCartCount(); // Update cart count
    toggleCart(); // Refresh the cart popup
}

// Close Cart Popup
function closeCart() {
    document.getElementById("cart-popup").style.display = "none";
}

// Checkout and Clear Cart
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    // Simulate payment
    alert("Payment successful!");
    
    // Clear cart
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart)); // Update localStorage
    updateCartCount(); // Update cart count to 0

    document.getElementById("cart-popup").style.display = "none"; // Close cart popup
    document.getElementById("payment-success").style.display = "block"; // Show success message
}

// Close Payment Success Popup
function closePaymentSuccess() {
    document.getElementById("payment-success").style.display = "none";
}

function displayMenu() {
    const coffeeList = document.getElementById("coffee-list");
    coffeeMenu.forEach(coffee => {
        const li = document.createElement("li");
        li.innerHTML = `
            <img src="${coffee.image}" alt="${coffee.name}" class="coffee-image">
            <h3>${coffee.name}</h3>
            <p>${coffee.description}</p>
            <p>${coffee.price}</p>
            <button onclick="selectCoffee('${coffee.name}')">Select</button>`;
        coffeeList.appendChild(li);
    });
}


function selectCoffee(coffeeName) {
    const coffee = coffeeMenu.find(c => c.name === coffeeName);
    document.getElementById('menu').style.display = "none";  
    document.getElementById('customization').style.display = "block";  
    localStorage.setItem("selectedCoffee", JSON.stringify(coffee));
}

function addToCart() {
    const coffee = JSON.parse(localStorage.getItem("selectedCoffee"));
    const milk = document.getElementById("milk-options").value;
    const sweetener = document.getElementById("sweeteners").value;
    const syrup = document.getElementById("flavored-syrups").value;
    const spice = document.getElementById("spices").value;
    const topping = document.getElementById("toppings").value;
    const extra = document.getElementById("extras").value;

    const cartItem = { coffee, milk, sweetener, syrup, spice, topping, extra };

    localStorage.setItem("cartItem", JSON.stringify(cartItem));

    document.getElementById('customization').style.display = "none";
    document.getElementById('payment').style.display = "block";
    displayOrderSummary(cartItem);
}

function displayOrderSummary(cartItem) {
    const orderDetails = document.getElementById("order-details");
    const orderPrice = document.getElementById("order-price");

    orderDetails.innerHTML = `${cartItem.coffee.name} with ${cartItem.milk}, ${cartItem.sweetener}, ${cartItem.syrup}, ${cartItem.spice}, ${cartItem.topping}, ${cartItem.extra}`;
    orderPrice.innerHTML = `Price: ${cartItem.coffee.price}`;
}

function payWithApplePay() {
    alert("Paying with Apple Pay...");
}

function payWithCreditCard() {
    alert("Paying with Credit/Debit Card...");
}

function payWithEBT() {
    alert("Paying with EBT...");
}

function payWithPayPal() {
    alert("Paying with PayPal...");
}

function goBackToMenu() {
    document.getElementById('menu').style.display = "block";  
    document.getElementById('customization').style.display = "none";  
    document.getElementById('payment').style.display = "none";  
}

window.onload = displayMenu;
