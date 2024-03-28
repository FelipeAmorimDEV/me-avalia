import { useState } from "react"

const useLoading = () => {
  const [isFetchingData, setIsFetchingData] = useState(false)
  return [isFetchingData, setIsFetchingData]
}

export { useLoading }