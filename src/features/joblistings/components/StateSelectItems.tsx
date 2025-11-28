import { SelectItem } from "@/components/ui/select";
import states from "@/data/states.json";
export function StateSlectItems() {
  return Object.entries(states).map(([abberviation, name]) => (
    <SelectItem key={abberviation} value={name}>
      {name}
    </SelectItem>
  ));
}
