

function createUser(username, score){
    this.username = username;
    this.score = score;
}

createUser.prototype.increment = function(){
    this.score++;
    return this.score;
}

const chai = new createUser("Prakhar", 25);

console.log(chai.increment()); // 26