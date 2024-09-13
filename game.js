let car = {
    x: 95,
    y: 75,
    r: 0,
    w: 25,
    h: 50,
    v: 20,
    vx: 0,
    vy: 0,
    rv: 0,
    doc: document.getElementById('car')
}

const keys = {
    a: false,
    d: false
}

document.addEventListener('keydown', event => {
   if(event.key === 'd') {
       keys.d = true;
   } else if (event.key === 'a') {
       keys.a = true;
   }
});

document.addEventListener('keyup', event => {
    if(event.key === 'd') {
       keys.d = false;
   } else if (event.key === 'a') {
       keys.a = false;
   }
})


const drawLoop = () => {
    //update all css properties with js values
    car.doc.style.transform = `rotate(${car.r}deg)`;
    car.doc.style.left = `${car.x}px`;
    car.doc.style.top = `${450 - car.y}px`;
    car.doc.style.width = `${car.w}px`;
    car.doc.style.height = `${car.h}px`;
}

const deltaMoveCar = (r, v) => {
    car.r += car.rv/1.5;
    car.rv *= 0.99;
    
    const radians = r * (Math.PI / 180);
    const deltaX = v * Math.sin(radians);
    const deltaY = v * Math.cos(radians);
    
    car.vx += deltaX / 10;
    car.vy += deltaY / 10;
    
    car.vx *= 0.93;
    car.vy *= 0.93;
    
    car.x += car.vx / 10;
    car.y += car.vy / 10;
}

const detection = () => {
    
}

setInterval(()=>{
    if(keys.d)car.rv+=0.1;
    if(keys.a)car.rv-=0.1;
    deltaMoveCar(car.r + car.rv, car.v);
    drawLoop();
}, 10);d