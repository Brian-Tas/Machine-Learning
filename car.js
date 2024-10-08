let i = 0;
let goal = {x: 300, y: 200};

class Car {
    constructor(x=100, y=100, r=180, w=25, h=50, v=10) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;
        this.h = h;
        this.v = v;
        this.rv = 10;
        this.vx = 0;
        this.vy = 0;

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
        this.gDistance.push(Math.sqrt((this.x - goal.x)^2+(this.y - goal.y)^2));
    }

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
let car2 = new Car(400, 100);

setInterval(()=>{
    document.getElementById("text").innerHTML = car1.doc;
    car1.moveCar();
    car1.drawCar();
}, 10);

export default Car;