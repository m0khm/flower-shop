// src/components/PlantCard.jsx
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/store/cart';

export default function PlantCard({ plant, index }) {
  const add = useCart((s) => s.add);
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="h-64 w-full overflow-hidden">
          <img
            src={plant.image}
            alt={plant.name}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="flex-1">
          <CardTitle className="text-xl">{plant.name}</CardTitle>
          <p className="text-base mt-2">{plant.description}</p>
        </CardContent>
        <CardFooter className="justify-between items-center">
          <span className="text-lg font-bold">{plant.price} ₽</span>
          <Button onClick={() => add(plant)}>В корзину</Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
