import { http, HttpResponse } from 'msw';

export const toggleHabitMock = http.patch('http://localhost:3333/habits/:id/toggle', async () => {
  return HttpResponse.json(null, {
    status: 200,
  });
});
