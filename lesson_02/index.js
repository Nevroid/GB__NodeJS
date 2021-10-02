
const dayjs = require('dayjs');
const customParseFormat = require('dayjs/plugin/customParseFormat');
const EventEmitter = require('events');
dayjs.extend(customParseFormat);

const userDate = dayjs(process.argv[2], "DD-MM-YYYY-HH-mm");
const currentDate = dayjs()

// let test = dayjs("12-25-1995-23-58", "MM-DD-YYYY-HH-mm")
// console.log(test.valueOf())
// let test2 = dayjs(test.valueOf() + 1000000)
// console.log(test2)

class Timer {
  constructor(params) {
    this.payload = {
      fullUnixDate: params.valueOf(),
      year: params.$y,
      month: params.$M + 1,
      day: params.$D,
      hour: params.$H,
      minute: params.$m,
      second: params.$s
    }  
  }
};

class MyEmitter extends EventEmitter {};

const emitterObject = new MyEmitter();

const timerHandler = (payload) => {
  if (dayjs(payload.fullUnixDate).isValid() && (payload.fullUnixDate > dayjs(new Date).valueOf()) ) {
    console.log(`Chosen end-point is: ${dayjs(payload.fullUnixDate)}.`)
    console.log(`Commensing countdown...`)
    let timerInstance = setInterval(() => {
      if (payload.fullUnixDate > dayjs(new Date).valueOf()) {
        let anounce = `${(payload.fullUnixDate - dayjs(new Date).valueOf()) / 1000} seconds till chosen end-point`
        console.log(anounce)
      } else {
        console.log(`You've reached the end-point`)
        clearInterval(timerInstance)
      }
    }, 1000)
      
  } else {
      console.log(`You've entered an invalid value`)
    }
};

const generateNewTimer = (params) => {
  return new Timer(params)
};

emitterObject.on('startTimer', timerHandler);

let timer = generateNewTimer(userDate);
emitterObject.emit('startTimer', timer.payload);
