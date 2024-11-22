<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { uuid } from 'vue-uuid';
import { useProjectsStore } from '../stores/projectsStore';
import { Project } from '../types/project';

const router = useRouter()  

const projectsStore = useProjectsStore();

const project = ref({
  id: '',
  name: '',
  client: '',
  startDate: new Date(),
  endDate: new Date(),
  image: '/project-cover.png',
  isFavorite: false
});
 
const isFormValid = ref(false);

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      project.value.image = reader.result as string; 
    };
    reader.readAsDataURL(file);
  }
};

const endAfterStart = (value: Date) => {
  if (!value || !project.value.startDate) return true

  const startDate = project.value.startDate
  const endDate = project.value.endDate 

  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return 'As datas são inválidas.'
  }

  return endDate >= startDate || 'A data final não pode ser antes da inicial'
}
 
const rules = {
  required: (value: string | undefined | null| Date) => !!value || 'Este campo é obrigatório',
  text: (value: string) => (value.length >= 3 && value.length <= 30) || 'Digite um texto entre 3 e 30 caracteres',
  endAfterStart,
};
  
const submitForm = () => {
  if (isFormValid.value) {
    let myuuid = uuid.v4();

    project.value.id = myuuid;
    
    projectsStore.addProject({ ...project.value as unknown as Project});
 
    router.push({ path: '/' })
    
  } else {
    alert('Por favor, corrija os erros no formulário.');
  }
};
</script>

<template>
  <v-app>
    <v-main class="d-flex flex-column ga-1 pa-6">
      <div class="d-flex flex-row ga-1 align-center">
        <v-icon @click="() => router.push({ path: '/' })" size="small" color="accent">mdi-arrow-left</v-icon>
        <h4 class="text-accent font-weight-light">Voltar</h4>
      </div> 
      <h3 class="text-primary font-weight-bold">Novo projeto</h3>

      <section class="d-flex flex-column align-center border-thin rounded py-4">
        <v-form ref="form" v-model="isFormValid" lazy-validation class="form d-flex flex-column ga-2">
          <v-text-field
            v-model="project.name"
            label="Nome do Projeto (Obrigatório)"
            :rules="[rules.required, rules.text]"
            outlined
            dense
            variant="solo"
            rounded
          /> 

          <v-text-field
            v-model="project.client"
            label="Cliente (Obrigatório)"
            :rules="[rules.required, rules.text]"
            outlined
            dense
            variant="solo"
            rounded
          />

          
          <v-date-input 
            label="Data de Início (Obrigatório)"
            prepend-icon=""
            append-inner-icon="$calendar"
            v-model="project.startDate"
            :rules="[rules.required]"
            variant="solo"
            rounded
          />
   
          <v-date-input 
            label="Data Final (Obrigatório)"
            prepend-icon=""
            append-inner-icon="$calendar"
            v-model="project.endDate"
            :rules="[rules.required, rules.endAfterStart]"  
            variant="solo"
            rounded
          /> 

          <v-file-input
            label="Capa do Projeto (Opcional)"
            @change="handleImageUpload"
            accept="image/*"
            variant="solo"
            rounded
            prepend-icon=""
            append-inner-icon="$file"
          />
          
          <v-btn
            :disabled="!isFormValid"
            rounded="xl" 
            variant="flat" 
            class="text-capitalize"
            color="accent"
            @click="submitForm"
          >
            Salvar projeto
          </v-btn>
        </v-form>
      </section>
    </v-main>
  </v-app>

  
</template>

<style scoped>
  .form{
    width: 50%;
  } 
</style>
