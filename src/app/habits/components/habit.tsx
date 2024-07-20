'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toggleHabit, updateHabit } from '@/app/actions';
import { useDateStore } from '@/store/date-store';
import { UserActionsMenu } from './user-actions-menu';
import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAuth } from '@clerk/nextjs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import dayjs from 'dayjs';

interface HabitProps {
  id: string;
  title: string;
}

interface Day {
  id: string;
  date: Date;
}

async function fetchDaysWithCompletedHabit(id: string, token: string) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/completed-habits/${id}/days`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  return data.map((dayWithSpecificHabitCompleted: Day) => dayWithSpecificHabitCompleted.date);
}

export function Habit({ id, title }: HabitProps) {
  const { currentDate } = useDateStore();
  const [currentTitle, setCurrentTitle] = useState(title);
  const [temporaryTitle, setTemporaryTitle] = useState(title);
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [completedDays, setCompletedDays] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.startOf('week').add(i, 'day'));
  const today = dayjs();

  const { data: daysWithSpecificHabitCompleted = [], isSuccess } = useQuery({
    queryKey: ['days-with-specific-comleted-habit', id],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token not available');
      return fetchDaysWithCompletedHabit(id, token);
    },
  });

  const { mutateAsync: toggleHabitFn } = useMutation({
    mutationFn: (date: string) => toggleHabit(id, date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['days-with-specific-comleted-habit', id] });
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTemporaryTitle(newTitle);
  };

  useEffect(() => {
    if (isSuccess) {
      setCompletedDays(daysWithSpecificHabitCompleted);
    }
  }, [isSuccess]);

  function handleHabitTitleRename() {
    if (temporaryTitle.trim() === '') {
      setTemporaryTitle(currentTitle);
      setIsTitleEditing(false);
      return;
    }

    setCurrentTitle(temporaryTitle);
    setIsTitleEditing(false);
    updateHabit(id, temporaryTitle);
  }

  async function handleHabitToggle(date: string) {
    setCompletedDays(prev => {
      if (prev.includes(date)) {
        return prev.filter(d => d !== date);
      } else {
        return [...prev, date];
      }
    });

    try {
      await toggleHabitFn(date);
    } catch (error) {
      setCompletedDays(prev => {
        if (prev.includes(date)) {
          return prev.filter(d => d !== date);
        } else {
          return [...prev, date];
        }
      });
    }
  }

  return (
    <li className="flex items-center justify-between gap-10">
      <div className="group flex items-center min-w-32">
        {isTitleEditing ? (
          <Input
            type="text"
            value={temporaryTitle}
            className="h-7 py-3 text-base focus-visible:ring-transparent"
            onChange={handleTitleChange}
            onBlur={handleHabitTitleRename}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleHabitTitleRename();
              }
            }}
          />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <h2 className="text-start truncate hover:text-foreground/85 cursor-pointer transition-colors">{currentTitle}</h2>
            </DropdownMenuTrigger>
            <UserActionsMenu habitId={id} onRename={() => setIsTitleEditing(true)} />
          </DropdownMenu>
        )}
      </div>

      <div className="flex items-center gap-x-6">
        {currentWeekDays.map(currentWeekDay => {
          const isDisabled = currentWeekDay.isAfter(today, 'day');
          const isChecked = completedDays.includes(currentWeekDay.utc().startOf('day').toISOString());
          return (
            <Checkbox
              key={currentWeekDay.toString()}
              onClick={() => handleHabitToggle(currentWeekDay.utc().startOf('day').toISOString())}
              disabled={isDisabled}
              checked={isChecked}
            />
          );
        })}
      </div>
    </li>
  );
}
