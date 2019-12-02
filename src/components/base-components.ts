export abstract class Componet<T extends HTMLElement, U extends HTMLElement>{
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateID: string,
    hostEl: string,
    insertAtStart: boolean,
    newElID?: string,
  ) {
    this.templateElement = document.getElementById(templateID)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostEl)! as T;
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild as U;
    if (newElID) {
      this.element.id = newElID;
    }
    this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? 'afterbegin' : 'beforeend', this.element)
  }

  abstract configure(): void;
  abstract renderContent(): void;

}
