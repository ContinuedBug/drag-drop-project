import {DragTarget} from '../models/drag-drop';
import {Project, ProjectStatus} from '../models/project';
import {Componet} from './base-components';
import {Binder} from '../decorators/binder';
import {projState} from '../state/project-state'
import {ProjectItem} from './project-item'

export class ProjectList extends Componet<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.assignedProjects = [];

    this.configure()
    this.renderContent();
  }

  configure() {

    this.element.addEventListener('dragover', this.dragOverHandler)
    this.element.addEventListener('dragleave', this.dragLeaveHandler)
    this.element.addEventListener('drop', this.dropHandler)

    projState.addListener((prjts: Project[]) => {
      const relevantProjects = prjts.filter(prj => {
        if (this.type === 'active') {
          return prj.status === ProjectStatus.Active
        }
        return prj.status === ProjectStatus.finished;
      })
      this.assignedProjects = relevantProjects;
      this.renderProject();
    });
  }

  @Binder
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }

  }
  @Binder
  dropHandler(event: DragEvent) {
    const prjID = event.dataTransfer!.getData('text/plain');
    projState.moveProject(prjID, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.finished)
  }
  @Binder
  dragLeaveHandler(_: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable')
  }

  renderContent() {
    const listid = `${this.type}-project-list`;
    this.element.querySelector('ul')!.id = listid;
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase() + 'PROJECTS'
  }

  private renderProject() {
    const listEl = document.querySelector(`#${this.type}-project-list`)! as HTMLUListElement;
    listEl.innerHTML = '';
    for (const prItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector('ul')!.id, prItem)
    }
  }


}
