import { removeHabit } from '@/app/actions';
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';

interface UserActionsMenuProps {
  habitId: string;
  onRename: () => void;
}

export function UserActionsMenu({ habitId, onRename }: UserActionsMenuProps) {
  return (
    <DropdownMenuContent className="w-32">
      <DropdownMenuItem onClick={onRename}>
        <Edit className="mr-2 h-4 w-4" />
        <span>Renomear</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => removeHabit(habitId)}>
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Remover</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
