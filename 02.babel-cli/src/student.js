export default class Student {
  constructor(options) {
    this.name = options.name
    this.age = options.age
  }

  getName() {
    return this.name
  }

  getAge() {
    return this.age
  }
}
