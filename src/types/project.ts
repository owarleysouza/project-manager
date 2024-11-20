export interface Project {
  id: string;          // Identificador único do projeto
  name: string;        // Nome do projeto
  client: string;      // Nome do cliente
  startDate: string;   // Data de início
  endDate: string;     // Data final
  image: string;       // Caminho da imagem (URL ou caminho relativo)
  isFavorite: boolean;
}