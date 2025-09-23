// Handle form submit
document.getElementById("addressForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const pincode = document.getElementById("pincode").value;

  alert(`Address Saved!\n\nName: ${name}\nPhone: ${phone}\nAddress: ${address}\nPincode: ${pincode}`);
});

// Back button
function goBack() {
  window.history.back();
}

// Initialize map
  var map = L.map('map').setView([20.5937, 78.9629], 5); // India center

  // Load tiles (OpenStreetMap free layer)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Marker
  var marker = L.marker([20.5937, 78.9629]).addTo(map);

  // Function to update location
  function updateLocation(address) {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${address}`)
      .then(res => res.json())
      .then(data => {
        if (data && data[0]) {
          let lat = data[0].lat;
          let lon = data[0].lon;
          map.setView([lat, lon], 15);
          marker.setLatLng([lat, lon]);
        }
      });
  }

  // Hook to your inputs
  const addressField = document.getElementById("address");
  const pincodeField = document.getElementById("pincode");

  function trackAddress() {
    const fullAddress = addressField.value + " " + pincodeField.value;
    if (fullAddress.trim() !== "") {
      updateLocation(fullAddress);
    }
  }

  addressField.addEventListener("input", trackAddress);
  pincodeField.addEventListener("input", trackAddress);
