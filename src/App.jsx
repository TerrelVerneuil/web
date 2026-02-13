import { Canvas } from '@react-three/fiber'
import React, { useRef, useState } from 'react'
import { Scene } from "./components/Scene"
import { OrbitControls } from '@react-three/drei'
import HeartParticles from './components/HeartParticles'

function App() {
  const lightRef = useRef()
  const audioRef = useRef()
  const [started, setStarted] = useState(false)
  const [answer, setAnswer] = useState(null)
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })

  const handleStart = () => {
    setStarted(true)
    if (audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play()
    }
  }

  const handleYes = () => {
    setAnswer('yes')
  }

  const handleNo = () => {
    const randomX = (Math.random() - 0.5) * 400
    const randomY = (Math.random() - 0.5) * 300
    setNoButtonPosition(prev => ({ 
      x: prev.x + randomX,
      y: prev.y + randomY
    }))
  }

  return (
    <>
      <Canvas camera={{ position: [0, 6, 12], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight 
          ref={lightRef}
          position={[0, 3, -3]} 
          intensity={50} 
          color="#ff9944"
        />
        <HeartParticles count={answer === 'yes' ? 500 : 250} />
        <Scene rotation={[0, Math.PI, 0]} />
        <OrbitControls 
          target={[0, 3, 0]}
          enablePan={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 2}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>

      {/* Start Screen */}
      {!started && (
        <div 
          onClick={handleStart}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, #ffb6c1 0%, #ff69b4 50%, #ff1493 100%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontFamily: "'Comic Sans MS', cursive, sans-serif"
          }}
        >
          <div style={{
            fontSize: '80px',
            marginBottom: '20px',
            animation: 'heartbeat 1s ease-in-out infinite'
          }}>
            ....
          </div>
          <h1 style={{
            fontSize: '36px',
            color: 'white',
            textShadow: '2px 2px 8px rgba(0,0,0,0.3)',
            marginBottom: '10px'
          }}>
            I have something to ask you...
          </h1>
          <p style={{
            fontSize: '20px',
            color: 'white',
            opacity: 0.9
          }}>
            
          </p>
        </div>
      )}

      {/* Valentine UI Overlay */}
      {started && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Comic Sans MS', cursive, sans-serif"
        }}>
          
          {/* Question */}
          {!answer && (
            <h1 style={{
              fontSize: '42px',
              color: '#ff1493',
              textShadow: '0 0 20px rgba(255, 105, 180, 0.8), 2px 2px 4px rgba(0,0,0,0.3)',
              marginBottom: '40px',
              textAlign: 'center',
              padding: '0 20px'
            }}>
              Will you be my Valentine?
            </h1>
          )}

          {/* Yes response */}
          {answer === 'yes' && (
            <div style={{
              textAlign: 'center',
              animation: 'pulse 1s ease-in-out infinite'
            }}>
              <h1 style={{
                fontSize: '64px',
                color: '#ff1493',
                textShadow: '0 0 30px rgba(255, 105, 180, 1), 0 0 60px rgba(255, 105, 180, 0.5)',
                margin: 0
              }}>
                Eyyyyyyyyyyyy
              </h1>
              <p style={{
                fontSize: '32px',
                color: '#ff69b4',
                marginTop: '20px'
              }}>
                I love you! 
              </p>
            </div>
          )}

          {/* Buttons */}
          {!answer && (
            <div style={{
              display: 'flex',
              gap: '30px',
              pointerEvents: 'auto'
            }}>
              <button
                onClick={handleYes}
                style={{
                  padding: '20px 50px',
                  fontSize: '28px',
                  backgroundColor: '#ff1493',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                  boxShadow: '0 6px 25px rgba(255, 20, 147, 0.5)',
                  transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'scale(1.15)'
                  e.target.style.boxShadow = '0 8px 35px rgba(255, 20, 147, 0.7)'
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'scale(1)'
                  e.target.style.boxShadow = '0 6px 25px rgba(255, 20, 147, 0.5)'
                }}
              >
                Yes! :)
              </button>
              
              <button
                onClick={handleNo}
                style={{
                  padding: '20px 50px',
                  fontSize: '28px',
                  backgroundColor: '#aaa',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontFamily: 'inherit',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease-out',
                  transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`
                }}
                onMouseEnter={handleNo}
              >
                No >:(
              </button>
            </div>
          )}
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
          75% { transform: scale(1.3); }
        }
      `}</style>

      <audio ref={audioRef} src='/models/CuteCircus.mp3' loop />
    </>
  )
}

export default App