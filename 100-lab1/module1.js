//(b)
// import { mySum } from "./module2";

// mySum(1, 2, 3, 4);

//(c)
const myArr = [2, 4, 6, 8, 10];
console.log(myArr);

//(d)
// const result = mySum(...myArr);
// console.log("result: ", result);

//(e)
const mySecondArr = myArr.map(function (arr) {
  return arr * arr;
});

console.log(mySecondArr);

//(f)
const avr = (Arr) => Arr.reduce((a, b) => a + b) / Arr.length + 1;
console.log(avr(mySecondArr));

//(g)
setTimeout(() => {
  console.log("Goodbye");
}, 3000);

//(h)
let person, department, startDate;
const Employee = {
  department: "engineering",
  startDate: "2021.04.01",
  name: "Erika",
  email: "erika@gamil.com",
};

({ department, startDate, ...person } = Employee);

const Person = person;
console.log(Person);
