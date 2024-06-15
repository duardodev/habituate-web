import { removeHabit } from '@/app/actions';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Trash2 } from 'lucide-react';

interface UserActionsMenuProps {
  habitId: string;
}

export function UserActionsMenu({ habitId }: UserActionsMenuProps) {
  return (
    <DropdownMenuContent className="w-40">
      <DropdownMenuLabel>Ações do usuário</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => removeHabit(habitId)}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Remover</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
