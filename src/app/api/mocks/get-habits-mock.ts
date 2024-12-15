import { HabitsResponse } from '@/hooks/use-fetch-habits';
import { http, HttpResponse } from 'msw';

export const getHabitsMock = http.get<never, HabitsResponse>('http://localhost:3333/habits', async () => {
  return HttpResponse.json(
    {
      habits: [
        { id: 'habit-1', title: 'Correr 1KM' },
        { id: 'habit-2', title: 'Ler 30 minutos' },
        { id: 'habit-3', title: 'Academia' },
      ],
    },
    { status: 200 }
  );
});
