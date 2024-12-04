let cart = [];

function addToCart() {
    const coffee = JSON.parse(localStorage.getItem("selectedCoffee"));
    if (coffee) {
        cart.push(coffee);
        alert(`${coffee.name} added to cart!`);
    }
}

function showCart() {
    const cartSection = document.getElementById("cart");
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = "<li>Your cart is empty.</li>";
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `${item.name} - ${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>`;
            cartItems.appendChild(li);
        });
    }
    cartSection.style.display = "block";
}

function hideCart() {
    document.getElementById("cart").style.display = "none";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    showCart();
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Payment Successful! Thank you for your order.");
    cart = [];
    hideCart();
}

// Modify existing functionality to incorporate cart
function addToCartWithCustomization() {
    const coffee = JSON.parse(localStorage.getItem("selectedCoffee"));
    const milk = document.getElementById("milk-options").value;
    const sweetener = document.getElementById("sweeteners").value;
    const syrup = document.getElementById("flavored-syrups").value;
    const spice = document.getElementById("spices").value;
    const topping = document.getElementById("toppings").value;
    const extra = document.getElementById("extras").value;

    const cartItem = { coffee, milk, sweetener, syrup, spice, topping, extra };

    cart.push(cartItem);
    alert(`${coffee.name} with customizations added to cart!`);
}
