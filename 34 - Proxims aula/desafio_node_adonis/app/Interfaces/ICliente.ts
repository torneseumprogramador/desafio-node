export interface ICliente {
  id?: number
  nome: string
  whatsapp: string
  cep: string
  logradouro: string
  numero: string
  complemento?: string
  bairro: string
  cidade: string
  estado: string
  created_at?: Date
  updated_at?: Date
}