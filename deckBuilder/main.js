let deck = [];

const search = document.getElementById('form')
const fetchURL = 'https://agile-eyrie-40238.herokuapp.com/';
const imageDiv = document.getElementById('imageDiv');
const loading = document.getElementById('loadingImage')
const searchBox = document.getElementById('mainSearch')

const deckDiv = document.getElementById('deckContainer')
const cardsDiv = {
  Action: document.getElementById('actions'),
  Character: document.getElementById('characters'),
  Event: document.getElementById('events')
}

async function getImages(target) {
  let cards;
  if (target == ''){
    cards = await fetch(fetchURL, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else if (target.toString().indexOf('/') == -1){
    cards = await fetch(fetchURL+target.toString(), {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  return cards.json();
}

function renderDeck(){
  deck = deck.sort((a, b)=>{
    if (a.src < b.src){
      return -1;
    } else {
      return 1
    }
  });
  cardsDiv['Action'].innerHTML = ''
  cardsDiv['Character'].innerHTML = ''
  cardsDiv['Event'].innerHTML = ''
  deck.forEach(card=>{
    let img = document.createElement('IMG');
    img.src = card.src;
    img.alt = card.type;
    img.addEventListener('click', ()=>{
      // deck.forEach(e=>{
      //   if (e.type == img.alt){

      //   }
      // })
      let index = deck.map(function(e) { return e.src; }).indexOf(img.src);
      if (index == -1) console.error('index not found')
      deck.splice(index, 1)
      renderDeck();
    })
    cardsDiv[card.type].appendChild(img);
  })
}