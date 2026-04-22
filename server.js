const obj1 = {
  name: "Rahul",
  agee: 25,
  city: "Delhi"
};
const obj = {name: "Rahul", age: 225};
const merge = {...obj1,...obj}
console.log(merge);


