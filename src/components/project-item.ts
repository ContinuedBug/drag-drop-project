import {Draggable} from '../models/drag-drop';
import {Project} from '../models/project';
import {Componet} from './base-components';
import {Binder} from '../decorators/binder';


export class ProjectItem extends Componet<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return '1 person'
    }
    return `${this.project.people} persons`
  }

  constructor(hostID: string, project: Project) {
    super('single-project', hostID, false, project.id);
    this.project = project;

    this.configure();
    this.renderContent();
  }

  @Binder
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move';

  }

  @Binder
  dragAndHandler(_: DragEvent) {
    console.log('DragEnd')

  }

  configure() {
    this.element.addEventListener('dragstart', this.dragStartHandler)
    this.element.addEventListener('dragend', this.dragAndHandler)
  }
  renderContent() {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.persons + ' assigned.';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}
