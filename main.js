import { animalsInfo } from "./Scripts/data.js";

let currentAnimal = animalsInfo;
const nav = document.querySelector('.js-nav');
const main = document.querySelector('.js-main');
const all = document.querySelector('.js-all');
let input = document.querySelector('.js-input');
all.classList.add('active');

let index = 0;

animalsInfo.forEach((animal) => {
  const image = new Image();
  image.src = animal.img;
});

document.querySelector('.js-dark').addEventListener('click', () => {
  console.log('click')
  document.body.classList.toggle('dark');
});

document.querySelector('.js-search').addEventListener('click', () => {
  searchAnimal()
});

document.querySelector('.js-input').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    searchAnimal()
  }
});



nav.addEventListener('click', (e) => {

  const clicked = e.target.closest('.js-all, .js-mammals, .js-birds, .js-reptiles, .js-amphibians, .js-fishes, .js-invertebrates');

  if (!clicked) return;

  document.querySelectorAll('div').forEach((div) => {
    div.classList.remove('active');
    });

  clicked.classList.add('active');

  if (clicked.closest('.js-all')) {
    currentAnimal = animalsInfo;
    generateHtml(currentAnimal)
    
  } else if (clicked.closest('.js-mammals')) {
    currentAnimal = animalsInfo.filter(info => info.type === 'mammal');
    index = 0;
    generateHtml(currentAnimal)
    
  } else if (clicked.closest('.js-birds')) {
    currentAnimal = animalsInfo.filter(info => info.type === 'bird');
    index = 0;
    generateHtml(currentAnimal)
    
  } else if (clicked.closest('.js-reptiles')) {
    currentAnimal = animalsInfo.filter(info => info.type === 'reptile');
    index = 0;
    generateHtml(currentAnimal)
    
  } else if (clicked.closest('.js-amphibians')) {
    currentAnimal = animalsInfo.filter(info => info.type === 'amphibian');
    index = 0;
    generateHtml(currentAnimal)
    
  } else if (clicked.closest('.js-fishes')) {
    currentAnimal = animalsInfo.filter(info => info.type === 'fish');
    index = 0;
    generateHtml(currentAnimal)
   
  } else if (clicked.closest('.js-invertebrates')) {
    currentAnimal = animalsInfo.filter(info => info.type === 'invertebrate');
    index = 0;
    generateHtml(currentAnimal)
    
  }

});

main.addEventListener('click', (e) => {
 const clicked = e.target;

 if (clicked.closest('.js-left')) {
    //const last = animalsInfo.pop();
    //animalsInfo.unshift(last);
    index = (index - 1 + currentAnimal.length) % currentAnimal.length;
    const main = document.querySelector('.js-main');
    main.classList.add('slide-left');
    
    setTimeout(() => {
      generateHtml(currentAnimal)
      main.classList.remove('slide-left');
    },300)
    

  
  } else if (clicked.closest('.js-right')) {
    //const first = animalsInfo.shift();
    //animalsInfo.push(first);
    index = (index + 1) % currentAnimal.length;
    const main = document.querySelector('.js-main');
    main.classList.add('slide-right')
    
    setTimeout(() => {
      generateHtml(currentAnimal)
      main.classList.remove('slide-right')
    },300)
    
  }  else if (clicked.closest('.js-random')) {
    //const first = animalsInfo.shift();
    //animalsInfo.push(first);
      index = (Math.floor(Math.random() * currentAnimal.length));
      console.log(index)

      const main = document.querySelector('.js-main');
      main.classList.add('slide-right')
   
    setTimeout(() => {
      generateHtml(currentAnimal)
      main.classList.remove('slide-right')
    },300)
    
  }
 
});

function searchAnimal() {
  let inputValue = input.value.trim().toLowerCase();
  const matchingAnimal = currentAnimal.filter(animal => {
    return animal.name.toLowerCase().includes(inputValue);
  });

  
  if (!input) return

  input.value = "";

  if (matchingAnimal.length === 0) {
    alert('Animal not found from the current family or invalid animal name');
    generateHtml(currentAnimal)
  } else {
    index = 0;
    generateHtml(matchingAnimal)
  }

}

function generateHtml (info) {

  let html = "";

  html += `
     <div class="name">${info[index].name}</div>
        <div class="about">
         ${info[index].about}
        </div>

      <button class="left js-left">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M7.28 7.72a.75.75 0 0 1 0 1.06l-2.47 2.47H21a.75.75 0 0 1 0 1.5H4.81l2.47 2.47a.75.75 0 1 1-1.06 1.06l-3.75-3.75a.75.75 0 0 1 0-1.06l3.75-3.75a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
            </svg>
        </button>

        <button class="right js-right">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
              <path fill-rule="evenodd" d="M16.72 7.72a.75.75 0 0 1 1.06 0l3.75 3.75a.75.75 0 0 1 0 1.06l-3.75 3.75a.75.75 0 1 1-1.06-1.06l2.47-2.47H3a.75.75 0 0 1 0-1.5h16.19l-2.47-2.47a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
            </svg>
        </button>

        <button class="random-btn js-random">
          Random Animal
        </button>
       
       `;

  document.querySelector('.js-main').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${info[index % info.length].img})`;

  document.querySelector('.js-main').innerHTML = html;

}


generateHtml(currentAnimal)