import { Button } from "@/components/ui/button";
import { Archive, Settings, Trash2, User } from "lucide-react";

export default function Nav() {
  return (
    <nav className="space-y-2 flex flex-col items-center">
      <Button size="icon">
        <Settings size={16} />
      </Button>
      <Button size="icon">
        <User size={16} />
      </Button>
      <Button size="icon">
        <Archive size={16} />
      </Button>
      <Button size="icon">
        <Trash2 size={16} />
      </Button>
    </nav>
  );
}
