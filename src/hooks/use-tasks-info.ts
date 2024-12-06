import { api } from '@/functions/api';
import { monthsNames } from '@/lib/data';
import { auth } from '@clerk/nextjs/server';
import dayjs from 'dayjs';

export async function useTasksInfo() {
  const { getToken } = auth();
  const token = await getToken();
  const currentMonth = monthsNames[dayjs().month()];
  const currentYear = dayjs().year();
  const currentDay = dayjs().date();

  const amountCompletedTasksResponse = await api('/tasks/completed/amount', {
    next: {
      revalidate: 3600,
      tags: ['get-amount-completed-tasks'],
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const amountCompletedTasks: number = await amountCompletedTasksResponse.json();

  return {
    amountCompletedTasks,
    currentMonth,
    currentYear,
    currentDay,
  };
}
