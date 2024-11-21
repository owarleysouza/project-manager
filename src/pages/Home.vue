<script setup lang="ts"> 
import { computed, ref } from 'vue';
import BlankState from '../components/BlankState.vue'; 
import ProjectCard from '../components/ProjectCard.vue';
 
import { useDisplay } from 'vuetify' 
import { useRouter } from 'vue-router';
import { useProjectsStore } from '../stores/projectsStore';
import { useSearchStore } from '../stores/searchStore';

const { smAndDown } = useDisplay()

const router = useRouter()

const onlyProjectFavorites = ref(false);

const snackbar = ref(false);

const projectsStore = useProjectsStore(); 

const timeout = 2000;

const filters = [
  { text: 'Ordem alfabética', value: 'alphabetical' },
  { text: 'Iniciados mais recentes', value: 'recentlyStarted' },
  { text: 'Prazo mais próximo', value: 'endingSoon' },
];

const selectedFilter = ref('alphabetical'); 

const searchStore = useSearchStore(); 

const combinedFilteredProjects = computed(() => { 
  let projects = [...projectsStore.projects];  

  if (onlyProjectFavorites.value ) {
    const favoritedProjects = projects.filter((project) => project.isFavorite);
    if(favoritedProjects.length) projects = favoritedProjects
  }

  if (searchStore.searchQuery && searchStore.searchQuery.length >= 3) {
    const searchedProjects = projects.filter((project) =>
      project.name.toLowerCase().includes(searchStore.searchQuery.toLowerCase())
    );
    if(searchedProjects.length) projects = searchedProjects
    else snackbar.value = true
    
  }

  switch (selectedFilter.value) {
    case 'alphabetical':
      projects = projects.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'recentlyStarted':
      projects = projects.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
      break;
    case 'endingSoon':
      projects = projects
        .filter((p) => p.endDate)
        .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
      break;
  }

  return projects;
});

const goToCreateProject = () => router.push({ path: 'create-project' })
</script>

<template>
  <v-app>
    <v-main class="pa-6">
      <BlankState v-if="combinedFilteredProjects.length === 0"/> 
      
      <v-container v-else class="pa-4">
        <div class="d-flex flex-row flex-wrap justify-space-between ga-2 py-4" :class="     {'flex-column': smAndDown}">
    
          <div class="d-flex flex-row ga-2" :class="{'justify-center': smAndDown}">
            <h3 class="text-primary" >Projetos</h3>
            <h3 class="text-textGray font-weight-regular">({{ combinedFilteredProjects.length }})</h3>
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
            <v-select
              v-model="selectedFilter"
              :items="filters" 
              item-value="value" 
              item-title="text"   
              outlined
              density="compact"
              hide-details="auto" 
              variant="solo"
            />
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
            v-for="project in combinedFilteredProjects"
            :key="project.id"
            cols="12" sm="6" md="3"
          >
            <ProjectCard :key="project.id" :project="project" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      color="white"
    >
      Nenhum projeto encontrado :(

      <template v-slot:actions>
        <v-btn
          color="accent"
          variant="text"
          @click="snackbar = false"
        >
          Fechar
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
