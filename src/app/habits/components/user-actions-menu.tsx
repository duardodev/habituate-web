import { DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Edit, Trash2 } from 'lucide-react';

interface UserActionsMenuProps {
  onRename: () => void;
  onRemove: () => void;
}

export function UserActionsMenu({ onRename, onRemove }: UserActionsMenuProps) {
  return (
    <DropdownMenuContent className="w-32">
      <DropdownMenuItem onClick={onRename} className="cursor-pointer">
        <Edit className="mr-2 h-4 w-4" />
        <span>Renomear</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={onRemove} className="cursor-pointer">
        <Trash2 className="mr-2 h-4 w-4" />
        <span>Remover</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
