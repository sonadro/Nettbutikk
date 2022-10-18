const productsDiv = document.querySelector(".products");
const productSlots = Array.from(productsDiv.children);

let objects = [
    {name: "Minigun ", imgClass: "minigun", image: "../IMG/StoreMinigun.png", altText: "Image of Minigun", price: 50, id: 1},
    {name: "Shotgun ", imgClass: "shotgun", image: "../IMG/StoreShotgun.png", altText: "Image of Shotgun", price: 100, id: 2},
    {name: "Scattergun ", imgClass: "scattergun", image: "../IMG/StoreScattergun.png", altText: "Image of Scattergun", price: 150, id: 3},
    {name: "Frag Grenade", imgClass: "frag_grenade", image: "../IMG/StoreFrag.png", altText: "Image of Frag Grenade", price: 200, id: 4}
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
        image.classList.add(`${obj.imgClass}`);
        nameTxt.classList.add(`${obj.imgClass}`);
        image.classList.remove("loading");
        priceTxt.textContent = `$ ${obj.price}`;
    }
}

// sjekk et produkt
productsDiv.addEventListener("click", e => {
    let itemClass = Array.from(e.target.classList);
    itemClass = itemClass[0];
    console.log(itemClass);
});

// createSlots(objs, productsDiv);

randomiseIds();

loadItems(productSlots, objects);