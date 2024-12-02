import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { StatusDot } from '@/components/ui/status-dot';

export function PrioritySelect() {
  return (
    <div className="w-2/5 group relative">
      <label
        htmlFor="select-28"
        className="absolute start-1 top-0 z-10 block -translate-y-1/2 bg-background px-2 text-xs font-medium text-foreground group-has-[:disabled]:opacity-50"
      >
        Selecionar prioridade
      </label>

      <Select defaultValue="p1" name="priority">
        <SelectTrigger id="select-28">
          <SelectValue placeholder="Select framework" />
        </SelectTrigger>
        <SelectContent className="[&_*[role=option]>span>svg]:shrink-0 [&_*[role=option]>span>svg]:text-muted-foreground/80 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
          <SelectItem value="p1">
            <span className="flex items-center gap-2">
              <StatusDot className="text-red-500" />
              <span className="truncate">Alta</span>
            </span>
          </SelectItem>
          <SelectItem value="p2">
            <span className="flex items-center gap-2">
              <StatusDot className="text-amber-500" />
              <span className="truncate">Média</span>
            </span>
          </SelectItem>
          <SelectItem value="p3">
            <span className="flex items-center gap-2">
              <StatusDot className="text-blue-500" />
              <span className="truncate">Baixa</span>
            </span>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
