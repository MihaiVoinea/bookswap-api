const fs = require("fs");

const inputObj = JSON.parse(fs.readFileSync("regions.json"));

let result = [];

Object.keys(inputObj).forEach((key) => {
  let judet = {
    name: key
  }
  console.log(judet);
  judet['locations'] = inputObj[key].map(city => city) ;
  
  result.push(judet);
});

console.log(result);

fs.writeFileSync("regions.min.json", JSON.stringify(result));