// url=https://www.figma.com/design/SBIzNeUABkOiXfr5Pd7U4n/Royal-Puffy-Purrs-Homepage?node-id=1-13
// source=components/ui/button.tsx
// component=Button
import figma from "figma";

const instance = figma.selectedInstance;

const label = instance.findText("Button")?.textContent ?? "Button";
const variant = instance.getEnum("variant", {
  default: "default",
  secondary: "secondary",
  outline: "outline",
  ghost: "ghost",
  accent: "accent",
});

export default {
  example: figma.code`<Button variant="${variant}">${label}</Button>`,
  imports: ['import { Button } from "@/components/ui/button"'],
  id: "button",
  metadata: { nestable: true },
};
