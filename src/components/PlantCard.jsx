import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';

export default function PlantCard({ plant, index }) {
  const add = useCart(s => s.add);
  return (
    <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay: index*0.1 }}>
      <Card>
        <img src={plant.image} alt={plant.name} className="w-full h-48 object-cover"/>
        <CardContent>
          <CardTitle>{plant.name}</CardTitle>
          <p className="text-sm">{plant.description}</p>
        </CardContent>
        <CardFooter>
          <span className="font-bold">{plant.price} ₽</span>
          <Button onClick={() => add(plant)}>В корзину</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
