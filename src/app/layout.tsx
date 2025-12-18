import { ViewTransitions } from "next-view-transitions";

import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ViewTransitions>
          {children}
        </ViewTransitions>
      </body>
    </html>
  );
}