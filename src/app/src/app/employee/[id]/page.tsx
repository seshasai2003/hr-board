'use client'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { User } from '@/types/user'
import { Tabs } from '@/components/Tabs'

export default function EmployeePage() {
  const { id } = useParams()
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`)
      const data = await res.json()
      const enriched: User = {
        id: data.id,
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        age: data.age,
        department: ['Engineering', 'Marketing', 'HR', 'Sales'][Math.floor(Math.random() * 4)],
        rating: Math.ceil(Math.random() * 5),
        image: data.image,
        phone: data.phone,
        address: `${data.address.address}, ${data.address.city}`,
        bio: 'Team player with strong communication and analytical skills.',
        history: Array.from({ length: 5 }, (_, i) => ({ year: 2018 + i, score: Math.ceil(Math.random() * 5) }))
      }
      setUser(enriched)
    }
    fetchUser()
  }, [id])

  if (!user) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="text-center">
        <img src={user.image} className="mx-auto w-24 h-24 rounded-full" alt={user.name} />
        <h1 className="text-2xl font-semibold mt-2">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-400">{user.department} | {user.age} yrs</p>
        <p className="mt-2">📍 {user.address}</p>
      </div>

      <Tabs user={user} />
    </div>
  )
}
