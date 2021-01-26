form.addEventListener('submit', async (e) => {
  e.preventDefault();

  imageDiv.innerHTML = '';
  loading.hidden = false;
  let images;
  try {
    images = await getImages(searchBox.value);
    if (images.length > 0){
      let i = 0;
      while (i < images.length){
        let img = document.createElement('IMG');
        
        if (images[i]['URL'] == 'https://drive.google.com/uc?export=view&id=' || images[i]['URL'] == ''){
          img.src = "./editor/images/Background-01.jpg"
        } else {
          img.src = images[i]['URL'];
        }

        img.alt = images[i]['Name']
        img.id = images[i]['Level']
        img.classList.add('cardImage')
        img.addEventListener('click', ()=>{
          newCard = false;
          editCard(img.src, img.alt, img.id);
        })
        imageDiv.appendChild(img);
        i++;
        if (!isInViewport(loadingImage)){
          break;
        }
      }
      if (i < images.length){
        for (let j = i; j < images.length; j++){
          preload.push(images[j])
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

  loading.hidden = true;
})

saveEdit.addEventListener('click', async ()=>{
  let validate = await fetch(fetchURL+'validation', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({key: valKey.value.toString()})
  })
  validate = await validate.json()
  if (validate['Correct'] == true){
    imageDiv.innerHTML = '';
    console.log('unhide')
    loading.hidden = false;
    if (newCard == false){
      let newObject = {
        Name: dataPoints.name.value,
        Type: dataPoints.type.value,
        SubType: dataPoints.subtype.value,
        Cost: dataPoints.cost.value,
        Power: dataPoints.power.value,
        PowerType: dataPoints.powerType.value,
        Level: dataPoints.level.value,
        Health: dataPoints.level.value,
        EffectType: dataPoints.effectType.value,
        Effect: dataPoints.cardEffect.value,
        URL: dataPoints.url.value
      }

      
      await fetch(fetchURL, {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newObject)
      })

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

            img.alt = images[i]['Name']
            img.id = images[i]['Level']
            img.classList.add('cardImage')
            img.addEventListener('click', ()=>{
              newCard = false;
              editCard(img.src, img.alt, img.id);
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
    } else { // if newCard is true, this section uses POST
      let response;
      try{
        response = await fetch(fetchURL, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            Name: dataPoints["name"].value.toString(),
            Type: dataPoints["type"].value.toString(),
            SubType: dataPoints["subtype"].value.toString(),
            Cost: dataPoints["cost"].value.toString(),
            Power: dataPoints["power"].value.toString(),
            PowerType: dataPoints["powerType"].value.toString(),
            Level: dataPoints["level"].value.toString(),
            Health: dataPoints['health'].value.toString(),
            EffectType: dataPoints["effectType"].value.toString(),
            Effect: dataPoints["cardEffect"].value.toString(),
            URL: dataPoints["url"].value.toString()
          })
        })    
        response = await response.json();
        console.log(response)
        if (response == false){
          let p = document.createElement('P');
          p.innerText = 'That card already exists';
          imageDiv.appendChild(p);
        }
      
      } catch (err){
        console.error(err);
      }

    }

    loading.hidden = true;
    hide()
  }
})

createCard.addEventListener('click', async(e)=>{
  e.preventDefault();
  show();
  selectedCardImage.src = "./editor/images/Background-01.jpg"
  newCard = true;
  
  dataPoints.name.value = '';
  dataPoints.type.value = '';
  dataPoints.subtype.value = '';
  dataPoints.cost.value = 0;
  dataPoints.power.value = 0;
  dataPoints.powerType.value = '';
  dataPoints.level.value = 0;
  dataPoints.effectType.value = '';
  dataPoints.cardEffect.value = '';
  dataPoints.url.value = 'https://drive.google.com/uc?export=view&id=';
  dataPoints.health.value = '';

})

document.addEventListener("scroll", ()=>{
  if (preload.length > 0 && isInViewport(loadingImage) && loading.hidden == true){
    loading.hidden = false;
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
        newCard = false;
        editCard(img.src, img.alt, img.id);
      })
      imageDiv.appendChild(img);
      preload.shift()
      if (!isInViewport(loadingImage)){
        break;
      }
    }
    loading.hidden = true;
  }
})

