const net = new brain.NeuralNetwork();
  
net.train([
    {
        input: [1, 0],
        output: [0, 1]
    },
    {
        input: [0, 1],
        output: [1, 0]
    }
])

console.log(net.run([1, 0]))


const diagram = document.getElementById('diagram'); //renders network
diagram.innerHTML = brain.utilities.toSVG(net);