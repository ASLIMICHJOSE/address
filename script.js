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

// Function to update location from address (forward geocode)
function updateLocation(address) {
 fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(address)}`)
    .then(res => res.json())
    .then(data => {
      if (data && data[0]) {
        let lat = parseFloat(data[0].lat);
        let lon = parseFloat(data[0].lon);
        map.setView([lat, lon], 15);
        marker.setLatLng([lat, lon]);
      }
    })
    .catch(err => console.error("Error fetching location:", err));
}

// Hook to your inputs
const addressField = document.getElementById("address");
const pincodeField = document.getElementById("pincode");

function trackAddress() {
  const fullAddress = `${addressField.value}, ${pincodeField.value}, India`;

  if (fullAddress.trim() !== "") {
    updateLocation(fullAddress);
  }
}

addressField.addEventListener("input", trackAddress);
pincodeField.addEventListener("input", trackAddress);

// Function to get address from map click (reverse geocode)
function getAddressFromCoords(lat, lon) {
  fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
    .then(res => res.json())
    .then(data => {
      if (data && data.display_name) {
        // Fill textarea with full address
        document.getElementById("address").value = data.display_name;

        // If postcode exists, fill it
        if (data.address && data.address.postcode) {
          document.getElementById("pincode").value = data.address.postcode;
        }
      }
    })
    .catch(err => console.error("Error fetching reverse geocode:", err));
}

// Listen for map clicks
map.on("click", function(e) {
  let lat = e.latlng.lat;
  let lon = e.latlng.lng;

  marker.setLatLng([lat, lon]);   // move marker
  map.setView([lat, lon], 15);    // zoom to click
  getAddressFromCoords(lat, lon); // fetch & fill address
});
