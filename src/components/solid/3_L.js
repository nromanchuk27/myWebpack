// Liskov substitution principle (функції які використовують базовий тип,
// вони повинні вміти з ним плюс взаємодіятиз підтипами даного базового типу пр цьому
// не знати нічого про це)

// =============== FIRST EXAMPLE ================= //
class Person {
  canMove = true;
}

class Member extends Person {
  access() {
    console.log("You have an access");
  }
}

class Guest extends Person {
  isGuest = true;
}

class Frontend extends Member {
  canCreateFrontend() {}
}

class Backend extends Member {
  canCreateBackend() {}
}
class PersonFromDifferentCompany extends Guest {
  access() {
    throw new Error("YOU HAVE NOT ACCESS!");
  }
}

function openSecretDoor(member) {
  member.access();
}

// openSecretDoor(new Backend());
// openSecretDoor(new Frontend()); // There should be member
/* openSecretDoor(new PersonFromDifferentCompany()); */

// =============== SECOND EXAMPLE =================
class Component {
  isComponent = true;
}

class ComponentWithTemplate extends Component {
  inInit() {}
}

class HigherOrderComponent extends Component {
  render() {
    return `<div>Component</div>`;
  }
}

class HOC extends HigherOrderComponent {
  render() {
    throw new Error("render is imposible here");
  }
  wrapComponent(component) {
    component.wrapped = true;
    return component;
  }
}

class HeaderComponent extends ComponentWithTemplate {
  onInit() {}
}

class FooterComponent extends ComponentWithTemplate {
  afterInit() {}
}

function renderComponent(component) {
  console.log(component.render());
}

renderComponent(new HeaderComponent());
renderComponent(new FooterComponent());
