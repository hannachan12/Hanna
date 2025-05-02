// menu toggle
function MenuToggle() {
	let menuToggle = document.querySelector(".menu-toggle");
	let navbarScreen = document.querySelector(".navbar-screen");
	let navbarBlock = document.querySelector(".navbar-block");
	
	// Klik pada menu
	function AddClassMenu() {
		document.body.classList.add("hidden");
		navbarScreen.classList.add("show");
		navbarBlock.classList.add("show");
	}
	
	// klik pada navbarscreen
	function RemoveClassMenu() {
		document.body.classList.remove("hidden");
		navbarScreen.classList.remove("show");
		navbarBlock.classList.remove("show");
	}
	
	menuToggle.addEventListener("click", AddClassMenu);
	navbarScreen.addEventListener("click", RemoveClassMenu);
	
	// hapus kelas saat navbar item diklik
	let navbarItemText = document.querySelectorAll(".navbar-item-text");
	for (let i = 0; i < navbarItemText.length; i++) {
		navbarItemText[i].addEventListener("click", function() {
			RemoveClassMenu();
			
			// auto scroll
		});
	}
	
} MenuToggle();