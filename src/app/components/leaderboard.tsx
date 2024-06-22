import axios from "axios";

const Leaderboard = async () => {
  const table = await axios.get("http://127.0.0.1:8000/leaderboard/");
  return (
    <div>
      <h1>Leaderboard</h1>

      {/* {table.data.map((row: any, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{row.country}</td>
              <td>{row.score}</td>
            </tr>
          ))} */}
      {/* <LeaderboardBody data={table.data} /> */}
      {/* <LeaderboardBody /> */}
    </div>
  );
};

export default Leaderboard;
