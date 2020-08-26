// Single Responsibility Principle (один клас відповідає за одну функцію)

class News {
  constructor(title, text) {
    this.title = title;
    this.text = text;
    this.modified = false;
  }
  update(text) {
    this.text = text;
    this.modified = true;
  }
  toHTML() {
    return `
        <div class="news">
            <h1>${this.title}</h1>  
            <h2>${this.text}</h2>  
        </div>
      `;
  }
}

const news = new News("Dynamo", "Won ukrainian Super cup");
console.log(news.toHTML());
