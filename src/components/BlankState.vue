<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const goToCreateProject = () => router.push({ path: 'create-project' })
</script>

<template>
   <section class="d-flex flex-column justify-center align-center ga-4 bg-white fill-height rounded-lg"> 
      <div class="text-primary font-weight-bold">
        Nenhum projeto :(
      </div>
      <span class="text-textGray">Clique no botão abaixo para criar o primeiro e gerenciá-lo.</span>
      <v-btn prepend-icon="mdi-plus-circle-outline" rounded="xl" variant="flat" class="bg-accent text-capitalize" @click="goToCreateProject">
        Novo projeto
      </v-btn>
    </section>
</template>

<style scoped> 
</style>
