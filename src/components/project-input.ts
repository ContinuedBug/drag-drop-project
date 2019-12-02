import {Componet} from './base-components'
import * as Validation from '../util/validation'
import {Binder} from '../decorators/binder'
import {projState} from '../state/project-state'


export class ProjectInput extends Componet<HTMLDivElement, HTMLFormElement>{
  titleInput: HTMLInputElement;
  descInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')
    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descInput = this.element.querySelector("#description") as HTMLInputElement;
    this.peopleInput = this.element.querySelector("#people") as HTMLInputElement;


    this.configure()

  }
  configure() {

    this.element.addEventListener('submit', this.subHandler);
  }
  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInput.value
    const enteredDesc = this.descInput.value
    const enteredPeople = this.peopleInput.value

    const titleValidator: Validation.ValidatorConfig = {
      value: enteredTitle,
      required: true,
    }
    const descValidator: Validation.ValidatorConfig = {
      value: enteredDesc,
      required: true,
      minLength: 5,
    }
    const peopleValidator: Validation.ValidatorConfig = {
      value: +enteredPeople,
      required: true,
      min: 0,
      max: 5,
    }

    if (
      !Validation.Validate(titleValidator) ||
      !Validation.Validate(descValidator) ||
    !Validation.Validate(peopleValidator)
    ) {
      alert('Invalid input, please try again!')
      return;
    }
    return [enteredTitle, enteredDesc, +enteredPeople]
  }

  private clearInputs() {
    this.titleInput.value = '';
    this.descInput.value = '';
    this.peopleInput.value = '';
  }

  @Binder
  private subHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      projState.addProject(title, desc, people);
      this.clearInputs();
    }
  };


}
