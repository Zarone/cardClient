const options = JSON.stringify({
  Type: 'Character', 
  // possible: Action, Event, Character
  SubType: 'Special Character', 
  //possible: Action: Location - Unity, Location, Perpetual - Unity, Perpetual, Action - Unity, Action
  //possible: Event: Normal, Climax
  //possible: Character: Special Character - Unleashed, Special Character, Basic Character
  Cost: 10,
  Effect: '',
  EffectType: 'Activate',
  Level: 3,
  Name: 'The Architect',
  URL: 'C:/Users/Zachary Alfano/Desktop/Games/Guardians/Cards/The Architect Level 3-01.jpg',
  Power: "8",
  PowerType: "Aether"
})

const form = document.getElementById('searchContainer');
const searchBox = document.getElementById('searchBox');
const loading = document.getElementById('loading');
const imageDiv = document.getElementById('imageDiv');
const editBack = document.getElementById('editBack');
const editMenu = document.getElementById('editMenu');
const selectedCardImage = document.getElementById('selectedCardImage');
const saveEdit = document.getElementById('saveEdit');
const createCard = document.getElementById('createCard')

const dataPoints = {
  name: document.getElementById('simpleMenu0'),
  type: document.getElementById('simpleMenu1'),
  subtype: document.getElementById('simpleMenu2'),
  cost: document.getElementById('simpleMenu3'),
  power: document.getElementById('simpleMenu4'),
  powerType: document.getElementById('simpleMenu5'),
  level: document.getElementById('simpleMenu6'),
  effectType: document.getElementById('effectType'),
  cardEffect: document.getElementById('effectText'),
  url: document.getElementById('urlSelect')
}

let newCard;
// const fetchURL = 'http://localhost:3000/'
const fetchURL = 'https://agile-eyrie-40238.herokuapp.com/'

function hide(){
  editBack.hidden = true;
  editMenu.hidden = true;
}

function show(){
  editBack.hidden = false;
  editMenu.hidden = false;
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

async function editCard(id, name) {
  editBack.hidden = false;
  editMenu.hidden = false;
  selectedCardImage.src = id;
  
  let cardInfo;
  try {
    cardInfo = await fetch(fetchURL + "Name/"+name, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (err) {
    console.log(err)
  }
  cardInfo = await cardInfo.json();

  dataPoints.name.value = cardInfo[0]['Name'];
  dataPoints.type.value = cardInfo[0]['Type'];
  dataPoints.subtype.value = cardInfo[0]['SubType'];
  dataPoints.cost.value = cardInfo[0]['Cost'];
  dataPoints.power.value = cardInfo[0]['Power'];
  dataPoints.powerType.value = cardInfo[0]['PowerType'];
  dataPoints.level.value = cardInfo[0]['Level'];
  dataPoints.effectType.value = cardInfo[0]['EffectType'];
  dataPoints.cardEffect.value = cardInfo[0]['Effect'];
  dataPoints.url.value = cardInfo[0]['URL'];

}