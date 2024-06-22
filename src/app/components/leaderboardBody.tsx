// "use client";
import { redis } from "@/lib/redis";

const LeaderboardBody = async () => {
  const data = (await redis.get("leaderboard")) as any[];
  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Country</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{row.member}</td>
            <td>{row.score}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeaderboardBody;
