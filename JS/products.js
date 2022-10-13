const productSlots = Array.from(document.querySelector(".products").children);
const productsDiv = document.querySelector(".products");

let objects = [
    {name: "Minigun", image: "../IMG/StoreMinigun.png", altText: "Image of Minigun", price: 50, id: 1},
    {name: "Shotgun", image: "../IMG/StoreShotgun.png", altText: "Image of Shotgun", price: 100, id: 2},
    {name: "Scattergun", image: "../IMG/StoreScattergun.png", altText: "Image of Scattergun", price: 150, id: 3}
];

const createSlots = function(objs, div) {
    for (i = 0; i < objs.length; i++) {
        div.innerHTML += `
        <div class="itemSlot">
            <p class="name">Name</p>
            <img src="../IMG/StoreMinigun.png" alt="Image of Minigun" class="image">
            <p class="price">Price</p>
        </div>
        `;
    }
}

// Randomise IDS
const randomiseIds = function() {
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
        const slot = slots[i];
        const obj = objs[i];
        const nameTxt = slot.querySelector(".name");
        const image = slot.querySelector(".image");
        const priceTxt = slot.querySelector(".price");
        console.log(nameTxt);
        nameTxt.textContent = obj.name;
        image.src = obj.image;
        image.setAttribute("alt", obj.altText);
        priceTxt.textContent = `$ ${obj.price}`;
    }
}

// createSlots(objs, productsDiv);

randomiseIds();

loadItems(productSlots, objects);