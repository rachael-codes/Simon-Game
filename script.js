// Creating initial references

const countValue = document.getElementById("count");
const colorPart = document.querySelectorAll(".color-part");
const container = document.querySelector(".container");
const startButton = document.querySelector("#start");
const result = document.querySelector("#result");
const wrapper = document.querySelector(".wrapper");

// creating an object to map current colors to new colors

const colors = {
  color1: {
    current: "#068e06", 
    new: "#11e711",
  },
  color2: {
    current: "#950303", 
    new: "#fd2a2a",
  },
  color3: {
    current: "#01018a", 
    new: "#2062fc",
  },
  color4: {
    current: "#919102", 
    new: "#fafa18",
  },
}

let randomColors = [];
let pathGeneratorBool = false;
let count,
  clickCount = 0;

// Creating function to start game

startButton.addEventListener("click", () => {
  count = 0;
  clickCount = 0;
  randomColors = [];
  pathGeneratorBool = false;
  wrapper.classList.remove("hide");
  container.classList.add("hide")
  pathGenerate();
})

// Creating function to decide the sequence

const pathGenerate = () => {
  randomColors.push(generateRandomValue(colors));
  count = randomColors.length;
  pathGeneratorBool = true;
  pathDecide(count);
}

// Creating function to get a random value from object

const generateRandomValue = (obj) => {
  let arr = Object.keys(obj);
  return arr[Math.floor(Math.random() * arr.length)];
};

// Creating function to play the sequence

const pathDecide = async (count) => {
  countValue.innerText = count;
  for(let i of randomColors){
    let currentColor = document.querySelector(`.${i}`);
    await delay(500);
    currentColor.style.backgroundColor = `${colors[i] ["new"]}`;
    await delay(600);
    currentColor.style.backgroundColor = `${colors[i] ["current"]}`;
    await delay(600);
  }
  pathGeneratorBool = false;
};

// Function to create delay for blink effect
async function delay(time){
  return await new Promise((resolve) => {
    setTimeout(resolve, time);
  }); 
}

// Adding click Event Listener to Colors Button

colorPart.forEach((element) => {
  element.addEventListener("click", async(e) => {
    // if user clicks the same color then next level
    if(pathGeneratorBool){
      return false;
    }
    if (e.target.classList[0] == randomColors [clickCount]){
      //Color blink effect on click
      e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["new"]}`;
      await delay(500);

      e.target.style.backgroundColor = `${colors[randomColors[clickCount]]["current"]}`;

      // User clicks
      clickCount +=1;

      // Next level -- if number of valid clicks == count

      if(clickCount == count){
        clickCount = 0;
        pathGenerate();
      }
    }
    else{
      lose();
    }
  });
});

// Function -- when the player executes a wrong sequence

const lose = () => {
  result.innerHTML = `<span> Your Score: </span> ${count}`;
  result.classList.remove("hide");
  container.classList.remove("hide");
  wrapper.classList.add("hide");
  startButton.innerText = "Play Again";
  startButton.classList.remove("hide");
}





