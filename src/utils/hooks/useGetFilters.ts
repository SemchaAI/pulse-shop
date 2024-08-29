import { api } from '@/services/api/baseApi';
import { Memory, type Color } from '@prisma/client';
import { useEffect, useState } from 'react';

interface updColors extends Omit<Color, 'id'> {
  id: string;
}
interface updMemory extends Omit<Memory, 'id'> {
  id: string;
}

interface IReturnProps {
  memory: updMemory[];
  colors: updColors[];
  loading: boolean;
}

export const useGetFilters = () => {
  const [memory, setMemory] = useState<IReturnProps['memory']>([]);
  const [colors, setColors] = useState<IReturnProps['colors']>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getColors = async () => {
      try {
        setLoading(true);
        const colorsAsync = await api.filters.getColors();
        const memoryAsync = await api.filters.getMemory();

        const updColors = colorsAsync.map((color) => ({
          ...color,
          id: String(color.id),
        }));

        const updMemory = memoryAsync.map((gb) => ({
          ...gb,
          id: String(gb.id),
        }));

        setColors(updColors);
        setMemory(updMemory);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getColors();
  }, []);
  return { colors, memory, loading };
};
