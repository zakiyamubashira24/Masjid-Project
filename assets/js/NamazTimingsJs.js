// Automatically get the location and timings when the page loads
window.onload = function() {
    getLocation();
};

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

async function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // Fetch the city name using reverse geocoding API
    try {
        const locationResponse = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const locationData = await locationResponse.json();
        const cityName = locationData.address.city || locationData.address.town || locationData.address.village || locationData.address.county || "Unknown Location";
        
        // Update the location display
        document.getElementById('locationDisplay').textContent = `Location: ${cityName}`;

        // Fetch and display Namaz timings
        await getTimingsByCoordinates(lat, lon);
    } catch (error) {
        console.error("Error fetching location name:", error);
        document.getElementById('locationDisplay').textContent = "Location: Unknown";
    }
}

function showError(error) {
    const locationDisplay = document.getElementById('locationDisplay');
    switch (error.code) {
        case error.PERMISSION_DENIED:
            locationDisplay.textContent = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            locationDisplay.textContent = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            locationDisplay.textContent = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            locationDisplay.textContent = "An unknown error occurred.";
            break;
    }
}

// Fetch Namaz timings based on coordinates
async function getTimingsByCoordinates(lat, lon) {
    try {
        const response = await fetch(`https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`);
        const data = await response.json();
        displayTimings(data.data.timings);
    } catch (error) {
        alert("Error fetching timings. Please try again.");
    }
}

// Display Namaz timings
function displayTimings(timings) {
    const timingsDiv = document.getElementById('timings');
    timingsDiv.innerHTML = `
        <div class="timing-item">Fajr: ${timings.Fajr}</div>
        <div class="timing-item">Dhuhr: ${timings.Dhuhr}</div>
        <div class="timing-item">Asr: ${timings.Asr}</div>
        <div class="timing-item">Maghrib: ${timings.Maghrib}</div>
        <div class="timing-item">Isha: ${timings.Isha}</div>
    `;
}
