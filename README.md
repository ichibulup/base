# gorth-ui

Shared React UI library.

## Install from GitHub

```bash
pnpm add gorth-ui@github:goraria/gorth-ui
```

Or via dependency alias in another project:

```json
{
  "dependencies": {
    "ui": "github:goraria/gorth-ui"
  }
}
```

## Usage

Import library CSS once in your app entry (for Next.js App Router, put this in `app/layout.tsx`):

```tsx
import "gorth-ui/globals.css";
```

```tsx
import { Button } from 'gorth-ui';

export function Demo() {
  return <Button>Click me</Button>;
}
```

If you installed with alias `ui`, import from `ui` instead:

```tsx
import { Button } from 'ui';
```

## Development

```bash
pnpm install
pnpm build
```
