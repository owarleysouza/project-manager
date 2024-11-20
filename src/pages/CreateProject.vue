<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()  
</script>

<template>
  <v-app>
    <v-main class="d-flex flex-column ga-1 pa-6">
      <div class="d-flex flex-row ga-1 align-center">
        <v-icon @click="() => router.push({ path: '/' })" size="small" color="accent">mdi-arrow-left</v-icon>
        <h4 class="text-accent font-weight-light">Voltar</h4>
      </div> 
      <h3 class="text-primary font-weight-bold">Novo projeto</h3>
    </v-main>
  </v-app>

  
</template>

<style scoped>

</style>
