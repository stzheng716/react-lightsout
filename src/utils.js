function randomBool(chanceLightStartsOn){
    return Math.random() > chanceLightStartsOn ? true : false;
}

export {randomBool}