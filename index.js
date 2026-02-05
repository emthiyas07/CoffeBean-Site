

let cbean = [
    { id: 0, cName: "Kona Coffee", origin: "Origin : Hawaii", price: 12000, qty: 0, cImg: "./konacoffee.jpg" },
    { id: 1, cName: "Jamaica Blue", origin: "Origin : Jamaica", price: 15000, qty: 0, cImg: "./jamaica.jpg" },
    { id: 2, cName: "Panama Geisha", origin: "Origin : Panama", price: 25000, qty: 0, cImg: "./geisha.jpg" },
    { id: 3, cName: "Ethiopian Yirgachefe", origin: "Origin : Ethiopia", price: 6000, qty: 0, cImg: "./ethiopian.webp" },
    { id: 4, cName: "Kenya AA", origin: "Origin : Kenya", price: 6500, qty: 0, cImg: "./kenya.jpg" },
    { id: 5, cName: "Colombian Supremo", origin: "Origin : Colombia", price: 5000, qty: 0, cImg: "./colombian.webp" },
    { id: 6, cName: "Sumatra Mandheling", origin: "Origin : Indonesia", price: 5500, qty: 0, cImg: "./sumatra.jpg" },
    { id: 7, cName: "Hawaiian Peaberry", origin: "Origin : Hawaii", price: 8000, qty: 0, cImg: "./peaberry.webp" },
    { id: 8, cName: "Costa Rica Tarrazú", origin: "Origin : Costa Rica", price: 5200, qty: 0, cImg: "./costa.webp" },
    { id: 9, cName: "Ethiopian Sidamo", origin: "Origin : Ethiopia", price: 4800, qty: 0, cImg: "./sidamo.jpg" },
];


let cbeann = [
    { id: 0, ncName: "Indian Arabica", type: "Arabica", price: 1200, qty: 0, cImg: "./inarab.jpg" },
    { id: 1, ncName: "Indian Robusta", type: "Robusta", price: 800, qty: 0, cImg: "./inrob.jpg" },
    { id: 2, ncName: "Brazil Santos", type: "Arabica", price: 1400, qty: 0, cImg: "./santos.jpg" },
    { id: 3, ncName: "Vietnam Robusta", type: "Robusta", price: 700, qty: 0, cImg: "./robusta.webp" },
    { id: 4, ncName: "South Indian Blend", type: "Blend", price: 1000, qty: 0, cImg: "./southblend.webp" },
    { id: 5, ncName: "Chikmagalur Arabica", type: "Arabica", price: 1300, qty: 0, cImg: "./chikmagalur.jpg" },
    { id: 6, ncName: "Coorg Coffee", type: "Arabica", price: 1400, qty: 0, cImg: "./coorg.jpg" },
    { id: 7, ncName: "Nilgiri Coffee", type: "Arabica", price: 1500, qty: 0, cImg: "./nilgiri.jpg" },
    { id: 8, ncName: "Commercial Beans", type: "Blend", price: 800, qty: 0, cImg: "./commercial.jpg" },
    { id: 9, ncName: "Chicory Coffee Mix", type: "Blend", price: 600, qty: 0, cImg: "./chicory.jpg" },
    { id: 10, ncName: "Plantation A Coffee", type: "Arabica", price: 1200, qty: 0, cImg: "./plantation.png" },
    { id: 11, ncName: "Estate Blend Coffee", type: "Blend", price: 1100, qty: 0, cImg: "./estate.jpg" },
    { id: 12, ncName: "Medium Roast Coffee", type: "Blend", price: 1000, qty: 0, cImg: "./medium.jpg" },
    { id: 13, ncName: "Dark Roast Coffee", type: "Blend", price: 1100, qty: 0, cImg: "./dark.jpg" },
    { id: 14, ncName: "Espresso Blend", type: "Blend", price: 1300, qty: 0, cImg: "./espresso.webp" },
    { id: 15, ncName: "Café Blend Coffee", type: "Blend", price: 900, qty: 0, cImg: "./cafe.webp" },
];







// ---------------- CART ----------------
let addcarts = document.getElementById("addcart");
let storeproducts = [];

// ---------------- SEARCH & DISPLAY ----------------
function SearchIn() {
    let premiumBox = document.getElementById("ProductContainer");
    let normalBox = document.getElementById("ProductContainer1");
    let userSearch = document.getElementById("search").value.toLowerCase();

    premiumBox.innerHTML = "";
    normalBox.innerHTML = "";

    // PREMIUM
    cbean.filter(p => p.cName.toLowerCase().includes(userSearch))
        .forEach(p => {
            premiumBox.innerHTML += `
            <div class="beandata">
                <img src="${p.cImg}">
                <h1>${p.cName}</h1>
                <p>${p.origin}</p>
                <h2>Rs: ${p.price}</h2>
                <button onclick="addToCart(${p.id}, 'premium'),addinc()">Add to cart</button>
            </div>`;
        });

    // NORMAL
    cbeann.filter(n => n.ncName.toLowerCase().includes(userSearch))
        .forEach(n => {
            normalBox.innerHTML += `
            <div class="beandata">
                <img src="${n.cImg}">
                <h1>${n.ncName}</h1>
                <p>Type : ${n.type}</p>
                <h2>Rs: ${n.price}</h2>
                <button onclick="addToCart(${n.id}, 'normal'),addinc()">Add to cart</button>
            </div>`;
        });
}
SearchIn();

// ---------------- ADD TO CART ----------------
function addToCart(id, type) {
    if (!storeproducts[type + id]) {
        let product =
            type === "premium"
                ? { ...cbean[id], name: cbean[id].cName }
                : { ...cbeann[id], name: cbeann[id].ncName };

        product.qty = 1;
        storeproducts[type + id] = product;
    } else {
        storeproducts[type + id].qty++;
    }
    cartProductReload();
}

// ---------------- CART RELOAD ----------------
function cartProductReload() {
    addcarts.innerHTML = `
        <div class="amountss d-flex">
            <h1>Total Price</h1>
            <h2 id="pamt">0</h2>
        </div>
        <div class="pay">
                <button onclick = "submitt()">Place Order</button>
            </div>
    `;

    let total = 0;

    Object.keys(storeproducts).forEach(key => {
        let item = storeproducts[key];
        total += item.price * item.qty;

        addcarts.innerHTML += `
        <div class="addproduts">
            <img src="${item.cImg}">
            <div class="added d-flex">
                <button onclick="changeqty('${key}', ${item.qty - 1})">-</button>
                <h1>${item.qty}</h1>
                <button onclick="changeqty('${key}', ${item.qty + 1})">+</button>
            </div>
            <div class="names">
                <h1 class="name1">${item.name}</h1>
                <p>Rs : ${item.price}</p>
            </div>
        </div>`;

    });

    document.getElementById("pamt").innerText = total;
    console.log(total);
    
}

// ---------------- CHANGE QTY ----------------
function changeqty(key, qty) {
    if (qty <= 0) {
        delete storeproducts[key];
    } else {
        storeproducts[key].qty = qty;
    }
    cartProductReload();
}

// ---------------- CART SHOW / HIDE ----------------
let card1 = document.getElementById("card");

function hide() {
    card1.style.right = "-100%";
}
function show() {
    card1.style.right = "0px";
}

let images = [
  "banner1.jpg",
  "banner2.jpg",
  "banner3.jpg",
  "banner4.jpg"
];

let index = 0;
let slide = document.getElementById("slide");

function changeImage() {
  index++;
  if (index >= images.length) {
    index = 0;
  }
  slide.src = images[index];
}

// Change image every 2 seconds
setInterval(changeImage, 4000);


let images1 = [
  "11243676.png",
  "11243677.png",
  "11243682.png"
];

let index1 = 0;
let slide1 = document.getElementById("slide1");

function changeimage() {
  index1++;
  if (index1 >= images1.length) {
    index1 = 0;
  }
  slide1.src = images1[index1];
}

// Change image every 2 seconds
setInterval(changeimage, 4000);



//payment page

function submitt() {

        window.location.href="file:///D:/FRONTEND/JAVASCRIPT/js_project(coffeebean)/payment.html";
}

function backhome() {

        window.location.href="file:///D:/FRONTEND/JAVASCRIPT/js_project(coffeebean)/index.html#ABOUTUS";
}

function paysuccess(){
    const scard = document.getElementById("successCard");
    const hide_all = document.getElementById("hideall");
    scard.style.top = "210px";
    hide_all.style.opacity="0.4"
}


function toggleMenu() {
    const navLinks = document.getElementById("navLinks");

    if (navLinks.style.display === "flex") {
        navLinks.style.display = "none";
    } else {
        navLinks.style.display = "flex";
    }
}

let count = 0;

function addinc() {
  count++;
  document.getElementById("cart-count").innerText = count;
}
