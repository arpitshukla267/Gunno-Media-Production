import React, { useRef, useState, useEffect } from 'react'
import Cursor from './Cursor'
import YouTube from 'react-youtube'

function BrandEvents() {
  const playerRefs = useRef([])
  const [showMore, setShowMore] = useState(false)
  const [initialCount, setInitialCount] = useState(3)
  const [isMobile, setIsMobile] = useState(false)
  const [loadedPlayers, setLoadedPlayers] = useState({})
  const extraRef = useRef(null)

  const extractVideoId = (urlOrId) => {
    try {
      const url = new URL(urlOrId)
      return url.searchParams.get("v") || url.pathname.split('/').pop()
    } catch {
      return urlOrId
    }
  }

  const videoIds = [
    'gq1aPklwfhE',
    'https://youtu.be/hDF8vXt5f6o?si=RAmoDU8P7ZrSn-ai',
    '5NdvGo3ZYnc',
    'xQ3jg72D2hQ',
    'XtTHvvaXCgc',
    'NLJA_xpBp4w',
    'tgPBfjh1sX4',
    'https://youtu.be/hjxFqwLWcvc?si=7824pxicF6wnHg1g',
    'RymfOyVSVmA',
    'eTJC3aM-OA8',
    'Kr9NLa_8zgw',
    '2E8a8XuTOrg'
  ]

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setInitialCount(width < 768 ? 4 : 3)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleLoadPlayer = (index) => {
    setLoadedPlayers((prev) => ({ ...prev, [index]: true }))
  }

  const handleMouseEnter = (index) => {
    const player = playerRefs.current[index]
    if (player && player.playVideo) player.playVideo()
  }

  const handleMouseLeave = (index) => {
    const player = playerRefs.current[index]
    if (player && player.pauseVideo) player.pauseVideo()
  }

  const handleToggleShowMore = () => {
    setShowMore(prev => {
      const next = !prev
      setTimeout(() => {
        if (next && extraRef.current) {
          extraRef.current.scrollIntoView({ behavior: 'smooth' })
        }
      }, 300)
      return next
    })
  }

  const renderVideo = (url, index) => {
    const videoId = extractVideoId(url)
    const isLoaded = loadedPlayers[index]

    if (isMobile && !isLoaded) {
      return (
        <div
          key={index}
          className="overflow-hidden rounded-2xl relative group cursor-pointer"
          onClick={() => handleLoadPlayer(index)}
        >
          <img
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt="thumbnail"
            className="w-full h-[300px] object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )
    }

    return (
      <div
        key={index}
        className="overflow-hidden rounded-2xl relative group cursor-pointer"
        onMouseEnter={() => {
          if (!isMobile) handleMouseEnter(index)
        }}
        onMouseLeave={() => {
          if (!isMobile) handleMouseLeave(index)
        }}
        onClick={() => {
          if (isMobile && !isLoaded) handleLoadPlayer(index)
        }}
      >
        <YouTube
          videoId={videoId}
          opts={{
            height: '300',
            width: '100%',
            playerVars: {
              autoplay: 0,
              mute: 1,
              loop: 1,
              controls: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              playlist: videoId,
            },
          }}
          onReady={(e) => {
            playerRefs.current[index] = e.target
            if (!isMobile) e.target.pauseVideo()
          }}
        />
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen relative bg-black flex flex-col z-20 text-white px-4 md:px-10 py-14 gap-12 border-b border-gray-700">
      <Cursor />

      <div className="text-center">
        <h1
          style={{ fontFamily: 'Anton, sans-serif' }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-pink-500 to-red-500 animate-gradient-x drop-shadow-[0_2px_15px_rgba(255,105,135,0.4)] text-center m-10"
        >
          Weddings & Events
        </h1>
      </div>

      {/* Initial Videos */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-10">
        {videoIds.slice(0, initialCount).map((url, index) =>
          renderVideo(url, index)
        )}
      </div>

      {/* Show More Videos */}
      {showMore && (
        <div
          ref={extraRef}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8 px-2 md:px-10"
        >
          {videoIds.slice(initialCount).map((url, index) =>
            renderVideo(url, index + initialCount)
          )}
        </div>
      )}

      {/* Toggle Button */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleToggleShowMore}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold rounded-full transition duration-300"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}

export default BrandEvents
