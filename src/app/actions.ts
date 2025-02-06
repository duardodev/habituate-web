'use server';

import { revalidateTag } from 'next/cache';
import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

export async function addHabit(formData: FormData) {
  const { getToken } = auth();
  const title = formData.get('title') as string;
  const token = await getToken();

  try {
    await api('/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });
  } catch (error) {
    return {
      error: 'Error adding a new habit!',
    };
  }

  revalidateTag('get-habits');
}

export async function toggleHabit(id: string, date: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/habits/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ date }),
  });
}

export async function removeHabit(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/habits/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag('get-habits');
}

export async function updateHabit(id: string, title: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/habits/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  revalidateTag('get-habits');
}

export async function updateHabitEmoji(id: string, emoji: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/habits/${id}/emoji`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ emoji }),
  });
}
