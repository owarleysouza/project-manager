# Project Manager

## 1. Conceito

O **Project Manager** é uma aplicação projetada para facilitar a organização e o gerenciamento de projetos. Ele permite que os usuários adicionem, visualizem, editem, excluam, favoritem e filtrem seus projetos.

## 2. Funcionalidades

- **Adicionar Projeto**: Os usuários podem inserir novos projetos, especificando informações como nome, cliente, data de início, data final e imagem.
- **Visualização de Projetos**: A aplicação exibe uma lista dos projetos adicionados, permitindo fácil acesso e gerenciamento.
- **Persistência de Dados**: Os projetos são armazenados no navegador do usuário, garantindo que os dados sejam salvos e acessíveis mesmo após a reinicialização da aplicação.
- **Editar Projeto**: Os usuários podem editar os dados dos projetos.
 - **Excluir Projeto**: Os usuários podem excluir os projetos.
 - **Favoritar Projeto**: Os usuários podem favoritar os projetos.
 - **Filtrar Projeto**: Os usuários podem filtrar projetos favoritos, por ordem alfabética, iniciados primeiro e mais próximos de finalizar.
 - **Buscar Projeto**: Os usuários podem buscar projetos a partir do nome.

## 3. Tecnologias

- **VueJs**: Utilizado para construção de interfaces de usuário.
- **TypeScript**: Para tipagem estática, melhorando a qualidade e a manutenção do código.
- **Local Storage**: Usado para persistência de dados com Firestore.
- **Vuetify**: Para estilização da interface, validação de formulários e utilização de componentes reutilizáveis.
- **Pinia**: Para gerenciamento de estado global

## 4. Como Executar a Aplicação

### Acessar online

A aplicação também está publicada na Vercel. Para acessá-la, basta visitar o link https://the-project-manager.vercel.app/

### Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/owarleysouza/project-manager.git
   ```
2. Navegue até o diretório do projeto:
   cd project-manager

3. Instale as dependências:
   npm install

4. Execute a aplicação:
   npm run dev
