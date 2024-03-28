import { getTotalMinutes } from "@/utils/get-total-minutes"

const History = ({ watchedMovies }) => {
  return (
    <div className="history">
      <h2>Histórico</h2>
      <div>
        <p>
          <span>#️⃣</span> <span>{watchedMovies.length} filmes</span>
        </p>
        <p>
          <span>⏳</span> <span>{getTotalMinutes(watchedMovies)} min</span>
        </p>
      </div>
    </div>
  )
}

export { History }