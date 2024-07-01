'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { api } from '@/functions/api';

export async function addHabit(formData: FormData) {
  const token = cookies().get('token')?.value;
  const title = formData.get('title') as string;

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
      error: 'Error ao adicionar um novo hábito!',
    };
  }

  revalidateTag('get-habits');
}

export async function toggleHabit(id: string, date: string) {
  const token = cookies().get('token')?.value;

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
  const token = cookies().get('token')?.value;

  await api(`/habits/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag('get-habits');
}

export async function updateHabit(id: string, title: string) {
  const token = cookies().get('token')?.value;

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
