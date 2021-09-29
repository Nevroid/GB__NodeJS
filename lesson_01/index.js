const colors = require('colors');

const min = Number(process.argv[2]);
const max = Number(process.argv[3]);
if (!max || !min) {
  console.log(colors.yellow('Введенные данные некорректны'))
} else {
  let flag = true;
  let simple = [];
  let counter = 1;

  for (let i = min; i <= max; i++) {
    for (let o = 2; o < i; o++, flag = true ) {
      if (i % o == 0) {
        flag = false
        break
      }
      }
      if (flag) {
        simple.push(i)
    }
  }

  if (simple.length == 0) {
    console.log(colors.green('В указанном диапазоне простых чисел не существует'));
  } else {
      simple.forEach((item) => {
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
    }
}


