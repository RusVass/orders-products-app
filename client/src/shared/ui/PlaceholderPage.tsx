import { EmptyState } from './EmptyState';

interface PlaceholderPageProps {
  title: string;
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <div className="placeholder-page">
      <h1>{title}</h1>
      <EmptyState message="Under Development" />
    </div>
  );
}
