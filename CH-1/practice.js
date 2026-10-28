

// const users = [
//   { id: 1, name: "Prakhar", email: "p@test.com", password: "abc123", age: 21 },
//   { id: 2, name: "Rahul", email: "r@test.com", password: "xyz789", age: 22 },
//   { id: 3, name: "Aman", email: "aman@test.com", password: "aman123", age: 20 },
//   { id: 4, name: "Priya", email: "priya@test.com", password: "priya456", age: 23 },
//   { id: 5, name: "Rohit", email: "rohit@test.com", password: "rohit789", age: 24 },
//   { id: 6, name: "Sneha", email: "sneha@test.com", password: "sneha321", age: 19 },
//   { id: 7, name: "Vikash", email: "vikash@test.com", password: "vikash123", age: 25 },
//   { id: 8, name: "Anjali", email: "anjali@test.com", password: "anjali456", age: 22 },
//   { id: 9, name: "Karan", email: "karan@test.com", password: "karan789", age: 21 },
//   { id: 10, name: "Neha", email: "neha@test.com", password: "neha321", age: 20 },
//   { id: 11, name: "Arjun", email: "arjun@test.com", password: "arjun123", age: 26 },
//   { id: 12, name: "Simran", email: "simran@test.com", password: "simran456", age: 23 },
//   { id: 13, name: "Aditya", email: "aditya@test.com", password: "aditya789", age: 22 },
//   { id: 14, name: "Kavya", email: "kavya@test.com", password: "kavya321", age: 21 },
//   { id: 15, name: "Harsh", email: "harsh@test.com", password: "harsh123", age: 24 },
//   { id: 16, name: "Isha", email: "isha@test.com", password: "isha456", age: 20 },
//   { id: 17, name: "Varun", email: "varun@test.com", password: "varun789", age: 27 },
//   { id: 18, name: "Pooja", email: "pooja@test.com", password: "pooja321", age: 22 },
//   { id: 19, name: "Manish", email: "manish@test.com", password: "manish123", age: 28 },
//   { id: 20, name: "Riya", email: "riya@test.com", password: "riya456", age: 19 },
//   { id: 21, name: "Sahil", email: "sahil@test.com", password: "sahil789", age: 23 },
//   { id: 22, name: "Divya", email: "divya@test.com", password: "divya321", age: 24 },
//   { id: 23, name: "Yash", email: "yash@test.com", password: "yash123", age: 21 },
//   { id: 24, name: "Megha", email: "megha@test.com", password: "megha456", age: 25 },
//   { id: 25, name: "Akash", email: "akash@test.com", password: "akash789", age: 22 },
//   { id: 26, name: "Tanya", email: "tanya@test.com", password: "tanya321", age: 20 },
//   { id: 27, name: "Deepak", email: "deepak@test.com", password: "deepak123", age: 29 },
//   { id: 28, name: "Nisha", email: "nisha@test.com", password: "nisha456", age: 23 },
//   { id: 29, name: "Mohit", email: "mohit@test.com", password: "mohit789", age: 26 },
//   { id: 30, name: "Aarti", email: "aarti@test.com", password: "aarti321", age: 21 }
// ];

// const products = [
//   { id: 1, name: "Keyboard", price: 1200, stock: 5, active: true },
//   { id: 2, name: "Mouse", price: 500, stock: 0, active: true },
//   { id: 3, name: "Monitor", price: 8000, stock: 3, active: false },
//   { id: 4, name: "Headphones", price: 2000, stock: 4, active: true }
// ];

// const orders = [
//   { id: 101, amount: 1500, status: "completed" },
//   { id: 102, amount: 2000, status: "pending" },
//   { id: 103, amount: 3000, status: "completed" },
//   { id: 104, amount: 500, status: "cancelled" }
// ];

// const user = {
//   id: 1,
//   name: "Prakhar",
//   profile: {
//     city: "Dehradun"
//   }
// };

// let fetchProduct = (products)=>{
//     try {
//         const pp = products.filter((value)=> value.stock >0 && value.active === true).map((value)=>{
//             return {id:value.id ,name:value.name ,price:value.price}
//         })
//         console.log(pp);
        
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }

// let fetchOrder = (orders)=>{
//     try {
//         const pp = orders.filter((value)=> value.status === "completed").reduce((val,order)=> val+=order.amount,0)
//         console.log(pp);
        
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }


// let fetchUserData =(users)=>{
//     try {
//         if(!users || users.length===0){
//             throw new Error("user not found");
//         }
//        const newUsers= users.map((value)=>{
//              return{id:value.id ,name:value.name ,email:value.email};
//         })

//         console.log(newUsers);
        
        
        
//     } catch (error) {
//         console.log(error.message);
        
//     }
// }

// let cleanUser = (user)=>{
//         try {
//             if(!user){
//                 throw new Error("User not found");
//             }
//             const newUser={
//                 id:user.id,
//                 name:user.name,
//                 city:user?.profile?.city ?? "Not provide",
//                 bio:user?.profile?.bio ?? "Not provide",
//                 followers: user?.profile?.followers ?? 0,
//             }

//             console.log(newUser);
            
//         } catch (error) {
//             console.log(error.message);
            
//         }
// }

// let ValidateBody = (body)=>{
//     let value=[];
//      const wow = Object.entries(body).every(([key ,value])=>{
//         if(value.trim()===""){
//             value.push(key);
//         }
//      } )

//      let answer = {
//         valid:wow,
//         errors:value
//      }
//      console.log(answer);
     
// }
// fetchUserData(users)
// fetchProduct(products)
// fetchOrder(orders)


// cleanUser(user);
// cleanUser({ id: 2, name: "Rahul", profile: null })
// cleanUser({ id: 3, name: "Riya", profile: { city: "", bio: "", followers: 0 } })
// cleanUser({ id: 2, name: "Rahul",})
// ValidateBody({
//   name: "Prakhar",
//   email: "p@test.com",
//   password: "abc123"
// });


// const name = "  pRAKHAR   gUSSAIN   "

// let value = name.trim().split(" ");
// let newVal = value.filter((val)=> val!='').map((val)=> {
//     return  val[0].toUpperCase()+val.slice(1).toLowerCase();
// });
// newVal = newVal.join(" ")


// let val = "prakhar_21"
// val=val.trim()

// if(val.length >=4 && val.length<=20){

// }
// else{
//     console.log("  ");
    
// }


// console.log(newVal);


// const products = [
//   "Wireless Mouse",
//   "Mechanical Keyboard",
//   "Wireless Headphones",
//   "USB Cable"
// ];

// let data = products.map((value)=> value.trim().toLowerCase()).filter((val)=>val.includes("wireless"));

// console.log(data)

// const items = [
//   { price: 19.99, quantity: 2 },
//   { price: 5.50, quantity: 3 },
//   { price: 10, quantity: 1 }
// ];



// let  calculateOrderTotal = (items)=>{
//     let data = items.filter((val)=> val.price >0 && val.quantity >0 && Number.isFinite(val.price) && Number.isFinite(val.quantity) && Number.isInteger(val.quantity) );
//     let ans = data.reduce((acc,val)=> acc=acc+(val.price*val.quantity) ,0);

//     console.log(Math.round(ans));
    
    
// }
// calculateOrderTotal(items)


const now = new Date();
console.log(now.getDate());
console.log(now.getDay());
console.log(now.getFullYear());
console.log(now.getMonth());


const date = new Date("2026-10-19T05:30:00.000Z");

console.log(date.toISOString());

console.log(date.getHours());
console.log(date.toLocaleDateString("en-IN",{
    timeZone:"Asia/Kolkata"
}));



