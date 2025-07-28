import SearchBar from '../components/SearchBar'

function Home() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Welcome to Planet Explorer 🌌
      </h1>
      <SearchBar />
      <p className="text-center mt-4 max-w-xl mx-auto">
        Explore space missions, celestial objects, and NASA's image archives. Use the search bar above or check out the Picture of the Day!
      </p>
    </div>
  )
}

export default Home
