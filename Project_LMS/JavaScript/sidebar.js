function showSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.style.display = 'block';
}


// Close sidebar when clicking outside (on the document)
document.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    const sidebar = document.getElementById('sidebar');
    const menu = document.querySelector(".menu");
    
    // Close sidebar if clicked outside of sidebar or menu
    if (!sidebar.contains(e.target) && !menu.contains(e.target)) {
      sidebar.style.display = "none"; // Close sidebar if clicked outside
    }
  }
});

