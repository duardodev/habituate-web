import { SelectItem } from '@/components/ui/select';
import { StatusDot } from '@/components/ui/status-dot';

interface PriorityItemProps {
  value: string;
  name: string;
  className?: string;
}

export function PriorityItem({ value, name, className }: PriorityItemProps) {
  return (
    <SelectItem value={value}>
      <span className="flex items-center gap-2">
        <StatusDot className={className} />
        <span className="truncate">{name}</span>
      </span>
    </SelectItem>
  );
}
