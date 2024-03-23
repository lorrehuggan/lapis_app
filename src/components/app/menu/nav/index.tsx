import { Button } from "@/components/ui/button";
import { Archive, Settings, User } from "lucide-react";

export default function Nav() {
  return (
    <div className="flex items-center flex-col h-full justify-between">
      <nav className="space-y-2 flex flex-col items-center">
        <Button size="icon">
          <Archive size={16} />
        </Button>
        <Button size="icon">
          <Settings size={16} />
        </Button>
      </nav>
      <Button size="icon">
        <User size={16} />
      </Button>
    </div>
  );
}
