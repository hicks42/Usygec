const addFormToCollection = (e) => {
  const collectionHolder = document.querySelector('.' + e.currentTarget.dataset.collectionHolderClass);
  const item = document.createElement('li');
  item.className = `bg-light rounded overflow-hidden p-2`;
  item.innerHTML = collectionHolder.dataset.prototype.replace(/__name__/g, collectionHolder.dataset.index);
  collectionHolder.appendChild(item);
  collectionHolder.dataset.index ++;
  addFormDeleteLink(item);
};

const addFormDeleteLink = (item) => {
  const removeFormButton = document.createElement('button');
  removeFormButton.innerText = 'Supprimer X';
  removeFormButton.className = `btn btn-danger w-3 mt-2 btn-sm`;

  item.append(removeFormButton);

  removeFormButton.addEventListener('click', (e) => {
      e.preventDefault();
      // remove the li for the structure form
      item.remove();
  });
};

// document.querySelectorAll('div.etbl > fieldset').forEach(field => {
//   field.className = `bg-light rounded overflow-hidden my-3 p-2`;
// });

document.querySelectorAll('div.etbl-card').forEach((group) => {
  addFormDeleteLink(group);
});

document.querySelectorAll('ul.structures li')
  .forEach((structure) => {
      addFormDeleteLink(structure);
});

document.querySelectorAll('.add_item_link').forEach(btn => {
  btn.addEventListener("click", addFormToCollection);
});

// document.querySelectorAll('[id^="user_structures"]').forEach((group) => {
//   addFormDeleteLink(group);
// });
