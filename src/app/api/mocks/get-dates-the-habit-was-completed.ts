import { http, HttpResponse } from 'msw';

interface GetDatesTheHabitWasCompletedMockParams {
  habitId: string;
}

interface GetDatesTheHabitWasCompletedMockResponse {
  datesTheHabitWasCompleted: {
    id: string;
    date: Date;
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
        { id: '1', date: new Date('2024-10-01') },
        { id: '2', date: new Date('2024-09-30') },
        { id: '3', date: new Date('2024-09-28') },
      ],
    },
    { status: 200 }
  );
});
