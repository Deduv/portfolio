import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eduardo Santana — Desenvolvedor Java / Full Stack",
  description:
    "Portfólio de Eduardo Santana. Engenharia de Software, APIs REST, SaaS em produção com FastAPI, React e PostgreSQL.",
  keywords: [
    "Eduardo Santana",
    "Desenvolvedor Java",
    "Full Stack",
    "Spring Boot",
    "FastAPI",
    "React",
    "PostgreSQL",
    "SaaS",
  ],
  authors: [{ name: "Eduardo Santana" }],
  openGraph: {
    title: "Eduardo Santana — Desenvolvedor Java / Full Stack",
    description:
      "Engenharia de Software, APIs REST, SaaS em produção. Foco em arquitetura, deploy e produtos funcionais.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eduardo Santana — Desenvolvedor Java / Full Stack",
    description:
      "Engenharia de Software, APIs REST, SaaS em produção.",
    creator: "@eduruntime",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
