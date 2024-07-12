function loadSidebar() {
    fetch('./components/sidebar.html')
      .then(response => response.text())
      .then(data => {
        const sidebarContainer = document.getElementById('sidebar-container');
        sidebarContainer.innerHTML = data; 
  
        // After loading, set up the click event:
        const sidebar = document.getElementById('mySidebar');  // Use the ID
        const menuBtn = document.getElementById('menu_btn');
        const backBtn = document.getElementById('back_btn');
  
        menuBtn.addEventListener('click', function() {
          sidebar.classList.toggle('active');
        });
        backBtn.addEventListener('click', function() {
          sidebar.classList.toggle('active');
        });
      });
  }