// This function just creates a mock result object exclusively for this POC
function makeMockSearchResult(carCount) {
    let ret = [];
    for (let ct = 0; ct < carCount; ct++) {
        let car = {};
        car.id = makeString(3) + '-' + random6digits();
        car.vin = random6digits() + makeString(1) + random6digits() + makeString(7) + random6digits();
        car.make = 'Honda';
        car.model = makeModel();
        car.engine = makeEngine(car.model);
        car.color = makeColor();
        ret.push(car);
    }
    return ret;
}

function makeModel() {
    let models = ['Civic', 'Accord', 'Pilot', 'CR-V', 'Odyssey', 'HR-V'];
    return models[rollDice()];
}

function makeEngine(model) {
    if (model === 'Civic' || model === 'HR-V') return 'I4';
    return 'V6';
}

function makeColor() {
    let models = ['Red', 'Silver', 'White', 'Gray', 'Blue', 'Green'];
    return models[rollDice()];
}

function random6digits() {
    return Math.floor(100000 + Math.random() * 900000);
}

function rollDice() {
    return Math.floor(Math.random() * 6);
}

function makeString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
