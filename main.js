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


let displayedProductsHistory = [];
let allProducts = [];

async function getProducts() {
    try {
        const response = await fetch('/api/products');
        const data = await response.json();
        console.log(data);

        let productsArray = [];

        if (data.aliexpress_affiliate_product_query_response?.resp_result?.result?.products?.product) {
            productsArray = data.aliexpress_affiliate_product_query_response.resp_result.result.products.product;
        } else if (Array.isArray(data)) {
            productsArray = data;
        } else {
            productsArray = [];
        }

        allProducts = productsArray;
        displayRandomProducts(3);

    } catch (err) {
        console.error(err);
    }
}

function displayRandomProducts(num = 3) {
    if (!Array.isArray(allProducts) || allProducts.length === 0) {
        console.error("No products available");
        return;
    }

    const container = document.getElementById('product-container');
    container.innerHTML = "";


    let availableProducts = allProducts.filter(product => {
        const productId = product.product_id || product.product_title;
        return !displayedProductsHistory.includes(productId);
    });


    if (availableProducts.length < num) {
        console.log("Resetting product history - not enough unique products");
        displayedProductsHistory = [];
        availableProducts = [...allProducts];
    }


    const shuffled = availableProducts.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, num);


    selected.forEach(product => {
        const productId = product.product_id || product.product_title;
        displayedProductsHistory.push(productId);
    });

    if (displayedProductsHistory.length > num * 5) {
        displayedProductsHistory = displayedProductsHistory.slice(num);
    }

    console.log(`Displayed products history: ${displayedProductsHistory.length} items`);


    selected.forEach((product, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("product");

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
        const prevBtn = productDiv.querySelector(".prev");
        const nextBtn = productDiv.querySelector(".next");

        const images = product.product_small_image_urls?.string || [];

        if (images && images.length > 1) {
            prevBtn.addEventListener("click", () => {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
                slider.src = images[currentIndex];
            });

            nextBtn.addEventListener("click", () => {
                currentIndex = (currentIndex + 1) % images.length;
                slider.src = images[currentIndex];
            });
        } else {
            prevBtn.style.display = "none";
            nextBtn.style.display = "none";
        }
    });
}

btn_random.addEventListener('click', () => {
    displayRandomProducts(3);
});

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