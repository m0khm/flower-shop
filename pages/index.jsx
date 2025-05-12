import useSWR from 'swr';
import PlantCard from '@/components/PlantCard';

const fetcher = (u) => fetch(u).then((r) => r.json());

export default function Home() {
  const { data: plants = [] } = useSWR('/api/plants', fetcher);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {plants.map((p) => <PlantCard key={p.id} plant={p} />)}
    </div>
  );
}
