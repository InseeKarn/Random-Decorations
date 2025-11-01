const btn_random = document.getElementById('randomize');

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

async function getProducts() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        console.log(data);

        let productsArray = [];

        if (data.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product) {
            productsArray = data.aliexpress_affiliate_product_query_response.resp_result.result.products.product;
        } else if (Array.isArray(data)) {
            productsArray = data; // fallback
        } else {
            productsArray = [];
        }

        displayRandomProducts(3, productsArray);

    } catch (err) {
        console.error(err);
    }
}

function displayRandomProducts(num = 3, data = []) {
    if (!Array.isArray(data)) {
        console.error("data is not an array", data);
        return;
    }

    const container = document.getElementById('product-container');
    container.innerHTML = "";

    const shuffled = data.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, num);

    selected.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

        // slider
        const sliderHTML = `
            <div class="slider" id="slider-${index}">
                <button class="prev">&#10094;</button>
                <img src="${product.product_small_image_urls?.string?.[0] || 'https://via.placeholder.com/300'}" alt="${product.product_title}">
                <button class="next">&#10095;</button>
            </div>
        `;

        productDiv.innerHTML = `
            <h4>${product.product_title}</h4>
            ${sliderHTML}
            <h5>Price: $${product.app_sale_price}</h5>
            <a href="${product.product_detail_url}" target="_blank">Buy Now</a>
        `;

        container.appendChild(productDiv);

        let currentIndex = 0;
        const slider = productDiv.querySelector(`#slider-${index} img`);
        const prevBtn = productDiv.querySelector(".prev")
        const nextBtn = productDiv.querySelector(".next")

        if (product.images && product.images.length > 0) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + product.images.length) % product.images.length;
                slider.src = product.images[currentIndex];
            });

            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % product.images.length;
                slider.src = product.images[currentIndex];
            });
        } else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }

    });
}

btn_random.addEventListener('click', getProducts);
getProducts();

let ImgCurrentIndex = 0;

function changeSlide() {
    const headerImg = document.getElementById("header-img");
    const imgForm = document.getElementById("img-form");

    if (!headerImg || !imgForm) return;

    const currentSlide = ImgSlides[ImgCurrentIndex];
    headerImg.src = currentSlide.image;
    imgForm.innerHTML = `Image from Pinterest by ${currentSlide.author}
    <a href="${currentSlide.link}" id="img-link" target="_blank">Visit</a>`;

    ImgCurrentIndex = (ImgCurrentIndex + 1) % ImgSlides.length;
}


changeSlide();


setInterval(changeSlide, 5000);
