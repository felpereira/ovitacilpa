export interface ComponentesTelas {
  id: number
  chave: string
  valor: string
  tipo: TipoComponent
  tela: number
  ordenacao: number
}

export enum TipoComponent {
  Money = 0,
  Text = 1,
}

export interface Telas {
  id: number
  nome: string
  ordenacao: number
  icone: string
}
