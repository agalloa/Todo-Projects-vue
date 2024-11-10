<template>
  <div class="w-full">
    <section class="m-2">
      <BreadCrumbs :name="project?.name ?? 'no name'" />
    </section>
    <section class="m-2">
      <div class="overflow-x-auto">
        <table class="table">
          <!-- head -->
          <thead>
            <tr>
              <th class="w-14">Completed</th>
              <th>Task</th>
              <th>Completed in</th>
            </tr>
          </thead>
          <tbody>
            <!-- row 1 -->
            <tr v-for="task in project?.tasks" :key="task.id" class="hover">
              <th>
                <input
                  type="checkbox"
                  :checked="!!task.completedAt"
                  class="checkbox checkbox-primary"
                  @change="projectsStore.toggleTask(project?.id ?? '', task.id)"
                />
              </th>
              <td>{{ task.name }}</td>
              <td>{{ task.completedAt }}</td>
            </tr>
            <tr class="hover">
              <th></th>
              <td>
                <input
                  type="text"
                  class="input input-primary w-full opacity-60 transition-all hover:opacity-100 focus:opacity-100"
                  placeholder="New Task"
                  v-model="newTask"
                  @keyup.enter="addTask"
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import BreadCrumbs from '@/modules/common/components/BreadCrumbs.vue';
import { useProjectsStore } from '../store/projects.store';
import { ref, watch } from 'vue';
import type { Project } from '../interfaces/project.interface';
import { useRouter } from 'vue-router';

interface Props {
  id: string;
}

const route = useRouter();
const props = defineProps<Props>();
const projectsStore = useProjectsStore();
const project = ref<Project | undefined>();
const newTask = ref('');
// const project = projectsStore.projectList.find((project) => project.id === props.id);

const addTask = () => {
  if (!project.value) return;

  projectsStore.addTaskToProject(project.value.id, newTask.value);
  newTask.value = '';
};
watch(
  () => props.id,
  () => {
    project.value = projectsStore.projectList.find((project) => project.id === props.id);
    if (!project.value) {
      route.replace('/');
    }
  },
  {
    // tan pronto carga el componente se ejecuta esta linea de codigo.
    immediate: true,
  },
);
</script>
