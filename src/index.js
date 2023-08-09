import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import { Notify } from "notiflix";
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const divCatInfo = document.querySelector('.cat-info');

loader.classList.add('hidden');
error.classList.add('hidden');

select.addEventListener('change', handleChange);

const createCatInfo = data => {
 const catInfo = `
 <div class= "cat-image-wrap">
 <img class="cat-image" src="${data[0].url}" alt="${data[0].breeds[0].name}">
 </div>
 <div class= "cat-text-wrap">
 <h2 class="cat-breed">Breed: ${data[0].breeds[0].name} </h2>
 <p class="cat-description">Description: ${data[0].breeds[0].description} </p>
 <p class="cat-temperament"><b>Temperament:</b> ${data[0].breeds[0].temperament} </p>
 </div>`;

 divCatInfo.innerHTML = ('beforeend', catInfo);
};

function handleChange(event){
  loader.classList.replace('hidden', 'loader');
  divCatInfo.innerHTML = '';
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      loader.classList.replace('loader', 'hidden');
      createCatInfo(data);
    })
    .catch(() => {
      Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });
}

fetchBreeds()
  .then(data => {
const namesMarkupCat = data
  .map(cat => {
    return `<option value="${cat.id}">${cat.name}</option>`;
  })
  .join('');
select.insertAdjacentHTML('beforeend', namesMarkupCat);

    new SlimSelect({
      select: select,
    });
  })
  .catch(() => {
    Notify.failure(`Oops! Something went wrong! Try reloading the page!`);
  });
