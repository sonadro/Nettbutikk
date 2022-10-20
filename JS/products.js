const productsDiv = document.querySelector(".products");

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
            <p class="price">Laster pris</p>
        </div>
        `;
    }
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
        priceTxt.textContent = `$ ${obj.price}`;
    }
}

// Hvis products.html
if (productsDiv !== null) {
    let testObject;
    const checkObjects = function(objs, filter) {
        objs.forEach(obj => {
            if (obj.class === filter) {
                testObject = obj;
            }
        });
    }
    // sjekk et produkt
    const cartProducts = [];
    productsDiv.addEventListener("click", e => {
        let itemClass = Array.from(e.target.classList);
        itemClass = itemClass[1];
        checkObjects(objects, itemClass);
        console.log(testObject);
    });


    // Fetch and load data
    let objects = [];
    getFile('../products.json')
        .then(data => {
            createSlots(data.length, productsDiv);
            const productSlots = productsDiv.children;
            randomiseIds(data);
            loadItems(productSlots, data);
            objects = data;
        })
        .catch(err => console.warn('Rejected:', err.message));
    //
} else {
    console.log('Handlekurv.html');
}