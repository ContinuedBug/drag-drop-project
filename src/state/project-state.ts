import { Project, ProjectStatus } from '../models/project'
type Listener<T> = (items: T[]) => void;

class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

export class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();

  }


  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance
  }

  addProject(title: string, desc: string, nPeople: number) {
    const newPrject = new Project(
      Math.random().toString(),
      title,
      desc,
      nPeople,
      ProjectStatus.Active
    )
    this.projects.push(newPrject)
    this.updateListeners()
  }

  moveProject(projectID: string, newStatus: ProjectStatus) {
    const proje = this.projects.find(prj => prj.id === projectID)
    if (proje && proje.status !== newStatus) {
      proje.status = newStatus
      this.updateListeners()
    }

  }

  private updateListeners() {
    for (const lsFn of this.listeners) {
      lsFn(this.projects.slice());
    }
  }

}

export const projState = ProjectState.getInstance()
