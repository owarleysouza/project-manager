<script setup lang="ts">
import { useRouter } from 'vue-router';
import { Project } from '../types/project';

 
const router = useRouter()  
defineProps<{ project: Project }>()

</script>

<template>
  
  <v-app>
    <v-main class="pa-6">
      <div class="d-flex flex-row ga-1 align-center">
        <v-icon @click="() => router.push({ path: '/' })" size="small" color="accent">mdi-arrow-left</v-icon>
        <h4 class="text-accent font-weight-light">Voltar</h4>
      </div> 
      <h3 class="text-primary font-weight-bold">Editar Projeto</h3>
    </v-main>
  </v-app>
  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
