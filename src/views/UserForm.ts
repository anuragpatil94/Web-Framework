import { User } from "../models/User";

export class UserForm {
  constructor(public parent: Element, public model: User) {}

  eventsMap(): { [key: string]: () => void } {
    return {
      "click:button": this.onButtonClick,
      "mouseenter:h1": this.onHeaderHover
    };
  }

  onButtonClick(): void {
    event.preventDefault();
    console.log("Hi there!");
  }

  onHeaderHover(): void {
    console.log("Hovering");
  }

  template(): string {
    return `
            <div>
                <h1>User Form</H1>
                <div>User Name:  ${this.model.get("name")}</div>
                <div>User Age:  ${this.model.get("age")}</div>
                <form>
                    <input></input>
                    <button>Click!</button>
                </form>
            </div>
        `;
  }

  /**
   * Here we are trying to bind events that we have in out eventmap to the template.
   * By finding the selectors and assigning the callback
   * @param fragment DocumentFragment
   */
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(":");

      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  }

  render(): void {
    const templateElement = document.createElement("template");
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
