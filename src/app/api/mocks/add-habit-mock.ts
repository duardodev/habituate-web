import { http, HttpResponse } from 'msw';

export const addHabitMock = http.post('http://localhost:3333/habits', async () => {
  return HttpResponse.json(null, {
    status: 201,
  });
});
