<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Project</th>
          <th>Task</th>
          <th>advance</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(project, index) in projectsStore.projectsWithCompletionTasks"
          :key="project.id"
          class="hover"
        >
          <th>{{ index + 1 }}</th>
          <td>{{ project.name }}</td>
          <td>{{ project.taskCount }}</td>
          <td>
            <progress
              class="progress progress-primary w-56"
              :value="project.completion"
              max="100"
            ></progress>
            {{ project.completion }}
          </td>
        </tr>
      </tbody>
    </table>
    <InputModal
      :open="modalOpen"
      @close="modalOpen = false"
      @value="projectsStore.addProject"
      placeholder="Insert the name of the project"
      title="New Project"
      subtitle="Press ESC key or click the button below to close"
    />

    <CustomModal :open="customModalOpen">
      <!-- Se define el template el cual lleva el nombre del slot el cual seria para este caso header-->
      <template #header>
        <h1 class="text-3xl">Title Modal</h1>
      </template>
      <template #body>
        <p>Content Modal</p>
      </template>
      <template #footer>
        <div class="flex justify-end mt-5">
          <button @click="customModalOpen = false" class="btn btn-primary mr-5">cancel</button>
          <button @click="customModalOpen = false" class="btn btn-primary">Save</button>
        </div>
      </template>
    </CustomModal>
    <FabButton @click="modalOpen = true">
      <!--  El componente padre es esta vista y el componente hijo es el inputModal -->
      <AddCircle />
    </FabButton>

    <FabButton @click="customModalOpen = true" position="bottom-left">
      <AxeCircle />
    </FabButton>
  </div>
</template>

<script setup lang="ts">
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import AxeCircle from '@/modules/common/icons/AxeCircle.vue';
import { ref } from 'vue';
import { useProjectsStore } from '../store/projects.store';

const modalOpen = ref(false); // Esta variable es global, no se puede pasar como prop
const customModalOpen = ref(false);

// Implementación de pinia el store
const projectsStore = useProjectsStore();
</script>
