import { useState } from 'react'
const App = () => {
  const [count, setCount] = useState(0)
  return (
    <div
      style={{
        display: 'flex',
        paddingTop: '75px',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      Count: {count}
      <button
        onClick={() => setCount((prev) => prev + 1)}
        style={{ width: '100px' }}
      >
        {' '}
        Click Me!{' '}
      </button>
    </div>
  )
}
show(<App />)
