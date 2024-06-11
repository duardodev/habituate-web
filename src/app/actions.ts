'use server';

import { api } from '@/functions/api';
import { revalidateTag } from 'next/cache';

export async function addHabit(formData: FormData) {
  const title = formData.get('title') as string;

  await new Promise(resolve => setTimeout(resolve, 200));

  try {
    await api('/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
      }),
    });
  } catch (error) {
    return {
      error: 'Error ao adicionar um novo hábito!',
    };
  }

  revalidateTag('get-habits');
}

export async function toggleHabit(id: string, date: string) {
  await api(`/habits/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ date }),
  });
}
