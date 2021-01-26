search.addEventListener('submit', async e=>{
  e.preventDefault();
  preload = [];

  loadingImage = imageDiv.childNodes[1].cloneNode();
  imageDiv.innerHTML = '';
  let images;
  try {
    images = await getImages(searchBox.value);
    if (images.length > 0){
      let loadCounter = 20;
      let i;
      for (i = 0; i < loadCounter; i++){
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
        imageDiv.appendChild(loadingImage)
        loadingImage.hidden = false;
        if(!isInViewport(loadingImage)){
          break;
        }
      }
      if (i < images.length){
        for (i; i < images.length; i++){
          preload.push(images[i])
        }
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
  
  // loadingImage.hidden = true;
})

imageDiv.addEventListener('scroll', ()=>{
  if (preload.length > 0 && isInViewport(loadingImage)){
    loadingImage.hidden = false;
    let i;
    for (i = 0; i < preload.length && preload.length > 0; i++){
      let img = document.createElement('IMG');
        
      if (preload[0]['URL'] == 'https://drive.google.com/uc?export=view&id=' || preload[0]['URL'] == ''){
        img.src = "./editor/images/Background-01.jpg"
      } else {
        img.src = preload[0]['URL'];
      }

      img.alt = preload[0]['Name']
      img.id = preload[0]['Level']
      img.classList.add('cardImage')
      img.addEventListener('click', ()=>{
        deck.push({src: img.src, type: img.alt})
        renderDeck()
      })
      imageDiv.appendChild(img);
      preload.shift()
      imageDiv.appendChild(loadingImage)
      loadingImage.hidden=false;
      if (!isInViewport(loadingImage)){
        break;
      }
    }
    loadingImage.hidden = true;
  }
})