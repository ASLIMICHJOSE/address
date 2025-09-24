// =================== FORM HANDLING ===================
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

// =================== GOOGLE MAP UPDATER ===================
const mapFrame = document.getElementById("mapFrame");
const addressField = document.getElementById("address");
const pincodeField = document.getElementById("pincode");

function trackAddress() {
  const fullAddress = `${addressField.value} ${pincodeField.value}`;
  if (fullAddress.trim() !== "") {
    mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed`;
  }
}

addressField.addEventListener("input", trackAddress);
pincodeField.addEventListener("input", trackAddress);

// =================== NAVIGATION MENU ===================
const menuBtn = document.getElementById('menu-btn');
const slideMenu = document.getElementById('slideMenu');
const closeMenuBtn = document.getElementById('closeMenu'); // ✅ X button

// Overlay
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// Toggle menu open/close
menuBtn.addEventListener('click', () => {
  const isActive = menuBtn.classList.toggle('active');
  slideMenu.classList.toggle('show', isActive);
  overlay.classList.toggle('show', isActive);
  menuBtn.setAttribute("aria-expanded", isActive);
});

// Close with X button
closeMenuBtn.addEventListener('click', () => {
  slideMenu.classList.remove('show');
  menuBtn.classList.remove('active');
  overlay.classList.remove('show');
  menuBtn.setAttribute("aria-expanded", "false");
});

// Overlay click closes menu
overlay.addEventListener('click', () => {
  slideMenu.classList.remove('show');
  menuBtn.classList.remove('active');
  overlay.classList.remove('show');
  menuBtn.setAttribute("aria-expanded", "false");
});

// Dropdown toggle
function toggleDropdown(element) {
  element.classList.toggle('active');
  document.querySelectorAll('.slide-menu .dropdown').forEach(other => {
    if (other !== element) other.classList.remove('active');
  });
}

// Close dropdowns when clicking outside
document.addEventListener('click', (event) => {
  const isInsideDropdown = event.target.closest('.dropdown');
  if (!isInsideDropdown) {
    document.querySelectorAll('.slide-menu .dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
});

// =================== SEARCH REDIRECTS ===================
document.getElementById("openSearch").addEventListener("click", () => {
  window.location.href = "search.html";
});

document.getElementById("openSearchMobile").addEventListener("click", () => {
  window.location.href = "search.html";
  slideMenu.classList.remove('show');
  menuBtn.classList.remove('active');
  overlay.classList.remove('show');
  menuBtn.setAttribute("aria-expanded", "false");
});
