let i = 0;

class Car {
    constructor(x=100, y=100, r=180, w=25, h=50, v=10) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.w = w;
        this.h = h;
        this.v = v;
        this.rv = 10; // Initialize rv
        this.vx = 0; // Initialize vx
        this.vy = 0; // Initialize vy

        let doc = document.createElement('img');
        doc.classList.add('absolute');
        doc.classList.add('car');
        doc.id = `${i}`;
        doc.src = './car.png';

        document.body.appendChild(doc); // Append the image to the document body

        this.doc = doc; // Correct assignment
        i++; // Increment i for the next car
    }

    drawCar() {
        this.doc.style.top = `${450 - this.y}px`;
        this.doc.style.left = `${this.x}px`;
        this.doc.style.transform = `rotate(${this.r}deg)`;
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
}

let car1 = new Car();

setInterval(()=>{
    car1.moveCar();
    car1.drawCar();
    car1.rv = 100;
    car1.v = 100;
}, 10);