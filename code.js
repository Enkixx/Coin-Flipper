function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function startPage(){
  document.body.innerHTML = ""

  const header = document.createElement("h1")
  const stringButton = document.createElement("button")
  const imageButton = document.createElement("button")

  header.textContent = "Coin Flipper"
  document.body.append(header)

  document.body.append(coin.toHTML())

  stringButton.textContent = "String Version"
  stringButton.addEventListener("click", display20Flips)
  document.body.append(stringButton)

  imageButton.textContent = "Image Version"
  imageButton.addEventListener("click", display20Images)
  document.body.append(imageButton)
}

function resetButton(){
  reset = document.createElement("button")

  reset.textContent = "Reset?"
  reset.addEventListener("click", startPage)
  document.body.append(reset)
}

const coin = {
  state: 0,
  flip: function () {
    // 1. Randomly set your coin object's "state" property to be either
    //    0 or 1: use "this.state" to access the "state" property on this object.
    return this.state = getRandomNumber(0, 1)
  },
  toString: function () {
    // 2. Return the string "Heads" or "Tails", depending on whether
    //    "this.state" is 0 or 1.
    let coinString = ""
    if (this.state === 0) {
      coinString = "Tails"
    } else if (this.state === 1){
      coinString = "Heads"
    }
    return coinString
  },
  toHTML: function () {
    const image = document.createElement("img");
    // 3. Set the properties of this image element to show either face-up
    //    or face-down, depending on whether this.state is 0 or 1.
    //    You can use the heads and tails images inside of the "images" folder
    if (this.state === 0) {
      image.src = "/images/tails.png"
    } else if (this.state === 1){
      image.src = "/images/heads.png"
    }
    image.addEventListener("load", function(){
      image.classList.add("flip")
    })
    return image;
  },
};

function display20Flips() {
  const results = [];
  // 4. Use a loop to flip the coin 20 times, each time displaying the result of the flip as a string on the page.  After your loop completes, return an array with the result of each flip.
  document.body.textContent = ""

  const h2Element = document.createElement("h2")
  h2Element.textContent = "Results"

  const articleElement = document.createElement("article")
  document.body.append(articleElement)

  function oneFlip(i){
    coin.flip()
    articleElement.textContent = `${i + 1} ${coin.toString()}`
    results.push(coin.toString())
  }

  const limit = 20
  
  for (let i = 0; i <= limit; i++) {
    setTimeout(function(){
      if (i === 20) {
        document.body.append(h2Element)
        resetButton()
        document.body.append(articleElement)
        return articleElement.textContent = results.join(", ")
      }
      oneFlip(i)
    }, 1500 * i)
  }

  // articleElement.textContent = results.join(", ")
}

function display20Images() {
  const results = [];
  // 5. Use a loop to flip the coin 20 times, and display the results of each flip as an image on the page.  After your loop completes, return an array with result of each flip.
  document.body.textContent = ""

  const h2Element = document.createElement("h2")
  h2Element.textContent = "Results"

  const articleElement = document.createElement("article")
  document.body.append(articleElement)
  
  function oneFlip(){
    articleElement.innerHTML = ""
    coin.flip()
    articleElement.append(coin.toHTML())
    results.push(coin.toHTML())
  }

  const limit = 20

  for (let i = 0; i <= limit; i++) {
    setTimeout(function(){
      if (i === 20) {
        articleElement.innerHTML = ""
        document.body.append(h2Element)
        resetButton()
        document.body.append(articleElement)
        return results.forEach(image => {
          articleElement.append(image)
        });
      }
      oneFlip()
    }, 1500 * i)
  }
}

startPage()