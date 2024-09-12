const net = new brain.NeuralNetwork(); //defines the neural network
const colorBlock = document.getElementById('color');
const guessText = document.getElementById('guess');
let data = [];
let color;

net.train([
    {
        input: {r: 1, g: 1, b: 1},
        output: [0]
    },
    {
        input: {r: 0, g: 0, b: 0},
        output: [1]
    }
])

const randomColor = () => {
    color = {
        r: Math.random(),
        g: Math.random(),
        b: Math.random()
    }
    
    colorBlock.style.backgroundColor = `rgb(${color.r * 255}, ${color.g * 255}, ${color.b * 255})`;
    if(net.run(color) > 0.5) {
        guessText.style.color = 'white';
    } else {
        guessText.style.color = 'black';
    }
    
    console.log(net.run(color));
}

randomColor();

const guess = answer => {
    console.log(answer);
    net.train([
        {
            input: color,
            output: [answer]
        }
    ]);

    randomColor();
}


const diagram = document.getElementById('diagram'); //renders network
diagram.innerHTML = brain.utilities.toSVG(net);