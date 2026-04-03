import React, { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return
    
    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    
    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    
    const handleMouseOver = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      }
    }
    
    const handleMouseOut = (e) => {
      const target = e.target
      if (target.tagName === 'A' || target.tagName === 'BUTTON') {
        setIsHovering(false)
      }
    }
    
    const animate = () => {
      const lerp = 0.2
      cursorX += (mouseX - cursorX) * lerp
      cursorY += (mouseY - cursorY) * lerp
      
      cursor.style.left = cursorX + 'px'
      cursor.style.top = cursorY + 'px'
      
      requestAnimationFrame(animate)
    }
    
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)
    animate()
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])
  
  return (
    <div 
      ref={cursorRef} 
      className={`custom-cursor ${isHovering ? 'hover' : ''}`}
    />
  )
}

export default CustomCursor