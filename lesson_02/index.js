
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const EventEmitter = require('events');
dayjs.extend(customParseFormat);

let timersCounter = 1;
let userTimers = [];
process.argv.forEach(element => {
  userTimers.push(dayjs(element, "DD-MM-YYYY-HH-mm"))
});
userTimers.splice(0, 2);
const userDate = dayjs(process.argv[2], "DD-MM-YYYY-HH-mm");
const currentDate = dayjs()

// let test = dayjs("12-25-1995-23-58", "MM-DD-YYYY-HH-mm")
// console.log(test.valueOf())
// let test2 = dayjs(test.valueOf() + 1000000)
// console.log(test2)

class Timer {
  constructor(params) {     
      this.fullUnixDate = params.valueOf(),
      this.id = timersCounter,
      this.year = params.$y,
      this.month = params.$M + 1,
      this.day = params.$D,
      this.hour = params.$H,
      this.minute = params.$m,
      this.second = params.$s
      timersCounter++
    }
};

class MyEmitter extends EventEmitter {};

const emitterObject = new MyEmitter();

const timerHandler = (payload) => {
  if (dayjs(payload.fullUnixDate).isValid() && (payload.fullUnixDate > dayjs(new Date).valueOf()) ) {
    
    console.log(`Timer id#${payload.id}: Chosen end-point is ${dayjs(payload.fullUnixDate)}.`)
    console.log(`Timer id#${payload.id}: Commensing countdown...`)
    let timerInstance = setInterval(() => {
      if (payload.fullUnixDate > dayjs(new Date).valueOf()) {
        let anounce = `Timer id#${payload.id}: ${Math.floor((payload.fullUnixDate - dayjs(new Date).valueOf()) / 1000)} seconds till chosen end-point`
        console.log(anounce)
      } else {
        console.log(`Timer id#${payload.id}: You've reached the end-point`)
        clearInterval(timerInstance)
      }
      
      setTimeout(() => {
        console.clear()
      }, 900)
      
    }, 1000)
      
  } else {
      console.log(`Timer id#${payload.id}: You've entered an invalid value`)
    }
};

const generateNewTimer = (params) => {
  return new Timer(params)
};

emitterObject.on('startTimer', timerHandler);

userTimers.forEach(element => {
      let timer = generateNewTimer(element);
      emitterObject.emit('startTimer', timer);
});
