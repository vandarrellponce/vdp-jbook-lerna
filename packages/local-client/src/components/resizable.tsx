import './resizable.css'
import { ResizableBox, ResizableBoxProps } from 'react-resizable'
import { useEffect, useState } from 'react'

const Resizable: React.FC<{
  direction: 'horizontal' | 'vertical'
}> = ({ direction, children }) => {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  const [innerHeight, setInnerHinnerHeight] = useState(window.innerHeight)
  const [subInnerWidth, setSubInnerWidth] = useState(window.innerWidth * 0.6)

  let resizableProps: ResizableBoxProps

  useEffect(() => {
    let timer: any

    const listener = () => {
      if (timer) clearTimeout(timer)

      timer = setTimeout(() => {
        setInnerWidth(window.innerWidth)
        setInnerHinnerHeight(window.innerHeight)
        if (window.innerWidth * 0.6 < subInnerWidth)
          setSubInnerWidth(window.innerWidth * 0.6)
      }, 100)
    }

    window.addEventListener('resize', listener)

    return () => window.removeEventListener('resize', listener)
  }, [subInnerWidth])

  if (direction === 'horizontal') {
    // for code editor
    resizableProps = {
      className: 'resize-horizontal',
      height: Infinity,
      width: subInnerWidth,
      resizeHandles: ['e'],
      maxConstraints: [innerWidth * 0.75, Infinity],
      minConstraints: [innerWidth * 0.2, Infinity],
      onResizeStop: (event, data) => {
        setSubInnerWidth(data.size.width)
      },
    }
  }
  // for rest (preview)
  else {
    resizableProps = {
      height: 300,
      width: Infinity,
      resizeHandles: ['s'],
      maxConstraints: [Infinity, innerHeight * 0.9],
      minConstraints: [Infinity, 50],
    }
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>
}

export default Resizable
