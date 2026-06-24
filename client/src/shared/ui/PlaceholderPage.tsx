import { EmptyState } from './EmptyState';

interface PlaceholderPageProps {
  title: string;
}

export const PlaceholderPage = ({ title }: PlaceholderPageProps) => (
  <div className="placeholder-page">
    <h1>{title}</h1>
    <EmptyState message="Under Development" />
  </div>
);
