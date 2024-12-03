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
      error: 'Error ao adicionar um novo hábito!',
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

export async function addTask(formData: FormData) {
  const { getToken } = auth();
  const title = formData.get('title') as string;
  const priority = formData.get('priority') as string;
  const token = await getToken();

  try {
    await api('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, priority }),
    });
  } catch (error) {
    return {
      error: 'Error ao adicionar uma nova tarefa!',
    };
  }

  revalidateTag('get-tasks');
}

export async function toggleTask(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/tasks/${id}/toggle`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag('get-amount-completed-tasks');
}

export async function removeTask(id: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  revalidateTag('get-tasks');
}

export async function updateTask(id: string, title: string) {
  const { getToken } = auth();
  const token = await getToken();

  await api(`/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });

  revalidateTag('get-tasks');
}
