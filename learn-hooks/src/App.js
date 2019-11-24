import React, { useState } from 'react'
import './App.css'


// class App extends Component {
//   state = {
//     count: 0
//   }
//   render() {
//     const { count } = this.state
//     return (
//       <div>
//         <button onClick={() => this.setState({ count: count + 1 })}>
//         add {count}
//         </button>
//       </div>
//     )
//   }
// }

function App() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => { setCount(count + 1) }}>
        add {count}
      </button>
    </div>
  );
}

export default App;
