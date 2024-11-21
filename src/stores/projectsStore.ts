import { defineStore } from 'pinia';
import { Project } from '../types/project';

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: JSON.parse(localStorage.getItem('projects') || '[]') as Project[],
  }),
  actions: {
    addProject(project: Project) {
      this.projects.push(project);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem('projects', JSON.stringify(this.projects));
    },
    toggleFavorite(projectId: string) {
      const project = this.projects.find((p: Project) => p.id === projectId);
      if (project) {
        project.isFavorite = !project.isFavorite;
        this.saveToLocalStorage();
      }
    },
    getProjectById(id: string) {
      return this.projects.find((project) => project.id === id);
    },
    updateProject(updatedProject: Project) {
      const index = this.projects.findIndex((project) => project.id === updatedProject.id);
      if (index !== -1) {
        this.projects[index] = updatedProject;
      }
      this.saveToLocalStorage();
    },
  },
});
