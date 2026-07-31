// url=https://www.figma.com/design/SBIzNeUABkOiXfr5Pd7U4n/Royal-Puffy-Purrs-Homepage?node-id=1-14
// source=components/ui/card.tsx
// component=Card
import figma from "figma";

const instance = figma.selectedInstance;

const title =
  instance.findText("Card title")?.textContent ?? "Card title";
const description =
  instance.findText("Card description text")?.textContent ??
  "Card description text";

export default {
  example: figma.code`
    <Card>
      <CardHeader>
        <CardTitle>${title}</CardTitle>
        <CardDescription>${description}</CardDescription>
      </CardHeader>
    </Card>
  `,
  imports: [
    'import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"',
  ],
  id: "card",
  metadata: { nestable: true },
};
