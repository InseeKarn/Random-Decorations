// Price Slider Functionality
const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');
const minValue = document.getElementById('min-value');
const maxValue = document.getElementById('max-value');
const sliderTrack = document.getElementById('slider-track');
const minPriceInput = document.getElementById('min-price');
const maxPriceInput = document.getElementById('max-price');

function updateSlider() {
    let min = parseInt(rangeMin.value);
    let max = parseInt(rangeMax.value);
    
    if (max - min < 5) {
        if (this.id === 'range-min') {
            rangeMin.value = max - 5;
            min = max - 5;
        } else {
            rangeMax.value = min + 5;
            max = min + 5;
        }
    }
    
    minValue.textContent = min;
    maxValue.textContent = max;
    minPriceInput.value = min;
    maxPriceInput.value = max;
    
    const percent1 = (min / rangeMin.max) * 100;
    const percent2 = (max / rangeMax.max) * 100;
    sliderTrack.style.left = percent1 + '%';
    sliderTrack.style.width = (percent2 - percent1) + '%';
}

rangeMin.addEventListener('input', updateSlider);
rangeMax.addEventListener('input', updateSlider);

updateSlider();