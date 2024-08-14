import { createLazyFileRoute } from '@tanstack/react-router';
import { PlexLoginButton } from '../components/PlexLoginButton';

export const Route = createLazyFileRoute('/login')({
  component: () => <PlexLoginButton />
})