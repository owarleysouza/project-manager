<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useProjectsStore } from '../stores/projectsStore';

const router = useRouter();
const route = useRoute();  
const projectsStore = useProjectsStore();
 
const project = ref({
  id: '',
  name: '',
  client: '',
  startDate: new Date(),
  endDate: new Date(),
  image: 'https://via.placeholder.com/150',
  isFavorite: false
});

const isFormValid = ref(false);
 
const endAfterStart = (value: Date) => {
  if (!value || !project.value.startDate) return true;

  const startDate = project.value.startDate;
  const endDate = project.value.endDate;

  if (!(startDate instanceof Date) || !(endDate instanceof Date)) {
    return 'As datas são inválidas.';
  }

  return endDate >= startDate || 'A data final não pode ser antes da inicial';
};

const rules = {
  required: (value: string | undefined | null| Date) => !!value || 'Este campo é obrigatório',
  text: (value: string) => (value.length >= 3 && value.length <= 30) || 'Digite um texto entre 3 e 30 caracteres',
  endAfterStart,
};


const submitForm = () => {
  if (isFormValid.value) {
    projectsStore.updateProject({ ...project.value });
    router.push({ path: '/' });
  } else {
    alert('Por favor, corrija os erros no formulário.');
  }
};
 
onMounted(() => {
  const projectId = route.params.id;  
  const existingProject = projectsStore.getProjectById(projectId as string);

  if (existingProject) {
    project.value = { ...existingProject };

    if (typeof project.value.startDate === 'string') {
      project.value.startDate = new Date(project.value.startDate);
    }
    if (typeof project.value.endDate === 'string') {
      project.value.endDate = new Date(project.value.endDate);
    }
  } else {
    alert('Projeto não encontrado!');
    router.push({ path: '/' });
  }
});
</script>

<template>
  <v-app>
    <v-main class="d-flex flex-column ga-1 pa-6"> 
      <div class="d-flex flex-row ga-1 align-center">
        <v-icon @click="() => router.push({ path: '/' })" size="small" color="accent">mdi-arrow-left</v-icon>
        <h4 class="text-accent font-weight-light">Voltar</h4>
      </div>
      <h3 class="text-primary font-weight-bold">Editar Projeto</h3>

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

          <v-btn
            :disabled="!isFormValid"
            rounded="xl"
            variant="flat"
            class="text-capitalize"
            color="accent"
            @click="submitForm"
          >
            Salvar alterações
          </v-btn>
        </v-form>
      </section>
    </v-main>
  </v-app>
</template>

<style scoped>
.form {
  width: 50%;
}
</style>
