function SkeletonCard() {
  return (
    <div className="animate-pulse border rounded p-4 shadow-md dark:bg-gray-800">
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-5 w-3/4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-600 rounded"></div>
    </div>
  )
}

export default SkeletonCard
