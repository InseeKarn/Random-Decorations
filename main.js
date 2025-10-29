const btn_random = document.getElementById('randomize');

const product = [
    { name: "โคมไฟวินเทจ", price: "$25", images: ["lamp1.jpg", "lamp2.jpg", "lamp3.jpg"], description: "โคมไฟตกแต่งบ้านสไตล์วินเทจ", link: "#" },
    { name: "โต๊ะข้างเตียง", price: "$45", images: ["table.jpg", "table.jpg", "table.jpg"], description: "โต๊ะข้างเตียงไม้สวย", link: "#" },
    { name: "เก้าอี้โมเดิร์น", price: "$60", images: ["chair.jpg", "chair.jpg", "chair.jpg"], description: "เก้าอี้โมเดิร์นสำหรับห้องนั่งเล่น", link: "#" },
    { name: "ชั้นวางของ", price: "$35", images: ["shelf.jpg", "shelf.jpg", "shelf.jpg"], description: "ชั้นวางของไม้สีอ่อน", link: "#" }
];

const ImgSlides = [
  {
    image: "https://i.pinimg.com/1200x/10/1e/ca/101ecada1c213b0e1c79e9575123c7ad.jpg",
    author: "Kikaa",
    link: "https://www.pinterest.com/pin/1548181176260370/"
  },
  {
    image: "https://i.pinimg.com/736x/16/19/f8/1619f8fdeddcf8564a10b89be94fcce8.jpg",
    author: "Adrian",
    link: "https://www.pinterest.com/pin/1759287348493727/"
  },
  {
    image: "https://i.pinimg.com/736x/79/e6/6b/79e66b9eff920c482f319886b89ee38a.jpg",
    author: "Gabriella Decor",
    link: "https://www.pinterest.com/pin/14636767535562839/"
  },
  {
    image: "https://i.pinimg.com/736x/97/ba/04/97ba0458d5809f8d0cb733fee449ea88.jpg",
    author: "Michael Parker",
    link: "https://www.pinterest.com/pin/26740191531816616/"
  },
  {
    image: "https://i.pinimg.com/736x/3b/fb/98/3bfb98119a67d043f33197842e15785d.jpg",
    author: "javius02",
    link: "https://www.pinterest.com/pin/1055599907917086/"
  },
  {
    image: "https://i.pinimg.com/1200x/a4/0c/d6/a40cd6f528bb40b93870767ff74e866d.jpg",
    author: "Miracle Keeling",
    link: "https://www.pinterest.com/pin/38562140558926267/"
  },
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


let ImgCurrentIndex = 0;

function changeSlide() {
  const headerImg = document.getElementById("header-img");
  const imgForm = document.getElementById("img-form");

  const currentSlide = ImgSlides[ImgCurrentIndex];
  headerImg.src = currentSlide.image;
  imgForm.innerHTML = `Image from Pinterest by ${currentSlide.author}
  <a href="${currentSlide.link}" id="img-link" target="_blank">Visit</a>`;


  ImgCurrentIndex = (ImgCurrentIndex + 1) % ImgSlides.length;
}


changeSlide();


setInterval(changeSlide, 5000);