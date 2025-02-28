import { HabitsResponse } from '../get-habits';
import { http, HttpResponse } from 'msw';

export const getHabitsMock = http.get<never, HabitsResponse>('http://localhost:3333/habits', async () => {
  return HttpResponse.json(
    {
      habits: [
        {
          id: 'habit-1',
          title: 'Correr 1KM',
          emoji: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1fab4.png',
        },
        {
          id: 'habit-2',
          title: 'Ler 30 minutos',
          emoji: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1fab4.png',
        },
        {
          id: 'habit-3',
          title: 'Academia',
          emoji: 'https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1fab4.png',
        },
      ],
    },
    { status: 200 }
  );
});
