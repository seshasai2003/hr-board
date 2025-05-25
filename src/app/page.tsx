'use client'
import { useEffect, useState } from 'react'
import UserCard from '@/components/UserCard'
import { User } from '@/types/user'
import { SearchBar } from '@/components/SearchBar'
import { FilterPanel } from '@/components/FilterPanel'
import useBookmarks from '@/hooks/useBookmarks'

export default function HomePage() {
  const [users, setUsers] = useState<User[]>([])
  const [filtered, setFiltered] = useState<User[]>([])
  const { bookmarks, toggleBookmark } = useBookmarks()

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('https://dummyjson.com/users?limit=20')
      const data = await res.json()
      const enriched = data.users.map((user: any) => ({
        id: user.id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        age: user.age,
        department: ['Engineering', 'Marketing', 'HR', 'Sales'][Math.floor(Math.random() * 4)],
        rating: Math.ceil(Math.random() * 5),
        image: user.image,
        phone: user.phone,
        address: `${user.address.address}, ${user.address.city}`,
        bio: 'Experienced professional with a background in team leadership and client relations.',
        history: Array.from({ length: 5 }, (_, i) => ({ year: 2018 + i, score: Math.ceil(Math.random() * 5) }))
      }))
      setUsers(enriched)
      setFiltered(enriched)
    }
    fetchUsers()
  }, [])

  return (
    <main className="p-6 space-y-4">
      <SearchBar data={users} onFilter={setFiltered} />
      <FilterPanel data={users} onFilter={setFiltered} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((user) => (
          <UserCard key={user.id} user={user} onBookmark={() => toggleBookmark(user)} isBookmarked={bookmarks.some(b => b.id === user.id)} />
        ))}
      </div>
    </main>
  )
}
