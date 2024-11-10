import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { Project } from "../interfaces/project.interface";
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from "@vueuse/core";

export const useProjectsStore = defineStore('projects', () => {
    const projects = ref(useLocalStorage<Project[]>('projects', []));

    const addProject = (name: string) => {
        if (name.length === 0) return;
        projects.value.push({
            id: uuidv4(),
            name: name,
            tasks: []
        });
    }

    const addTaskToProject = (projectId: string, taskName: string) => {
        if (taskName.trim().length === 0) return;

        const project = projects.value.find(project => project.id === projectId);
        if (!project) return;

        project.tasks.push({
            id: uuidv4(),
            name: taskName,
        });
    }

    const toggleTask = (projectId: string, taskId: string) => {
        const project = projects.value.find(project => project.id === projectId);
        if (!project) return;

        const task = project.tasks.find(task => task.id === taskId);
        if (!task) return;

        task.completedAt = task.completedAt ? null : new Date();
    }

    return {
        //propierties
        projects,

        // Getters (computed properties)
        projectList: computed(() => [...projects.value]), // propiedad de lectura
        emptyProjects: computed(() => projects.value.length === 0),

        projectsWithCompletionTasks: computed(() => {
            return projects.value.map((project) => {
                const total = project.tasks.length;
                const completed = project.tasks.filter(task => !!task.completedAt).length;
                const completion = total === 0 ? 0 : (completed / total) * 100;

                return {
                    id: project.id,
                    name: project.name,
                    taskCount: total,
                    completion: completion

                }

            })
        }),

        // Actions (funciones)
        addProject,
        addTaskToProject,
        toggleTask

    }

})