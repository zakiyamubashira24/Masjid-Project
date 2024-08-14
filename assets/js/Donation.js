let donors = [];

function addDonor() {
    const nameInput = document.getElementById('donor-name');
    const name = nameInput.value.trim();
    const amountInput = document.getElementById('donor-amount');
    const amount = amountInput.value.trim();
    
    if (name && amount) {
        const timestamp = new Date().toLocaleString();
        donors.unshift({ name, amount, timestamp }); // Add the new donor to the start of the array
        nameInput.value = '';
        amountInput.value = '';
        updateDonorList();
    }
}

function updateDonorList() {
    const donorList = document.getElementById('donors');
    donorList.innerHTML = '';
    
    donors.forEach(donor => {
        const li = document.createElement('li');
        li.textContent = `${donor.name} - ${donor.amount} - ${donor.timestamp}`;
        donorList.appendChild(li);
    });

    // Update the animation duration based on the number of items
    document.documentElement.style.setProperty('--total-items', donors.length);
}

// Initialize with an empty donor list
updateDonorList();