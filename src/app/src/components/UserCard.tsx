import Link from 'next/link'
import { User } from '@/types/user'

type Props = {
  user: User
  onBookmark: () => void
  isBookmarked: boolean
}

export default function UserCard({ user, onBookmark, isBookmarked }: Props) {
  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer flex flex-col">
      <img src={user.image} alt={user.name} className="w-20 h-20 rounded-full mx-auto" />
      <h2 className="text-lg font-semibold mt-2 text-center">{user.name}</h2>
      <p className="text-center text-gray-600">{user.email}</p>
      <p className="text-center text-sm text-gray-500">{user.age} yrs | {user.department}</p>

      <div className="flex justify-center mt-2 space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < user.rating ? 'text-yellow-400' : 'text-gray-300'}>★</span>
        ))}
      </div>

      <div className="mt-4 flex justify-around">
        <Link href={`/employee/${user.id}`}>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">View</button>
        </Link>
        <button
          onClick={onBookmark}
          className={`px-3 py-1 rounded border ${isBookmarked ? 'bg-yellow-300 border-yellow-500' : 'border-gray-400 hover:bg-gray-200'}`}
        >
          {isBookmarked ? 'Bookmarked' : 'Bookmark'}
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">Promote</button>
      </div>
    </div>
  )
}
