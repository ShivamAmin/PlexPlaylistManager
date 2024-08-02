import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/config')({
  component: Config,
})

function Config() {
  return <div className="p-2">Configuration</div>
}