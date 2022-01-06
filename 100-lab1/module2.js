//(a)
export const mySum = (...numbers) => {
  return numbers.reduce((prev, curr) => {
    return prev + curr;
  });
};
//  { mySum };

console.log(mySum(1, 4, 7, 8)); //20
