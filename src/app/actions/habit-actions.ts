'use server';

import { revalidateTag } from 'next/cache';
import { api } from '@/functions/api';
import { auth } from '@clerk/nextjs/server';

export async function addHabit(formData: FormData) {
  const { getToken, userId } = auth();
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

    revalidateTag(`add-habit/${userId}`);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Error adding a new habit!',
    };
  }
}

export async function toggleHabit(id: string, date: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    await api(`/habits/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ date }),
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to toggle habit!',
    };
  }
}

export async function deleteHabit(id: string) {
  const { getToken, userId } = auth();
  const token = await getToken();

  try {
    await api(`/habits/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag(`delete-habit/${userId}`);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to delete habit!',
    };
  }
}

export async function updateHabitTitle(id: string, title: string) {
  const { getToken, userId } = auth();
  const token = await getToken();

  try {
    await api(`/habits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    revalidateTag(`update-habit-title/${userId}`);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to rename habit!',
    };
  }
}

export async function updateHabitEmoji(id: string, emoji: string) {
  const { getToken } = auth();
  const token = await getToken();

  try {
    await api(`/habits/${id}/emoji`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ emoji }),
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: 'Failed to update emoji!',
    };
  }
}
