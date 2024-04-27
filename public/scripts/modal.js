const openButton = document.querySelector('[data-open-modal]');
const closeButton = document.querySelector('[data-close-modal]');
const modal = document.querySelector('[data-modal]');
const overlay = document.querySelector('[data-overlay]');
// for kanban cards and update operation
const allCards = document.querySelectorAll('.kanban-card');
const modalTitle = document.getElementById('title');
const modalDescription = document.getElementById('description');
const modalKanbanStatus = document.getElementById('kanban-status');
const modalDateStart = document.getElementById('date-start');
const modalDateEnd = document.getElementById('date-end');
// for fetch API
const form = document.getElementById('modal-form');


openButton.addEventListener('click', () => {
  formMethod = 'POST';
  formId = '';
  clearFormData();
  openModal();
});

closeButton.addEventListener('click', () => {
  closeModal();
});

overlay.addEventListener('click', () => {
  closeModal();
});

// For kanban cards
allCards.forEach(card => {
  card.addEventListener('click', () => {

    formMethod = 'PUT';
    formId = card.dataset.id;

    modalTitle.value = card.dataset.title;
    modalDescription.value = card.dataset.description;
    modalKanbanStatus.value = card.dataset.kanbanstatus;
    modalDateStart.value = convertDate(card.dataset.datestart);
    modalDateEnd.value = convertDate(card.dataset.dateend);

    openModal();
  })
})

// converts date format from db to html-readable format
function convertDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

// open and close modal
function openModal() {
  modal.classList.add('open');
  overlay.classList.add('open');
}
function closeModal() {
  modal.classList.remove('open');
  overlay.classList.remove('open');
}

// clear form data
function clearFormData() {
  modalTitle.value = "";
  modalDescription.value = "";
  modalKanbanStatus.value = "";
  modalDateStart.value = "";
  modalDateEnd.value = "";
}


// fetch API form submission
let formMethod = '';
let formId = '';

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  try {
    await fetch(`/${formId}`, {
      method: formMethod,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: modalTitle.value,
        description: modalDescription.value,
        kanbanStatus: modalKanbanStatus.value,
        dateStart: modalDateStart.value,
        dateEnd: modalDateEnd.value
      })
    });

    window.location.reload();

  } catch (error) {
    console.error('Error submitting form data:', error.message);
  }
});