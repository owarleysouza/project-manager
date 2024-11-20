<script setup lang="ts"> 
import { computed, ref } from 'vue';
import BlankState from '../components/BlankState.vue'; 
import ProjectCard from '../components/ProjectCard.vue';
 
import { useDisplay } from 'vuetify'
import { Project } from '../types/project';
import { useRouter } from 'vue-router';

const { smAndDown } = useDisplay()

const router = useRouter()

const onlyProjectFavorites = ref(false);
 
const projects: Project[] = [
  {
    id: '1',
    name: 'Projeto 1',
    client: 'Cliente A',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    image: 'https://via.placeholder.com/150',
    isFavorite: false
  },
  {
    id: '2',
    name: 'Projeto 2',
    client: 'Cliente B',
    startDate: '2024-02-15',
    endDate: '2024-06-30',
    image: 'https://via.placeholder.com/150',
    isFavorite: true
  },
  {
    id: '3',
    name: 'Projeto 3',
    client: 'Cliente C',
    startDate: '2024-03-10',
    endDate: '2024-09-20',
    image: 'https://via.placeholder.com/150',
    isFavorite: true
  },
];

const filteredProjects = computed(() => {   
  if (onlyProjectFavorites.value) {
    return projects.filter((project) => project.isFavorite);
  }
  return projects;
});

const goToCreateProject = () => router.push({ path: 'create-project' })

</script>

<template>
  <v-app>
    <v-main class="pa-6">
      <BlankState v-if="filteredProjects.length === 0"/>
      
      <v-else v-container class="pa-4">
        <div class="d-flex flex-row flex-wrap justify-space-between ga-2 py-4" :class="{'flex-column': smAndDown}">
    
        <div class="d-flex flex-row ga-2" :class="{'justify-center': smAndDown}">
          <h3 class="text-primary" >Projetos</h3>
          <h3 class="text-textGray font-weight-regular">({{ onlyProjectFavorites ? `${filteredProjects.length} de ${projects.length}` : projects.length }})</h3>
        </div>

       
        <div 
          class="d-flex flex-row ga-4 justify-center align-center" 
          :class="{'flex-column': smAndDown}"
        >
          <v-switch 
            hide-details="auto" 
            label="Apenas Favoritos" 
            color="favorite" 
            class="text-sm text-textBlack" 
            v-model="onlyProjectFavorites"
          ></v-switch>
          <span>SELECT</span>
          <v-btn 
            prepend-icon="mdi-plus-circle-outline" 
            rounded="xl" 
            variant="flat" 
            class="bg-accent text-capitalize"
            @click="goToCreateProject"
          >
            Novo projeto
          </v-btn>
        </div>
      </div>
        <v-row>
          <v-col
            v-for="project in filteredProjects"
            :key="project.id"
            cols="12" sm="6" md="3"
          >
            <ProjectCard :key="project.id" :project="project" />
          </v-col>
        </v-row>
      </v-else>
    </v-main>
  </v-app>
 
</template>
