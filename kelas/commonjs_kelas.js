function Person() {
  this.id = "id_1";
}
Person.prototype.setName = function (name) {
  this.name = name.charAt(0).toUpperCase() + name.slice(1);
};
Person.prototype.sayHello = function () {
  console.log("Hello, my name is " + this.name + ", I have ID: " + this.id);
};

var justAGuy = new Person();
justAGuy.setName("martin");
justAGuy.sayHello(); // Will output 'Hello, my name is Martin, I have ID: id_1'
