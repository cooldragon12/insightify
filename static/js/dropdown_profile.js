document.addEventListener('DOMContentLoaded', () => {
  const dropdownButton = document.querySelector('.dropdown_button');
  const dropdownContent = document.querySelector('.dropdown_content');
  const profileImage = dropdownButton.querySelector('img'); // Get the profile image

  dropdownButton.addEventListener('click', () => {
      dropdownContent.classList.toggle('show');
  });

  // Close the dropdown if the user clicks outside of it
  window.addEventListener('click', (event) => {
      if (!dropdownButton.contains(event.target)) {
          dropdownContent.classList.remove('show');
          profileImage.style.transform = 'rotate(0deg)'; // Reset image rotation
      }
  });
});
