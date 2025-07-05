import "../globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "OpenAI Chat Interface",
  description: "A developer/user chat interface for OpenAI models.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background-light text-text-default min-h-screen">
        <Toaster position="top-right" toastOptions={{
          style: { background: '#e3f0fc', color: '#1e293b', fontSize: '0.95rem' },
          success: { style: { background: '#d1fae5', color: '#2563eb' } },
          error: { style: { background: '#fee2e2', color: '#b91c1c' } },
        }} />
        <main className="flex flex-col items-center justify-center min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
} 