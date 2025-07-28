import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fetchAPOD } from "../services/nasaApi";
import { type FavoriteItem, useFavorites } from "../context/FavoritesContext";

interface APODData extends FavoriteItem {
  explanation?: string;
  date?: string;
  media_type?: string;
}

function PictureOfTheDay() {
  const [data, setData] = useState<APODData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const loadAPOD = async () => {
      try {
        setLoading(true);
        setError(null);
        const apod = await fetchAPOD();

        // Handle both image and video content
        const apodData: APODData = {
          id: apod.date,
          title: apod.title,
          url:
            apod.media_type === "video"
              ? apod.thumbnail_url || apod.url
              : apod.hdurl || apod.url,
          explanation: apod.explanation,
          date: apod.date,
          media_type: apod.media_type,
        };

        setData(apodData);
      } catch (err) {
        setError("Failed to load Astronomy Picture of the Day");
        console.error("APOD fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadAPOD();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-8"
          >
            <div className="h-12 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent rounded-lg mb-4 flex items-center justify-center">
              <div className="animate-pulse text-4xl font-bold">
                Loading APOD...
              </div>
            </div>
          </motion.div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
            <div className="animate-pulse">
              <div className="w-full h-96 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600"></div>
              <div className="p-8 space-y-4">
                <div className="h-8 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded w-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-700 dark:to-gray-600 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center py-20"
        >
          <div className="text-8xl mb-6">🚫</div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            {error || "Unable to load the Astronomy Picture of the Day"}
          </p>
          <motion.button
            onClick={() => window.location.reload()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-3 rounded-2xl font-bold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
          >
            Try Again 🔄
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-teal-900 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
        >
          Astronomy Picture of the Day
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
        >
          <div className="relative">
            {data.media_type === "image" ? (
              <img
                src={data.url}
                alt={data.title}
                className="w-full max-h-[600px] object-cover"
                onError={(e) => {
                  console.error("Image failed to load:", data.url);
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x400/1a1a2e/white?text=Image+Not+Available";
                }}
              />
            ) : data.media_type === "video" ? (
              <div className="w-full h-96 bg-black flex items-center justify-center">
                <iframe
                  src={data.url}
                  className="w-full h-full"
                  frameBorder="0"
                  allowFullScreen
                  title={data.title}
                />
              </div>
            ) : (
              <div className="w-full h-96 flex items-center justify-center text-white text-xl bg-black/50">
                🚫 Media type "{data.media_type}" is not supported.
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          </div>

          <div className="p-8">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-white mb-4"
            >
              {data.title}
            </motion.h2>

            {data.date && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-300 mb-4"
              >
                📅{" "}
                {new Date(data.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </motion.p>
            )}

            {data.explanation && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-300 mb-6 leading-relaxed"
              >
                {data.explanation}
              </motion.p>
            )}

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center"
            >
              <motion.button
                onClick={() =>
                  isFavorite(data.id)
                    ? removeFavorite(data.id)
                    : addFavorite(data)
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  isFavorite(data.id)
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/25"
                    : "bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/25"
                }`}
              >
                {isFavorite(data.id)
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PictureOfTheDay;
