async function start() {
  return await Promise.resolve("Async is working");
}
start().then(res => console.log(res));

class Util {
  static id = Date.now();
}
