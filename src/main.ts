import { createApp } from 'vue'
import { createPinia } from 'pinia';
import './index.css'
import App from './App.vue'
import router from './router';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/VDateInput'


const app = createApp(App);

const vuetify = createVuetify({
  components: {
    VDateInput,
    ...components
  },
  locale: {
    locale: 'pt-BR',
  },
  directives,
  icons: {
    defaultSet: 'mdi',
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#1F1283",
          secondary: "#DCDCDC",
          accent: "#695CCD",
          textGray: "#717171",
          favorite: "#FFB23D",
          textBlack: "#1C1930",
          appBar: "#1C1930",
        },
      },
    },
  },
});

app.use(router);
app.use(createPinia());
app.use(vuetify);
app.mount('#app');