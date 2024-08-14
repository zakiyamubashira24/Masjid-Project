async function getTimings() {
    const location = document.getElementById('locationInput').value;
    if (location.trim() === "") {
        alert("Please enter a location.");
        return;
    }
    try {
        const response = await fetch("https://api.aladhan.com/v1/timingsByCity?city=" + location + "&country=your_country&method=2");
        const data = await response.json();
        displayTimings(data.data.timings);
    } catch (error) {
        alert("Error fetching timings. Please try again.");
    }
}

function displayTimings(timings) {
    const timingsDiv = document.getElementById('timings');
    timingsDiv.innerHTML = `
        <div class="timing-item">Fajr: ${timings.Fajr}</div>
        <div class="timing-item">Dhuhr: ${timings.Dhuhr}</div>
        <div class="timing-item">Asr: ${timings.Asr}</div>
        <div class="timing-item">Maghrib: ${timings.Maghrib}</div>
        <div class="timing-item">Isha: ${timings.Isha}</div>
    `;

    // Add slow scroll effect after displaying timings
    const timingsWrapper = document.querySelector('.timings');
    timingsWrapper.classList.add('slow-scroll');
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    getTimingsByCoordinates(lat, lon);
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

async function getTimingsByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
        const data = await response.json();
        displayTimings(data.data.timings);
    } catch (error) {
        alert("Error fetching timings. Please try again.");
    }
}