import { NotFoundMessage } from '@/components/ui/data-result-message';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404: Page not found',
};

export default function NotFoundPage() {
  return <NotFoundMessage size="lg" />;
}
