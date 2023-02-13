const tools = []

function fetchTools() {
    fetch("http://localhost:3000/tools")
    .then(response => response.json())
    .then( (someData) => {
      const arrayOfToolObjects = someData
      tools.push(...arrayOfToolObjects)
    })
    .then( () => renderToolCards())
    .then( () => fillDropDown())
}

fetchTools()

function renderToolCards() {
    const toolCollectionDiv = document.querySelector("#tool-collection")
    toolCollectionDiv.innerHTML = ""

    tools.map(  
        (eachToolObject)=>{
          const divForToolCard = document.createElement("div")
            divForToolCard.className = "card"
          const h2ForToolCard = document.createElement("h2")
            h2ForToolCard.textContent = eachToolObject.name
          const imageForToolCard = document.createElement("img")
            imageForToolCard.src = eachToolObject.image
            imageForToolCard.className = "tool-avatar"
           const pTagForToolCard = document.createElement("p")
             pTagForToolCard.textContent = `${eachToolObject.availability}`
             const pTagForDescription = document.createElement("p")
             pTagForDescription.textContent = eachToolObject.useDescription
             pTagForDescription.style.display = "none"
          divForToolCard.addEventListener("mouseover", function() {
           pTagForDescription.style.display = "block"
          })
          divForToolCard.addEventListener("mouseleave", function() {
            pTagForDescription.style.display = "none"
          })
          divForToolCard.append(h2ForToolCard , imageForToolCard , pTagForToolCard, pTagForDescription)
    
          toolCollectionDiv.append(divForToolCard)
      })
}

function fillDropDown(){
    const selectDropDown = document.getElementById("selectToolMenu");
    const justAvailableNames = tools.filter(status => status.availability === "Available");
    selectDropDown.innerHTML = "";
    for (var j = 0; j < justAvailableNames.length; j++) {
      let option = document.createElement("option");
      option.text = justAvailableNames[j].name;
      option.value = justAvailableNames[j].name;
      selectDropDown.add(option);
    }
}

const selectButton = document.getElementById("reserveToolButton");
selectButton.addEventListener("click", function() {
    const selectDropDown = document.getElementById("selectToolMenu");
    const item = selectDropDown.value
    const resultObject = tools.find(obj => {
        return Object.values(obj).some(name => name === item);
      });
    alert(`You have successfully reserved a ${item}\nPlease call ${resultObject.phonenumber} to arrange a pickup and dropoff`);
   
    fetch(`http://localhost:3000/tools/${resultObject.id}`, {
    method: 'PATCH',
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      availability: 'Reserved'
  })
})
  .then(response => response.json())
  .then( () => renderToolCards())
  .then( () => fillDropDown())
  .catch(error => console.error(error))
   
  }
  
  );