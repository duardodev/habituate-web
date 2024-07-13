'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toggleHabit, updateHabit } from '@/app/actions';
import { useDateStore } from '@/store/date-store';
import { UserActionsMenu } from './user-actions-menu';
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { getCookie } from 'cookies-next';
import dayjs from 'dayjs';

interface HabitProps {
  id: string;
  title: string;
}

interface Day {
  id: string;
  date: Date;
}

async function getDaysWithCompletedHabit(id: string) {
  const token = getCookie('token');
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

  const currentWeekDays = Array.from({ length: 7 }, (_, i) => currentDate.utc().startOf('week').add(i, 'day'));
  const queryClient = useQueryClient();
  const today = dayjs();

  const { data: daysWithSpecificHabitCompleted = [], isSuccess } = useQuery({
    queryKey: ['days-with-specific-comleted-habit', id],
    queryFn: () => getDaysWithCompletedHabit(id),
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

  async function handleHabitTitleRename() {
    if (temporaryTitle.trim() === '') {
      setTemporaryTitle(currentTitle);
      setIsTitleEditing(false);
      return;
    }

    await updateHabit(id, temporaryTitle);
    setCurrentTitle(temporaryTitle);
    setIsTitleEditing(false);
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
    <li className="flex items-center justify-between">
      <div className="group flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isTitleEditing}>
            {isTitleEditing ? (
              <Input
                type="text"
                value={temporaryTitle}
                className="h-7 py-3 text-base focus-visible:ring-transparent"
                onChange={handleTitleChange}
                onBlur={handleHabitTitleRename}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleHabitTitleRename();
                  }
                }}
              />
            ) : (
              <h2 className="hover:text-foreground/85 transition-colors">{currentTitle}</h2>
            )}
          </DropdownMenuTrigger>
          <UserActionsMenu habitId={id} onRename={() => setIsTitleEditing(true)} />
        </DropdownMenu>
      </div>
      <div className="flex items-center gap-x-6">
        {currentWeekDays.map(currentWeekDay => {
          const isDisabled = currentWeekDay.isAfter(today, 'day');
          const isChecked = completedDays.includes(currentWeekDay.toISOString());
          return (
            <Checkbox
              key={currentWeekDay.toString()}
              onClick={() => handleHabitToggle(currentWeekDay.toISOString())}
              disabled={isDisabled}
              checked={isChecked}
            />
          );
        })}
      </div>
    </li>
  );
}
