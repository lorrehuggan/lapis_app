import { Button } from "@/components/ui/button";
import { Archive, Pen, Settings, User } from "lucide-react";

export default function Nav() {
  return (
    <div className="flex items-center flex-col h-full justify-between">
      <nav className="space-y-2 flex flex-col items-center">
        <Button asChild size="icon">
          <a href="/app/editor">
            <Pen size={16} />
          </a>
        </Button>
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
