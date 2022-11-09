const productsDiv = document.querySelector('.products');
const popupSlot = document.querySelector('.popupProduct');
const addToCartBtn = document.querySelector('.addToCart');
let itemSlots;

const getFile = async (resource) => {
    const response = await fetch(resource);

    if (response.status !== 200) {
        throw new Error('Cannot fetch the data, error code', response.status);
    }

    const data = await response.json();

    return data;
}

const createSlots = function(length, div) {
    for (i = 0; i < length; i++) {
        div.innerHTML += `
        <div class="itemSlot">
            <p class="name" id="name">Laster navn</p>
            <img src="../IMG/Placeholder.jpg" alt="Laster bilde" class="image">
            <img src="../IMG/credits.png" alt="Bilde av credits" class="credImg">
            <p class="price">Laster pris</p>
        </div>
        `;
    }
    itemSlots = Array.from(document.querySelectorAll('.itemSlot'));
}

// Randomise IDS
const randomiseIds = function(objects) {
    // Generates array of ids
    const generateIDs = function() {
        let arr = [];
        for (i = 1; i < objects.length + 1; i++) {
            arr.push(i);
        }
        return arr;
    }

    // Assigns random ids to objects
    const assignIDs = function(objs) {
        let ids = generateIDs();
        objs.forEach(obj => {
            const rNum = Math.floor(Math.random() * ids.length);
            obj.id = ids[rNum];
            ids.splice(rNum, 1);
        });
    }
    assignIDs(objects);

    // Re-sorts the objects, so they can be loaded in the new order
    objects.sort((a, b) => a.id - b.id);
}

// Loads each object's properties
const loadItems = function(slots, objs) {
    for (i = 0; i < objs.length; i++) {
        // define objects & slots
        const slot = slots[i];
        const obj = objs[i];

        // define properties
        const nameTxt = slot.querySelector("#name");
        const image = slot.querySelector("img");
        const priceTxt = slot.querySelector(".price");

        // update properties
        nameTxt.textContent = obj.name;
        image.src = obj.image;
        image.setAttribute("alt", obj.altText);
        image.classList.add(`${obj.class}`);
        nameTxt.classList.add(`${obj.class}`);
        image.classList.remove("loading");
        priceTxt.textContent = `${obj.price}`;
    }
}

let inCart = false;
let inCartIndex;
const checkProduct = function(obj, slot) {
    const nameTxt = slot.querySelector('h2');
    const category = slot.querySelector('.category');
    const img = slot.querySelector('img');
    const priceTxt = slot.querySelector('.price');
    const descriptionTxt = slot.querySelector('.description');
    const closeBtn = slot.querySelector('.closeBtn');

    let cartProducts = localStorage.getItem('cartProducts');
    cartProducts = JSON.parse(cartProducts);
    // console.log(cartProducts);

    for (i = 0; i < cartProducts.length; i++) {
        const product = cartProducts[i];

        if (product.name === currentObject.name) {
            inCart = true;
            inCartIndex = i;
            addToCartBtn.classList.add('inCartBtn');
            addToCartBtn.textContent = 'Fjern fra handlekurv';
        }
    }

    closeBtn.addEventListener('click', () => {
        productsDiv.classList.remove('d-none');
        itemSlots.forEach(itemSlot => {
            itemSlot.classList.remove('d-none');
        });
        popupSlot.classList.add('d-none');
    });

    nameTxt.textContent = obj.name;
    category.textContent = `Kategori: ${obj.category}`;
    img.setAttribute('src', obj.image);
    descriptionTxt.textContent = obj.description;
    priceTxt.textContent = `${obj.price}`;
}

let currentObject;
addToCartBtn.addEventListener('click', () => {
    if (!inCart) {
        let cartProducts = localStorage.getItem('cartProducts');
        cartProducts = JSON.parse(cartProducts);
        if (cartProducts === null) {
            cartProducts = [];
        }
        cartProducts.push(currentObject);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    } else {
        let cartProducts = localStorage.getItem('cartProducts');
        cartProducts = JSON.parse(cartProducts);

        cartProducts.splice(inCartIndex, 1);
        localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
    }
    productsDiv.classList.remove('d-none');
    itemSlots.forEach(itemSlot => {
        itemSlot.classList.remove('d-none');
    });
    popupSlot.classList.add('d-none');
});

// Filter
const checkObjects = function(objs, filter) {
    objs.forEach(obj => {
        if (obj.class === filter) {
            currentObject = obj;
        }
    });
}

// Sjekk et produkt
productsDiv.addEventListener("click", e => {
    if (e.target.id === 'name') {
        scrollTo(0, 0);
        productsDiv.classList.add('d-none');
        itemSlots.forEach(itemSlot => {
            itemSlot.classList.add('d-none');
        });
        popupSlot.classList.remove('d-none');
        let itemClass = Array.from(e.target.classList);
        itemClass = itemClass[1];
        checkObjects(objects, itemClass);
        checkProduct(currentObject, popupSlot);
    }
});

// RUN

// Fetch and load data
let objects = [];
db.collection('products').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        objects.push(doc.data());
    });
    createSlots(objects.length, productsDiv);
    const productSlots = productsDiv.children;
    randomiseIds(objects);
    loadItems(productSlots, objects);
}).catch(err => console.error(err));