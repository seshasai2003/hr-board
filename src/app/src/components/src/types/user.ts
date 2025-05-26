export interface User {
  id: number
  name: string
  email: string
  age: number
  department: string
  rating: number
  image: string
  phone?: string
  address?: string
  bio?: string
  history?: { year: number; score: number }[]
}
