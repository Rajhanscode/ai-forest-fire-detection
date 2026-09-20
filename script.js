// --- AI Risk Analysis Engine Logic ---
function updateRisk() {
    let temp = parseFloat(document.getElementById('temp').value);
    let humidity = parseFloat(document.getElementById('humidity').value);
    let wind = parseFloat(document.getElementById('wind').value);

    document.getElementById('temp-val').innerText = temp + " °C";
    document.getElementById('hum-val').innerText = humidity + " %";
    document.getElementById('wind-val').innerText = wind + " km/h";

    let tempFactor = Math.max(0, (temp - 10) * 2.5); 
    let humFactor = Math.max(0, (100 - humidity)); 
    let windFactor = Math.min(100, wind * 1.5); 

    let riskScore = (tempFactor * 0.45) + (humFactor * 0.35) + (windFactor * 0.20);
    
    riskScore = Math.min(100, Math.max(0, riskScore)).toFixed(1);

    let resultBar = document.getElementById('risk-progress');
    let riskText = document.getElementById('risk-text');

    resultBar.style.width = riskScore + "%";

    if (riskScore > 75) {
        resultBar.style.background = "#ff0000"; 
        riskText.innerHTML = `Critical Risk (${riskScore}%) - Immediate Action Required`;
        riskText.style.color = "#ff0000";
    } else if (riskScore > 50) {
        resultBar.style.background = "#ff5722"; 
        riskText.innerHTML = `High Risk (${riskScore}%) - Favorable for Combustion`;
        riskText.style.color = "#ff5722";
    } else if (riskScore > 25) {
        resultBar.style.background = "#ffd700"; 
        riskText.innerHTML = `Moderate Risk (${riskScore}%) - Monitor Environment`;
        riskText.style.color = "#ffd700";
    } else {
        resultBar.style.background = "#00ff00"; 
        riskText.innerHTML = `Low Risk (${riskScore}%) - Safe Conditions`;
        riskText.style.color = "#00ff00";
    }
}

window.onload = updateRisk;

// --- Chemistry Section Slider Logic ---
let currentSlideIndex = 0;
const totalSlides = 5;

function moveSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    }
    
    const track = document.getElementById('slider-track');
    const movePercentage = currentSlideIndex * -20; 
    track.style.transform = `translateX(${movePercentage}%)`;
}