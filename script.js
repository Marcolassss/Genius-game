// Elementos DOM necessarios para o jogo
const scoreEl = document.getElementById("score");
const colorParts = document.querySelectorAll(".colors");
const containerEl = document.querySelector(".container");
const startBtn = document.querySelector("#start-btn");
const resultEl = document.querySelector("#score-result");
const wrapperEl = document.querySelector(".wrapper");

// Adicionando cores aos objetos
const colorObj = {
    color1: { current: "#006400", new: "#00ff00" },
    color2: { current: "#800000", new: "#ff0000" },
    color3: { current: "#0000b8", new: "#0000ff" },
    color4: { current: "#808000", new: "#ffff00" },
};

// VARIAVEIS DO JOGO
let randomColors = [];
let isPathGenerating = false;
let score = 0;
let clickCount = 0;

// FUNÇÃO PEGAR CORES DOS ELEMENTOS DE FORMA ALEATORIA
const getRandomColor = (colorsObj) => {
    const colorKeys = Object.keys(colorsObj);
    return colorKeys[Math.floor(Math.random() * colorKeys.length)];
};

// FUNÇÃO DE PAUSE

const delay = async (time) => {
    return await new Promise((resolve) => setTimeout(resolve, time));
};

// FUNÇÃO PARA DEFINIR UM CAMINHO DIFERENTE 

const generateRandomPath = async () => {
    randomColors.push(getRandomColor(colorObj));
    score = randomColors.length;
    isPathGenerating = true;
    await showPath(randomColors);
}

// FUNÇÃO PARA MOSTRAR AO JOGADOR O CAMINHO 

const showPath = async (colors) => {
    scoreEl.innerText = score;
    // LOOP DE ARRAY
    for (let color of colors) {
        const currentColor = document.querySelector(`.${color}`);
        // PAUSAR A EXECUÇÃO POR 500 MILISEGUNDOS
        await delay(500);
        // SETAR UM NOVO BACKGROUNDCOLOR
        currentColor.style.backgroundColor = colorObj[color].new;
        await delay(600);
        // SETAR UM BACKGROUND COLOR ANTIGO
        currentColor.style.backgroundColor = colorObj[color].current;
        await delay(600);
    }
    // SETAR .>
    isPathGenerating = false;
};

// fUNÇÃO PRA TERMINAR O JOGO E MOSTRAR O SCORE FINAL
const endGame = () => {
    resultEl.innerHTML = `<span> Your Score : </span> ${score}`;
    resultEl.classList.remove("hide");
    containerEl.classList.remove("hide");
    wrapperEl.classList.add("hide");
    startBtn.innerText = "Play Again";
    startBtn.classList.remove("hide");
};
// function to reset game after ending

const resetGame = () => {
    score = 0;
    clickCount = 0;
    randomColors = [];
    isPathGenerating = false;
    wrapperEl.classList.remove("hide");
    containerEl.classList.add("hide");
    generateRandomPath();
};
// function to handle a color being clicked

const handleColorClick = async (e) => {
    // if the path is currently being generated, ignore click
    if (isPathGenerating) {
        return false;
    }
    // if clicked color is correct, update score and continue generating the path
    if (e.target.classList.contains(randomColors[clickCount])) {
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].new;
        await delay(500);
        e.target.style.backgroundColor = colorObj[randomColors[clickCount]].current;
        clickCount++;
        if (clickCount === score) {
            clickCount = 0;
            generateRandomPath();
        }
        // SE CLICKAR NA COR INCORRETA TERMINE O JOGO
    } else {
        endGame();
    }
};
// EVENTOS LISTENER
startBtn.addEventListener("click", resetGame);
colorParts.forEach((color) => color.addEventListener("click", handleColorClick));