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
