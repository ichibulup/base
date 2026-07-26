"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { useConfig } from "@/hooks/use-config";
// interface ThemeWrapperProps extends React.ComponentProps<"div"> {
//   defaultTheme?: string;
// }

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      {...props}
      attribute="class"
      defaultTheme="system"
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}

// export function ThemeWrapper({
//   defaultTheme,
//   children,
//   className,
// }: ThemeWrapperProps) {
//   const [config] = useConfig();
//
//   return (
//     <div
//       className={cn(
//         `theme-${defaultTheme || config.theme}`,
//         "w-full",
//         className
//       )}
//       // style={
//       //   {
//       //     "--radius": `${defaultTheme ? 0.5 : config.radius}rem`,
//       //   } as React.CSSProperties
//       // }
//     >
//       {children}
//     </div>
//   );
// }
