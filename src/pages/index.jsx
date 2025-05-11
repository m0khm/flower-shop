import { useEffect, useState } from 'react';
import PlantCard from '@/components/PlantCard';

export default function Home() {
  const [plants, setPlants] = useState([]);
  useEffect(() => {
    fetch('/api/plants').then(r => r.json()).then(setPlants);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plants.map((p,i) => <PlantCard key={p.id} plant={p} index={i} />)}
    </div>
  );
}
