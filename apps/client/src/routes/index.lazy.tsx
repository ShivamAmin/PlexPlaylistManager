import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2 text-3xl font-bold underline">
      <h3>Playlist Management</h3>
    </div>
  )
}