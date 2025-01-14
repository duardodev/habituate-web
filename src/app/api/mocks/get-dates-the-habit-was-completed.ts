import { http, HttpResponse } from 'msw';

interface GetDatesTheHabitWasCompletedMockParams {
  habitId: string;
}

interface GetDatesTheHabitWasCompletedMockResponse {
  datesTheHabitWasCompleted: {
    id: string;
    date: string;
  }[];
}

export const getDatesTheHabitWasCompletedMock = http.get<
  GetDatesTheHabitWasCompletedMockParams,
  never,
  GetDatesTheHabitWasCompletedMockResponse
>('http://localhost:3333/completed-habits/:id/days', async () => {
  return HttpResponse.json(
    {
      datesTheHabitWasCompleted: [
        { id: '1', date: '2025-01-10T03:00:00.000Z' },
        { id: '2', date: '2025-01-09T03:00:00.000Z' },
        { id: '3', date: '2025-01-08T03:00:00.000Z' },
      ],
    },
    { status: 200 }
  );
});
