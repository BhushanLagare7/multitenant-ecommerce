import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

/**
 * Renders a padded page section containing a vertical stack of demo UI controls.
 *
 * The section displays an elevated Button, an Input, a Progress bar set to 50, a Textarea, and a Checkbox arranged with vertical spacing.
 *
 * @returns The root JSX element containing the demo controls
 */
export default function Home() {
  return (
    <div className="p-4">
      <div className="flex flex-col gap-y-4">
        <div>
          <Button variant="elevated">I am a button</Button>
        </div>
        <div>
          <Input placeholder="I am an input" />
        </div>
        <div>
          <Progress value={50} />
        </div>
        <div>
          <Textarea placeholder="I am a textarea" />
        </div>
        <div>
          <Checkbox />
        </div>
      </div>
    </div>
  );
}