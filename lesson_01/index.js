const colors = require('colors');

const min = Number(process.argv[2]);
const max = Number(process.argv[3]);
let excluded = [];
let simple = [];
let counter = 1;
  for (let i = min; i <= max; i++) {
    if (!excluded[i]) {
      simple.push(i);
      for (let div = i < 1; div <= max; div += i) {
        excluded[div] = true;
      }
    }
  }
    simple.forEach((item, index) => {
      switch(counter) {
        case 1:
          console.log(colors.green(item));
          counter = 2;
          break 
        case 2:
          console.log(colors.yellow(item));
          counter = 3;
          break  
        case 3:
          console.log(colors.red(item));
          counter = 1;
          break        
        default:
          break
      }
      
    })