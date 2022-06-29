import './App.scss';

import { ReactComponent as VanIcon } from "./img/van.svg";

const App = () => (
  <div className="App">
    <h2 className="title">
      Choose your delivery day
      <span className="tab">Delivery is always free</span>
    </h2>
    <div className="card">
      <div>
        
      <p>Thur March 14</p>
      <span className="tab"><VanIcon/>Earliest delivery</span>
      </div>

      <button>
        Change
      </button>
    </div>
  </div>
)

export default App
