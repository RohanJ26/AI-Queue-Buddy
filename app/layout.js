import './globals.css'
export const metadata = {
  title: "AI Queue Buddy",
  description: "Dignified waiting with real-time empathy",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="max-w-6xl mx-auto p-6">{children}</div>
      </body>
    </html>
  );
}
