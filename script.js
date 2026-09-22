// --- AI Risk Analysis Engine Logic ---
function updateRisk() {
    let temp = parseFloat(document.getElementById('temp').value);
    let humidity = parseFloat(document.getElementById('humidity').value);
    let wind = parseFloat(document.getElementById('wind').value);

    document.getElementById('temp-val').innerText = temp + " °C";
    document.getElementById('hum-val').innerText = humidity + " %";
    document.getElementById('wind-val').innerText = wind + " km/h";

    document.getElementById('report-details').innerText = `Current Parameters: Temp: ${temp}°C | Humidity: ${humidity}% | Wind: ${wind} km/h`;

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

// --- NEW FULL-PAGE PDF GENERATION LOGIC ---
function downloadReport() {
    const downloadBtn = document.getElementById('download-btn');
    const pdfContainer = document.getElementById('pdf-export-container');
    
    // 1. Get current values
    let temp = document.getElementById('temp').value;
    let humidity = document.getElementById('humidity').value;
    let wind = document.getElementById('wind').value;
    let riskScoreText = document.getElementById('risk-text').innerText;

    // 2. Populate the Hidden PDF Template
    document.getElementById('pdf-date').innerText = new Date().toLocaleString();
    document.getElementById('pdf-temp').innerText = temp + " °C";
    document.getElementById('pdf-hum').innerText = humidity + " %";
    document.getElementById('pdf-wind').innerText = wind + " km/h";
    document.getElementById('pdf-risk-text').innerText = riskScoreText;

    let riskBox = document.getElementById('pdf-risk-box');
    let riskDesc = document.getElementById('pdf-risk-desc');
    let recommendations = document.getElementById('pdf-recommendations');

    // 3. Dynamically generate Detailed Warnings based on Risk Level
    if (riskScoreText.includes("Critical")) {
        riskBox.style.borderLeftColor = "#ff0000";
        riskBox.style.backgroundColor = "#ffe6e6";
        document.getElementById('pdf-risk-text').style.color = "#ff0000";
        riskDesc.innerText = "EXTREME DANGER: Environmental conditions are perfectly primed for rapid, explosive fire ignition and spread.";
        recommendations.innerHTML = `
            <li><strong style="color: #ff0000;">Immediate Evacuation Readiness:</strong> All personnel must be prepared to evacuate forested zones instantly.</li>
            <li><strong>Emergency Alert Activation:</strong> Local fire departments and first responders should be put on high alert.</li>
            <li><strong>Halt All Outdoor Activities:</strong> Strict and immediate ban on campfires, outdoor machinery usage, and agricultural burns.</li>
            <li><strong>Resource Deployment:</strong> Standby for aerial firefighting (water bombers) and ground crew mobilization.</li>
            <li><strong>Air Quality Warning:</strong> High risk of toxic smoke spread affecting vulnerable populations.</li>
        `;
    } else if (riskScoreText.includes("High")) {
        riskBox.style.borderLeftColor = "#ff5722";
        riskBox.style.backgroundColor = "#ffefe6";
        document.getElementById('pdf-risk-text').style.color = "#ff5722";
        riskDesc.innerText = "WARNING: High probability of ignition. Fires can start easily from small sparks and spread quickly.";
        recommendations.innerHTML = `
            <li><strong>Active Patrols:</strong> Increase physical and drone surveillance in highly forested or dry areas.</li>
            <li><strong>Public Advisories:</strong> Issue strong warnings against campfires and outdoor burning.</li>
            <li><strong>Equipment Prep:</strong> Ensure all local firefighting equipment is fully fueled and ready for rapid dispatch.</li>
            <li><strong>Monitor Wind Shifts:</strong> Any sudden increase in wind speed could escalate the threat to Critical status immediately.</li>
        `;
    } else if (riskScoreText.includes("Moderate")) {
        riskBox.style.borderLeftColor = "#ffd700";
        riskBox.style.backgroundColor = "#fffde6";
        document.getElementById('pdf-risk-text').style.color = "#d4af37";
        riskDesc.innerText = "CAUTION: Conditions are moderately favorable for combustion. Occasional monitoring is advised.";
        recommendations.innerHTML = `
            <li><strong>Controlled Monitoring:</strong> Keep standard satellite and remote camera monitoring active.</li>
            <li><strong>Public Awareness:</strong> Remind park visitors and locals of standard fire safety protocols.</li>
            <li><strong>Vegetation Check:</strong> Periodically assess fuel moisture levels in dead leaves and dry grass.</li>
            <li><strong>Safety Equipment:</strong> Ensure basic fire extinguishers are available near camping sites.</li>
        `;
    } else {
        riskBox.style.borderLeftColor = "#00ff00";
        riskBox.style.backgroundColor = "#e6ffe6";
        document.getElementById('pdf-risk-text').style.color = "#2e7d32";
        riskDesc.innerText = "SAFE: Low probability of ignition. Environmental conditions do not currently support fire spread.";
        recommendations.innerHTML = `
            <li><strong>Standard Protocol:</strong> No special emergency actions required. Continue routine environmental logging.</li>
            <li><strong>Safe Activities:</strong> Outdoor activities, camping, and controlled agricultural burns can proceed with standard safety care.</li>
            <li><strong>Routine Maintenance:</strong> Optimal time for clearing dry brush safely to prevent future buildup.</li>
        `;
    }

    // 4. THE FIX: Scroll to Top Temporarily
    pdfContainer.style.display = 'block'; 
    const originalScroll = window.scrollY; // Save current position
    window.scrollTo(0, 0); // Scroll to top to avoid blank capture

    downloadBtn.innerHTML = "⏳ Generating Detailed Report...";
    downloadBtn.disabled = true;

    // 5. Generate PDF
    setTimeout(() => {
        const opt = {
            margin:       0.5,
            filename:     'FireRisk_AI_Detailed_Report.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { 
                scale: 2, 
                useCORS: true,
                scrollY: 0
            }, 
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(pdfContainer).save().then(() => {
            pdfContainer.style.display = 'none'; // Hide template
            window.scrollTo(0, originalScroll);  // Send user back to Calculator
            downloadBtn.innerHTML = "📄 Download Full PDF Report";
            downloadBtn.disabled = false;
        });
    }, 500); // Wait 0.5s to guarantee the browser updates visually before capturing
}

// --- Mobile Hamburger Menu Toggle Logic ---
document.getElementById('hamburger').addEventListener('click', function() {
    document.getElementById('nav-links').classList.toggle('show');
});