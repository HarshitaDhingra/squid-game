import "./styles.css";

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  valueOf() {
    // Integer hash, x and y up to 1,000,000
    return this.x * 1000000 + this.y;
  }

  static fromHash(hash) {
    const y = hash % 1000000;
    const x = Math.floor(hash / 1000000);
    return new Vector(x, y);
  }

  // 1: Add
  add(a, b) {
    return [this.x + a, this.y + b];
  }

  // 2: Subtract
  subtract(a, b) {
    return [this.x - a, this.y - b];
  }

  // 3: Multiply
  multiply(c) {
    return [this.x * c, this.y * c];
  }

  // 4: Divide
  divide(c) {
    return [this.x / c, this.y / c];
  }
}

let obj = new Vector(1, 2);

// Query 0: type=1, vec=[2,3]
[obj.x, obj.y] = obj.add(2, 3); // [3, 5]
console.log(obj.x, obj.y);

// Query 1: type=2, vec=[1,2]
[obj.x, obj.y] = obj.subtract(1, 2); // [2, 3]
console.log(obj.x, obj.y);

// Query 2: type=3, c=4
[obj.x, obj.y] = obj.multiply(4); // [8, 12]
console.log(obj.x, obj.y);

// Query 3: type=4, c=2
[obj.x, obj.y] = obj.divide(2); // [4, 6]
console.log(obj.x, obj.y);
