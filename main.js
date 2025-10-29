const btn_random = document.getElementById('randomize');

const product = [
    { name: "โคมไฟวินเทจ", price: "$25", images: ["lamp1.jpg", "lamp2.jpg", "lamp3.jpg"], description: "โคมไฟตกแต่งบ้านสไตล์วินเทจ", link: "#" },
    { name: "โต๊ะข้างเตียง", price: "$45", images: ["table.jpg", "table.jpg", "table.jpg"], description: "โต๊ะข้างเตียงไม้สวย", link: "#" },
    { name: "เก้าอี้โมเดิร์น", price: "$60", images: ["chair.jpg", "chair.jpg", "chair.jpg"], description: "เก้าอี้โมเดิร์นสำหรับห้องนั่งเล่น", link: "#" },
    { name: "ชั้นวางของ", price: "$35", images: ["shelf.jpg", "shelf.jpg", "shelf.jpg"], description: "ชั้นวางของไม้สีอ่อน", link: "#" }
];

function displayRandomProducts(num = 3) {
    const container = document.getElementById('product-container');

    container.innerHTML = "";

    const shuffled = product.sort(() => 0.5 - Math.random());

    const selected = shuffled.slice(0, num);

    selected.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // slider
        let sliderHTML = `
            <div class="slider" id="slider-${index}">
                <button class="prev">&#10094;</button>
                <img src="${product.images[0]}" alt="${product.name}">
                <button class="next">&#10095;</button>
            </div>
        `;


        productDiv.innerHTML = `
            <h3>${product.name}</h3>
            ${sliderHTML}
            <h5>Price: ${product.description}</h5>
            <h6>link: ${product.link}</h6>
            <p>${product.description}</p>
        `

        container.appendChild(productDiv);

        let currentIndex = 0;
        const slider = productDiv.querySelector(`#slider-${index} img`);
        const prevBtn = productDiv.querySelector(".prev")
        const nextBtn = productDiv.querySelector(".next")

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
            slider.src = product.images[currentIndex];
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % product.images.length;
            slider.src = product.images[currentIndex];
        });
        
    });
}

displayRandomProducts(3);

btn_random.addEventListener('click', () => {
    displayRandomProducts(3);
})

