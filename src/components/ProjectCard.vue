<script setup lang="ts">
import { ref } from 'vue';
import router from '../router';
import { useProjectsStore } from '../stores/projectsStore';
import { Project } from '../types/project';

defineProps<{ project: Project }>()

const projectsStore = useProjectsStore();

const formatDate = (date: Date) => {
  const newDate = new Date(date)
  return newDate.toLocaleDateString('pt-BR');
} 

const toggleFavorite = (projectId: string) => {
  projectsStore.toggleFavorite(projectId);
};

const deleteDialogVisible = ref(false);
const projectIdToDelete = ref<string | null>(null);

const openDeleteDialog = (projectId: string) => {
  projectIdToDelete.value = projectId;
  deleteDialogVisible.value = true;
};

const closeDeleteDialog = () => {
  deleteDialogVisible.value = false;
};

const deleteProject = (projectId: string) => {
  if (projectIdToDelete.value === projectId) {
    const index = projectsStore.projects.findIndex((project) => project.id === projectId);
    if (index !== -1) {
      projectsStore.projects.splice(index, 1);
      projectsStore.saveToLocalStorage(); 
      closeDeleteDialog();
    }
  }
};
 
</script>

<template>
  <div>
   <v-card class="rounded-lg">
      <v-card-title class="pa-0">
        <v-img
          color="surface-variant"
          height="200"
          src="./project-cover.png"
          cover
        >
          <div class="fill-height d-flex justify-end align-end ga-4 pa-3">
           
            <v-icon @click="toggleFavorite(project.id)" :class="{ 'text-favorite': project.isFavorite }">mdi-star</v-icon>

            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  icon 
                  size="x-small"
                  class="rounded-xl	bg-white"
                  v-bind="props"
                >
                  <v-icon color="accent">mdi-dots-horizontal</v-icon>
                </v-btn>  
              </template>
              <v-list>
                <v-list-item
                  
                >
                <v-list-item-title 
                  class="d-flex flex-row ga-2 cursor-pointer" 
                  @click="() => router.push({ path: `/edit-project/${project.id}` })"
                >
                    <v-icon color="accent">mdi-square-edit-outline</v-icon>
                    <span>Editar</span>
                  </v-list-item-title>
                  <v-divider class="my-2" />
                  <v-list-item-title 
                    class="d-flex flex-row ga-2 cursor-pointer"
                    @click="openDeleteDialog(project.id)"
                  >
                    <v-icon color="accent">mdi-delete-outline</v-icon>
                    <span>Excluir</span>
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>           
          </div>
        </v-img>
      </v-card-title>

      <v-card-text>
        <section class="d-flex flex-column py-4 ga-1">
          <span class="text-primary font-weight-bold text-subtitle-1">{{ project.name }}</span>
          <span><strong>Cliente:</strong> {{ project.client }}</span>
        </section>
      
        <v-divider></v-divider>

        <section class="d-flex flex-column py-4 ga-1">
          <div class="d-flex ga-2">
            <v-icon>mdi-calendar-today-outline</v-icon>
            <span>{{ formatDate(project.startDate) }}</span>
          </div>
          <div class="d-flex ga-2 py-1">
            <v-icon>mdi-calendar-check-outline</v-icon>
            <span>{{ formatDate(project.endDate) }}</span>
          </div> 
        </section>
    </v-card-text>
    </v-card>

    <v-dialog v-model="deleteDialogVisible" max-width="500px"> 
      <v-card dense class="d-flex flex-column align-center py-5 px-8">  
        <v-card-title class="d-flex flex-column align-center">
          <v-icon 
            color="white" 
            class="border rounded-xl bg-accent pa-5"
            size="x-small"
          >
            mdi-trash-can
          </v-icon>
          <span class="headline text-primary font-weight-medium">Remover projeto</span>
        </v-card-title>
         
        <v-card-text class="d-flex flex-column align-center ga-2">
          <span class="text-textGray">Essa ação removerá definitivamente o projeto:</span>
          <span class="text-primary text-h5">{{ project.name}}</span>
        </v-card-text>
        <v-card-actions class="d-flex flex-row justify-center"> 
          <v-btn 
            rounded="xl" 
            variant="outlined" 
            class="text-capitalize w-100"
            size="large"
            @click="closeDeleteDialog"
          >
          Cancelar
          </v-btn>
          <v-btn 
            rounded="xl" 
            variant="flat" 
            class="text-capitalize w-100"
            color="accent"
            size="large"
            @click="deleteProject(project.id)"
          >
          Confirmar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
 