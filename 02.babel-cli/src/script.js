import '../helpers'
import delay from './delay'
import Student from './student'

const obj = Object.assign({}, { a: 1 })
console.log(obj)

console.log('helloworld'.includes('hello'))

const array = [1, 2, 3].map((item, index) => item * 2)
console.log(array)

const delay3Seconds = async () => {
  await delay(3000)
  console.log('delay after 3 seconds')
}

delay3Seconds()

const will = new Student('will', 23)
console.log(will.getName, will.getName())
