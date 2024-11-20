<script setup lang="ts">
import { Project } from '../types/project';

defineProps<{ project: Project }>()
</script>

<template>
   <v-card class="rounded-lg">
      <v-card-title class="pa-0">
        <v-img
          color="surface-variant"
          height="200"
          src="https://cdn.vuetifyjs.com/docs/images/cards/purple-flowers.jpg"
          cover
        >
          <div class="fill-height d-flex justify-end align-end ga-4 pa-3">
            <v-icon :class="{ 'text-favorite': project.isFavorite }">mdi-star</v-icon>
            <v-btn
              icon 
              size="x-small"
              class="rounded-xl	bg-white"
            >
              <v-icon color="accent">mdi-dots-horizontal</v-icon>
            </v-btn>
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
            <span>{{ project.startDate }}</span>
          </div>
          <div class="d-flex ga-2 py-1">
            <v-icon>mdi-calendar-check-outline</v-icon>
            <span>{{ project.endDate }}</span>
          </div> 
        </section>
    </v-card-text>

      
    </v-card>
</template>

<style scoped> 
</style>
