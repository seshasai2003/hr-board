'use client'
import useBookmarks from '@/hooks/useBookmarks'
import UserCard from '@/components/UserCard'

export default function BookmarksPage() {
  const { bookmarks, toggleBookmark } = useBookmarks()

  return (
    <main className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">📌 Bookmarked Employees</h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map(user => (
            <UserCard
              key={user.id}
              user={user}
              onBookmark={() => toggleBookmark(user)}
              isBookmarked={true}
            />
          ))}
        </div>
      )}
    </main>
  )
}
