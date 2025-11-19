// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
let cart = [];

let total = 0;

// Exercise 1
const buy = (id) => {
    const buyingProduct = products.find(product => product.id === +id);
    const productInCart = cart.find(product => product.id === buyingProduct.id)

    if(!productInCart) cart.push({...buyingProduct,  quantity: 1, subTotal: buyingProduct.price}) 
    else {
        productInCart.quantity++;
        productInCart.subTotal = productInCart.subTotal + productInCart.price
    } 

    calculateTotal()
    applyPromotionsCart()
    printCart()
}

// Exercise 2
const cleanCart = () =>  {
    cart = []
    total = 0
    printCart()
}

// Exercise 3
const calculateTotal = () =>  {
   total = cart.reduce((acc, product) => acc + (product.subtotalWithDiscount ? product.subtotalWithDiscount : product.subTotal), 0)
}

// Exercise 4
const applyPromotionsCart = () =>  {
    cart.forEach(product =>{
        if (product.offer) {
            product.quantity >= product.offer.number
                ? product.subtotalWithDiscount = product.subTotal - product.subTotal*product.offer.percent/100
                : product.subtotalWithDiscount = undefined
        }
    })
    calculateTotal();
}

// Exercise 5
const printCart = () => {
    const list = document.getElementById('cart_list');

    list.innerHTML = cart.map(p => 
        `<tr>
			<th scope="row">${p.name}</th>
			<td>${p.price}</td>
			<td>${p.quantity}</td>
			<td>${p.subtotalWithDiscount ? p.subtotalWithDiscount : p.subTotal}</td>
			<td onclick="shop.removeFromCart(${p.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8"/>
                </svg>
            </td>
		</tr>`
    ).join('');

    const quantityProductsCart = cart.map(product => product.quantity).reduce((acc, quantity) => acc + quantity, 0)
    document.getElementById('count_product').textContent = quantityProductsCart;
}


// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {
    const productToRemove = cart.find(product => product.id === id)

    if (productToRemove.quantity > 1) {
        productToRemove.quantity--;
        productToRemove.subTotal = productToRemove.price * productToRemove.quantity
    } else {
        const index = cart.findIndex(p => p.id === productToRemove.id);
        cart.splice(index, 1);
    }

    calculateTotal()
    applyPromotionsCart()
    printCart()
}

const open_modal = () =>  {
    printCart();
}

export const shop = {
    buy,
    cleanCart,
    calculateTotal,
    applyPromotionsCart,
    printCart,
    removeFromCart,
    open_modal: () => printCart(),
};

window.shop = shop;