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
}
class NewsPrinter {
  constructor(news) {
    this.news = news;
  }
  html() {
    const {title, text} = this.news;
    return `
        <div class="news">
            <h1>${title}</h1>  
            <h2>${text}</h2>  
        </div>
      `;
  }
  json() {
    const {title, text, modified} = this.news;
    return JSON.stringify(
      {
        title: title,
        text: text,
        modified: modified
      },
      null,
      2
    );
  }
}

const printer = new NewsPrinter(new News("Dynamo", "Won ukrainian Super cup"));

/* console.log(newsPrinter.html()); */
console.log(printer.json());
