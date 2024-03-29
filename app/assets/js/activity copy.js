// Variables
const container = document.querySelector(".activity-container");
const activityList = document.querySelector(".activity-list");

// Add Collection
const addActivityToCollection = (e) => {
  const collectionHolder = document.querySelector('.' + e.currentTarget.dataset.collectionHolderClass);
  const item = document.createElement('div');
  item.className = `new-activity-card rounded overflow-hidden p-2 mt-3`;
  item.innerHTML = collectionHolder.dataset.prototype.replace(/__name__/g, collectionHolder.dataset.index);
  collectionHolder.appendChild(item);
  collectionHolder.dataset.index++;
  addFormDeleteLink(item);
  item.scrollIntoView({ behavior: 'smooth' });
};


////////////////// New Activity bloc //////////////////////////////////
const addFormDeleteLink = (newItem) => {
  const removeFormButton = document.createElement('button');
  removeFormButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  removeFormButton.className = `btn btn-warning fs-6 px-2 my-2 btn-sm`;

  // newItem.appendChild(removeFormButton);
  // newItem.insertAdjacentElement('afterend', removeFormButton);

  const newActiveInput = newItem.querySelector('.new-active');
  newActiveInput.insertAdjacentElement('afterend', removeFormButton);

  removeFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    newItem.remove();
  });
};

document.querySelectorAll('div.new-info').forEach((newItem) => {
  addFormDeleteLink(newItem);
});

////////////////// Existing Activity bloc //////////////////////////////////
const addGroupDeleteLink = (item) => {
  const removeFormButton = document.createElement('button');
  removeFormButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  removeFormButton.className = `btn btn-danger w-3 btn-sm`;

  item.append(removeFormButton);

  removeFormButton.addEventListener('click', (e) => {
    e.preventDefault();
    // remove the li for the activiry form
    item.parentNode.remove();
  });
};

document.querySelectorAll('div.activity-info').forEach((group) => {
  // const parent = group.parentNode;
  addGroupDeleteLink(group);
});

////////////////// Filtering Activity bloc //////////////////////////////////
// Attachez un écouteur d'événement au bouton de filtrage
const filterButton = document.getElementById('filter-button');
filterButton.addEventListener('click', filterActivities);

// Fonction de filtrage des activités
function filterActivities() {
  // Select all activities
  const activities = document.querySelectorAll('.activity-card');

  // Check if the filter button is in "Show Inactive" state
  const isShowInactive = filterButton.classList.contains('show-inactive');

  // Loop through the activities and hide/show inactive activities based on the filter state
  activities.forEach((activity) => {
    const isActiveInput = activity.querySelector('input[name$="[isActive]"]');
    const isInactive = isActiveInput && !isActiveInput.checked;

    if (isShowInactive && isInactive) {
      activity.style.display = 'block';
    } else if (!isShowInactive && isInactive) {
      activity.style.display = 'none';
    } else {
      activity.style.display = 'block';
    }
  });

  // Toggle the filter button text and class based on the new state
  if (isShowInactive) {
    filterButton.textContent = 'Cacher';
    filterButton.classList.remove('show-inactive');
  } else {
    filterButton.textContent = 'Voir';
    filterButton.classList.add('show-inactive');
  }
}

////////////////// Ghosting inactiv bloc //////////////////////////////////
function handleIsActiveChange(event) {
  const isActiveInput = event.target;
  const activityCard = isActiveInput.closest('.activity-card');

  if (!isActiveInput.checked) {
    activityCard.classList.add('inactive');
  } else {
    activityCard.classList.remove('inactive');
  }
}

////// classe "inactive" au chargement de la page ////////////////////////
window.addEventListener('DOMContentLoaded', () => {
  const activities = document.querySelectorAll('.activity-card');

  activities.forEach((activity) => {
    const isActiveInput = activity.querySelector('input[name$="[isActive]"]');
    const isInactive = isActiveInput && !isActiveInput.checked;

    if (isInactive) {
      activity.classList.add('inactive');
    }
  });
});

// Attach event listeners to each isActive input

const isActiveInputs = document.querySelectorAll('input[name$="[isActive]"]');
isActiveInputs.forEach((isActiveInput) => {
  isActiveInput.addEventListener('change', handleIsActiveChange);
});

document.querySelectorAll('.add-activity-btn').forEach(btn => {
  btn.addEventListener("click", addActivityToCollection);
});

////////////////////// recherche ////////////////////////
function searchActivities() {
  const searchInput = document.getElementById('activity-search-form');
  const searchTerm = searchInput.value.toLowerCase();
  console.log(searchInput.value);

  const activities = document.querySelectorAll('.activity-card');
  activities.forEach((activity) => {
    const descriptionElement = activity.querySelector('textarea[name$="[description]"]');

    if (descriptionElement && descriptionElement.textContent) {
      const description = descriptionElement.textContent.toLowerCase();

      if (description.includes(searchTerm)) {
        activity.style.display = 'block';
      } else {
        activity.style.display = 'none';
      }
    }
  });
}

const activitySearchForm = document.getElementById('activity-search-form');
activitySearchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  searchActivities();
});

window.searchActivities = searchActivities;
