import { http, HttpResponse } from 'msw';

export const updateHabitMock = http.put('http://localhost:3333/habits/:id', async () => {
  return HttpResponse.json(null, {
    status: 200,
  });
});
