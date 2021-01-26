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

let arrsFavorites = [];

//Menu Options
let goToFavorites = document.querySelector('.profile-fav');

//Columns
let columnOne = document.querySelector('.column-one');
let columnTwo = document.querySelector('.column-two');
let columnThree = document.querySelector('.column-three');

//Events
hamburguerMenu.addEventListener('click',openMenu);
profileShowBreeds.addEventListener('click',showBreedsList);
backMenu.addEventListener('click',closeBreedList);
goToFavorites.addEventListener('click',goToFavoritesPage);



//Functions



function goToFavoritesPage(){
  openMenu();
  deleteOldPictures();
  let favorites = JSON.parse(localStorage.getItem('Favs'));
  appendingPictures(favorites, true);
}


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

function openPhoto(e){
  alert(e.target.src)
}


function addFavorites(src){
  if(localStorage.getItem('Favs') == null ){
    arrsFavorites = arrsFavorites;
  }else{
    arrsFavorites = JSON.parse(localStorage.getItem('Favs'));
  }
  if(!arrsFavorites.includes(src)){
    alert('Agregando');
    arrsFavorites.push(src);
    localStorage.setItem('Favs',JSON.stringify(arrsFavorites));
  }else{
    alert('Ya se encuentra en tu lista de favoritos')
  }
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


function creatingTemplate(urlImage, isFavorite = false){

  //Creacion de div PADRE
  let containerImg = document.createElement('div');
  containerImg.classList.add('container-img');
  
  //Creacion de div Hijos
  
  let image = document.createElement('div');
  image.classList.add('image');
  let bottomHover = document.createElement('div');
  bottomHover.classList.add('bottom-hover');
  let iconContainer = document.createElement('div');
  iconContainer.classList.add('icon-fav-container');



  //Creacion de "complementos"
  let picture = document.createElement('img');
  picture.src = urlImage; 
  let heart = document.createElement('i');
  heart.addEventListener('click',()=>{
    addFavorites(urlImage);
  });
  heart.classList.add('fa');
  heart.classList.add('fa-heart');
  if(isFavorite == true){
    heart.classList.add('added-to-favorite');
  }

  //Insercion de los elementos
  containerImg.appendChild(image);
  image.appendChild(picture);
  containerImg.appendChild(bottomHover);
  containerImg.appendChild(iconContainer);
  iconContainer.appendChild(heart);

  //Agregando escucha a cada una de las fotos
  picture.addEventListener('click',openPhoto)
  return containerImg
}

function appendingPictures(answerPictures, isFavorite = false){
  console.log(isFavorite)
  answerPictures.forEach((src,index) => {    
    if(index <= Math.floor(answerPictures.length / 3) ){
      columnOne.appendChild(creatingTemplate(src, isFavorite));
    }else if(index > Math.floor(answerPictures.length / 3) && index <= Math.floor(answerPictures.length / 3)*2 ){
      columnTwo.appendChild(creatingTemplate(src, isFavorite));
    }else{
      columnThree.appendChild(creatingTemplate(src, isFavorite));
    }
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
  let pictures = document.querySelectorAll('.container-img');
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