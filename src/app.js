//Variables
let hamburguerMenu = document.querySelector('.hamburguer-menu');
let lineOne = document.querySelector('.line-one');
let lineTwo = document.querySelector('.line-two');
let lineThree = document.querySelector('.line-three');
let fullMenu = document.querySelector('.profile');
let containerPictures = document.querySelector('.container-photos');
let profileShowBreeds = document.querySelector('.profile-show-breeds');
let breedsList = document.querySelector('.breeds-list');
let backMenu = document.querySelector('.back-menu');
let actualBreed = document.querySelector('.breed-text');
let pictureBreed = document.querySelector('.picture-breed');


//Events
hamburguerMenu.addEventListener('click',openMenu);
profileShowBreeds.addEventListener('click',showBreedsList);
backMenu.addEventListener('click',closeBreedList);

//Functions

function setActualBreed(breed,urlImageBreed){
  actualBreed.innerText = breed;
  pictureBreed.src = urlImageBreed;
}

function showBreedsList(){
  breedsList.classList.toggle('show-breeds-list');
  breedsList.classList.toggle('hide-breeds-list');
}

function closeBreedList(){
  breedsList.classList.toggle('hide-breeds-list');
}

function openMenu(){
  lineOne.classList.toggle('line-one-opened');
  lineTwo.classList.toggle('line-two-opened');
  lineThree.classList.toggle('line-three-opened');
  fullMenu.classList.toggle('show-full-menu');
}


//Call to API
async function fetchData(url){
    const answer = await fetch(url);
    const data = await answer.json();
     return data.message;
}

async function getBreeds(url){
  let breeds = await fetch(url);
  let data = await breeds.json();
  let arrBreeds = Object.keys(data.message);
  return arrBreeds;
}

async function gettingForSpecificBreed(e){
  let answer = await fetchData(`https://dog.ceo/api/breed/${e.target.innerText}/images`);
  setActualBreed(e.target.innerText,answer[0]);
  openMenu();
  showBreedsList();
  deleteOldPictures();
  appendingPictures(answer);
}


function creatingTemplate(urlImage){
  let photoDiv = document.createElement('div');
  photoDiv.classList.add('photos');
  let picture = document.createElement('img');
  picture.src = urlImage; 
  photoDiv.appendChild(picture);
  return photoDiv
}

function appendingPictures(answerPictures){
  answerPictures.forEach(src => {
    containerPictures.appendChild(creatingTemplate(src));
   });  
}




function creatingListTemplate(breed){
  let li = document.createElement('li');
  li.innerText = breed;
  li.addEventListener('click',gettingForSpecificBreed)
  return li;
}


function appendingBreedsName(answerBreeds){
  answerBreeds.forEach(breedString => {
    breedsList.appendChild(creatingListTemplate(breedString));
   }); 
}


function deleteOldPictures(){
  let pictures = document.querySelectorAll('.photos');
  for(let picture of pictures){
    picture.remove()
  }
}


async function startService(){
  let answerPictures = await fetchData('https://dog.ceo/api/breed/chihuahua/images');
  let answerBreeds = await getBreeds('https://dog.ceo/api/breeds/list/all');
  
  appendingBreedsName(answerBreeds);
  appendingPictures(answerPictures);

}


startService();