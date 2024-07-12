const accordionButtons = document.querySelectorAll('.accordion-button');

accordionButtons.forEach(button => {
  button.addEventListener('mouseover', () => {
    button.click(); // Trigger the click event to expand
  });

  button.addEventListener('mouseout', () => {
    // You can decide if you want it to collapse on mouseout or stay open
    // button.click(); // Uncomment this to collapse on mouseout
  });
});

function openFullscreen() {
  const img = document.getElementById("myImg"); // Get the img element by ID
  if (img.requestFullscreen) {
      img.requestFullscreen();
  } else if (img.webkitRequestFullscreen) { /* Safari */
      img.webkitRequestFullscreen();
  } else if (img.msRequestFullscreen) { /* IE11 */
      img.msRequestFullscreen();
  }
}

const dropdownItems = document.querySelectorAll('.dropdown-item');

  // Get modal title and button
  const modalTitle = document.getElementById('modalTitle');
  const actionBtn = document.getElementById('actionBtn');

  // Add event listeners to each dropdown item
  dropdownItems.forEach(item => {
      item.addEventListener('click', function () {
          const action = this.getAttribute('data-action');
          updateModalContent(action);
      });
  });