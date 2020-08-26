// Open close principle (відкритий для розширення і закритий для модифікації)

class Shape {
  area() {
    throw new Error(`Area method of ${this.constructor.name} should be implemented`);
  }
}

class Square extends Shape {
  constructor(size) {
    super();
    this.size = size;
  }
  area() {
    return this.size ** 2;
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  area() {
    return this.radius ** 2 * Math.PI;
  }
}
class Rect extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  area() {
    return this.height * this.width;
  }
}

class AreaCalculator {
  constructor(shapes = []) {
    this.shapes = shapes;
  }
  sum() {
    return this.shapes.reduce((acc, shape) => {
      acc += shape.area();
      return acc;
    }, 0);
  }
}

const calc = new AreaCalculator([new Circle(5), new Rect(15, 20), new Square(5)]);

console.log(calc.sum());
