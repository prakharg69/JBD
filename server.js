// const arrSplice = [1, 2, 3, 4, 5];

// arrSplice.splice(2,1,   4,5,6,7);
// console.log(arrSplice);
// let student = {
//     name:"prakhar",
//     age:12
// }
// student.class = "high";
// Object.seal(student);
// student.cast="genral"
// console.log(student);


// let date = new Date();
// console.log(date.getDate());


// date.setDate(date.getDate()+7);

// console.log(date.getDate());
// setTimeout(() => {
//     console.log("hello");
    
// }, 3000);
// console.log("baby");
// const fn = new Promise((resolve,reject)=>{
//     setTimeout(() => {
//         resolve("thank");
//     }, 2000);
// })

// fn.then((data)=>console.log(data));




let word = "abacaba";
let data = {
        1:"abcdeptw",
        2:"fhjlnqux",
        3:"gikmorvy",
        4:"sz"
    }
    let ans = 0;
    for(let char in word){
        console.log(char);
        for(let key in data ){
            if(data[key].includes(word[char])){
                    ans+=key;
            }
        }
    }
