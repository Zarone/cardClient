search.addEventListener('submit', async e=>{
  e.preventDefault();

  imageDiv.innerHTML = '';
  loading.hidden = false;
  let images;
  try {
    images = await getImages(searchBox.value);
    if (images.length > 0){
      let loadCounter = images.length;
      for (let i = 0; i < loadCounter; i++){
        let img = document.createElement('IMG');
        
        if (images[i]['URL'] == 'https://drive.google.com/uc?export=view&id=' || images[i]['URL'] == ''){
          img.src = "./editor/images/Background-01.jpg"
        } else {
          img.src = images[i]['URL'];
        }

        img.alt = images[i]['Type']
        img.classList.add('cardImage')
        img.addEventListener('click', ()=>{
          deck.push({src: img.src, type: img.alt})
          renderDeck()
        })
        imageDiv.appendChild(img);
      }
    } else {
      let p = document.createElement('P');
      p.innerText = 'No Search Results Found';
      imageDiv.appendChild(p);
    }
  } catch (err){
    let p = document.createElement('P');
    p.innerText = err;
    imageDiv.appendChild(p);
  }
  
  loading.hidden = true;
})