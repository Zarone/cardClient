let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');

const divider = document.getElementById('divider')
const collection = document.getElementById('collection')

let w = 745;
let h = 1040;

function newCard (src, x, y){
  let img = new Image();
  img.onload = () => {
    ctx.drawImage(img, x*w, y*h, w, h);
  }
  img.src = src;
}

function useCards(cards){
  divider.remove();
  collection.remove();
  deckDiv.remove();
  canvas.style.display = 'block'
  for (let i = 0; i < cards.length; i++){
    newCard(cards[i].src, i % 10, Math.floor(i / 10))
  }
}