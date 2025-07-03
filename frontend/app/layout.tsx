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
      <body className="bg-gray-950 text-gray-100 min-h-screen">
        <Toaster position="top-right" toastOptions={{
          style: { background: '#1e293b', color: '#fff', fontSize: '0.95rem' },
          success: { style: { background: '#166534', color: '#fff' } },
          error: { style: { background: '#991b1b', color: '#fff' } },
        }} />
        <main className="flex flex-col items-center justify-center min-h-screen w-full">
          {children}
        </main>
      </body>
    </html>
  );
} 