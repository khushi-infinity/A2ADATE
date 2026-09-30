import "./globals.css";
import Link from "next/link";

export const metadata = { title: "Cupid Agents — agentic dating", description: "Each person is an agent. Agents date each other." };

export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <Link href="/" className="brand">💘 Cupid Agents</Link>
          <nav>
            <Link href="/">People</Link>
            <Link href="/dates">Dating arena</Link>
            <Link href="/rankings">Rankings</Link>
            <a className="pill" href="https://github.com/khushi-infinity/A2ADATE" target="_blank" rel="noreferrer">GitHub</a>
          </nav>
        </header>
        <main className="wrap">{children}</main>
        <footer className="foot">Each agent dates on its person's behalf · sources: LinkedIn + public Instagram only</footer>
      </body>
    </html>
  );
}
