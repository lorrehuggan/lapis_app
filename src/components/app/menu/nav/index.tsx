import { Button } from "@/components/ui/button";
import { Archive, BrainCircuit, Settings, User } from "lucide-react";
import Link from "next/link";

export default function Nav() {
  return (
    <div className="flex items-center flex-col h-full justify-between">
      <nav className="space-y-2 flex flex-col items-center">
        <Button size="icon">
          <Archive size={16} />
        </Button>
        <Button size="icon" asChild>
          <Link href="/app/settings">
            <Settings size={16} />
          </Link>
        </Button>
        <Button size="icon" asChild>
          <Link href="/app/zettel">
            <BrainCircuit size={16} />
          </Link>
        </Button>
      </nav>
      <Button size="icon">
        <User size={16} />
      </Button>
    </div>
  );
}
