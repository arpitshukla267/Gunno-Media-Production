import React, { useRef, useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import Cursor from './cursor'

function Page3() {
  const playerRefs = useRef([])
  const [showMore, setShowMore] = useState(false)
  const [height, setHeight] = useState('0px')
  const extraVideosRef = useRef(null)
  const [initialCount, setInitialCount] = useState(3)

  const extractVideoId = (urlOrId) => {
    try {
      const url = new URL(urlOrId)
      return url.searchParams.get("v") || url.pathname.split('/').pop()
    } catch {
      return urlOrId
    }
  }

  const onReady = (event, index) => {
    playerRefs.current[index] = event.target
    event.target.pauseVideo()
  }

  const handleMouseEnter = (index) => {
    const player = playerRefs.current[index]
    if (player) player.playVideo()
  }

  const handleMouseLeave = (index) => {
    const player = playerRefs.current[index]
    if (player) player.pauseVideo()
  }

  const videoIds = [
    'fFMAmvt8ki8',
    'ctWuDhfKm3s',
    'kq6MAnUPzPA',
    'https://youtu.be/shjUNHDOAAY?si=uiaHEgMo6eX1lH9E',
    'b8Ucv-ExOEU',
    'qojHoEG6Kt0',
    'https://youtu.be/-xXqkUiWrh8?si=7bDZdZcpet7rLoXT',
    'https://youtu.be/yi3cPJw3vyE?si=YXoFfCJeivpLrx3E',
    'https://youtu.be/UabJpnTZAME?si=PFHGl6kDfXbYlnt8'
  ]

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      setInitialCount(width < 768 ? 4 : 3)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (showMore && extraVideosRef.current) {
      const scrollHeight = extraVideosRef.current.scrollHeight
      setHeight(`${scrollHeight}px`)
    } else {
      setHeight('0px')
    }
  }, [showMore])

  return (
    <div className="w-full min-h-screen relative bg-black flex flex-col z-20 text-white px-4 md:px-10 pt-10 pb-4 gap-8 border-b border-gray-700">
      <Cursor />

      <div className="text-center">
        <h1 className="text-5xl uppercase m-6 bebas-font text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-pink-500 to-red-500">
          Brand Film
        </h1>
      </div>

      {/* Initial videos */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-10">
        {videoIds.slice(0, initialCount).map((url, index) => {
          const videoId = extractVideoId(url)
          return (
            <div
              key={index}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="overflow-hidden rounded-2xl"
            >
              <YouTube
                videoId={videoId}
                opts={{
                  height: '300',
                  width: '100%',
                  playerVars: {
                    autoplay: 0,
                    mute: 0,
                    loop: 1,
                    controls: 0,
                    modestbranding: 1,
                    rel: 0,
                    showinfo: 0,
                    playlist: videoId,
                  },
                }}
                onReady={(e) => onReady(e, index)}
              />
            </div>
          )
        })}
      </div>

      {/* Expandable videos */}
      <div
        ref={extraVideosRef}
        style={{
          height: height,
          overflow: 'hidden',
          transition: 'height 0.6s ease',
        }}
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-6 px-2 md:px-10">
          {videoIds.slice(initialCount).map((url, index) => {
            const videoId = extractVideoId(url)
            return (
              <div
                key={index + initialCount}
                onMouseEnter={() => handleMouseEnter(index + initialCount)}
                onMouseLeave={() => handleMouseLeave(index + initialCount)}
                className="overflow-hidden rounded-2xl"
              >
                <YouTube
                  videoId={videoId}
                  opts={{
                    height: '300',
                    width: '100%',
                    playerVars: {
                      autoplay: 0,
                      mute: 0,
                      loop: 1,
                      controls: 0,
                      modestbranding: 1,
                      rel: 0,
                      showinfo: 0,
                      playlist: videoId,
                    },
                  }}
                  onReady={(e) => onReady(e, index + initialCount)}
                />
              </div>
            )
          })}
        </div>
      </div>

      {/* Toggle Button */}
      <div className="flex justify-center mt-4 mb-2 sm:mb-4">
        <button
          onClick={() => setShowMore(!showMore)}
          className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white text-lg font-semibold rounded-full transition duration-300"
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </div>
  )
}

export default Page3
