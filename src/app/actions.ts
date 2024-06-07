'use server';

import { api } from '@/functions/api';

export async function addHabit(formData: FormData) {
  const title = formData.get('title');

  await new Promise(resolve => setTimeout(resolve, 200));

  await api('/habits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
    }),
  });
}
