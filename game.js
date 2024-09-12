let car = [100, 50, document.getElementById('car')];


setInterval(inputs => {
    //update car x, y
    car[2].style.bottom = `${car[1] - 40}` + `px`;
    car[1]++;
    console.log(car[1]);
}, 10);