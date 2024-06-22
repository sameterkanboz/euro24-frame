import Frame from "./components/frame";
import Leaderboard from "./components/leaderboard";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2 md:p-24">
      <Frame />
      <Leaderboard />
    </main>
  );
}
