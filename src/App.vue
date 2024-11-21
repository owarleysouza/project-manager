<script setup lang="ts">
import { ref } from 'vue';  
import { useSearchStore } from './stores/searchStore';

const searchStore = useSearchStore();
const isSearching = ref(false);  

const toggleSearch = () => {
  isSearching.value = !isSearching.value;
  searchStore.setSearchQuery('');  
};

</script>

 
<template>
  <v-app>
    
    <v-app-bar :elevation="2" fixed class="bg-appBar">
      <v-app-bar-title class="d-flex justify-center ma-0">
      
        <template v-if="!isSearching">
          <v-img
            :width="180"
            :height="65"
            src="../../public/logo.svg"
          ></v-img>
        </template>
        <template v-else>
          <v-text-field
            v-model="searchStore.searchQuery"
            placeholder="Buscar projetos..."
            dense
            variant="solo"
            outlined
            clearable
            rounded
            class="searchInput"
            density="compact" 
          />
        </template>
      </v-app-bar-title> 
      
      <v-icon class="bg-appBar mr-4" @click="toggleSearch">{{ isSearching ? 'mdi-close' : 'mdi-magnify' }}</v-icon>      
    </v-app-bar>
   
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template> 

<style scoped> 
.searchInput{
  width: 300px !important;
  margin-top: 20px !important;
}
</style>
