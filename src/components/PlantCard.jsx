import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';

export default function PlantCard({ plant }) {
  const add = useCart((s) => s.add);

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
      <div className="h-48 w-full overflow-hidden">
        <img src={plant.image} alt={plant.name} className="object-cover w-full h-full" />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{plant.name}</h3>
        <p className="text-sm text-gray-600 flex-1">{plant.description}</p>
        <div className="mt-4 flex justify-between">
          <span className="font-bold">{plant.price} ₽</span>
          <Button onClick={() => add(plant)}>В корзину</Button>
        </div>
      </div>
    </div>
  );
}
