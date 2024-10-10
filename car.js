let i = 0;
let goal = [300, 200];

class Car {
    constructor(x=0, y=0, r=180, w=25, h=50, v=10) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;
        this.h = h;
        this.v = v;
        this.rv = 0;
        this.vx = 0;
        this.vy = 0;

        this.pos = [this.x, this.y, this.r, this.rv];

        let doc = document.createElement('img');
        doc.classList.add('absolute');
        doc.classList.add('car');
        doc.id = `${i}`;
        doc.src = './car.png';

        document.body.appendChild(doc); // Append the image to the document body

        this.doc = doc; // Correct assignment
        
        this.net = new brain.NeuralNetwork();
        this.gDistance = []; //distance from goal
        this.fitness = 0;
        
        this.id = i;
        
        this.drawCar();
        i++; // Increment i for the next car

        setInterval(()=>{
            this.moveCar();
            this.drawCar();
            this.pos = [this.x, this.y, this.r, this.rv];
        },10)
    }

    drawCar() {
        this.doc.style.top = `${450 - this.y}px`;
        this.doc.style.left = `${this.x}px`;
        this.doc.style.transform = `rotate(${this.r}deg)`;
        this.doc.style.width = `${this.w}px`;
        this.doc.style.height = `${this.h}px`;
    }

    moveCar() {
        this.r += this.rv / 1.5;
        this.rv *= 0.99;
    
        const radians = this.r * (Math.PI / 180);
        const deltaX = this.v * Math.sin(radians);
        const deltaY = this.v * Math.cos(radians);
    
        this.vx += deltaX / 10;
        this.vy += deltaY / 10;
    
        this.vx *= 0.93;
        this.vy *= 0.93;
    
        this.x += this.vx / 10;
        this.y += this.vy / 10;    
    }

    getDistance() {
        let distance = (Math.sqrt((this.x - goal[0])**2+(this.y - goal[1])**2));
        this.gDistance.push(distance);
        return distance;
    }
///1/2 chance to go on strike they said nuh uh and did 1/1 chance
    getFitness() {
        let distanceLength = this.gDistance.length;
        if(distanceLength > 1) {
            let sum = 0;
            for(let h = 0; h < distanceLength; h++) {
                sum += this.gDistance[h];
            }
            this.fitness = sum/distanceLength;
        } else {
            console.warn('Car has not travled enough distance');
        }
    }
}

let car1 = new Car(300, 100);


document.getElementById('goal').style.top = `${450 - goal[1].y}px`;
document.getElementById('goal').style.left = `${goal[0].x}px`;

let data = []
let keys = {
    a: 0,
    d: 0
};

document.addEventListener('keydown', event=>{
    if(event.key === 'd') {
        keys.d = 1;
    }
    if(event.key === 'a') {
        keys.a = 1;
    }
});

document.addEventListener('keyup', event=>{
    if(event.key === 'd') {
        keys.d = 0;
    }
    if(event.key === 'a') {
        keys.a = 0;
    }
});


setInterval(()=>{
    car1.rv += (keys.d - keys.a);
    data.push(
        {
            input: [car1.x, car1.y, car1.r],
            output: [(keys.d - keys.a)/2 + 0.5]
        }
    )
},100);


setTimeout(()=>{
    car1.net.train(data);
    console.log(car1.net.toJSON());
    setInterval(()=>{
        car1.rv += car1.net.run([car1.x, car1.y, car1.r])[0] * 2 - 1
    },100)
},5000)