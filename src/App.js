// import map from './map.svg';
import './App.css';
import FishDataFilter from './components/FishData/FishDataFilter';
import FishList from './components/FishData/FishList'
import WebMap from './components/WebMap/WebMap'


function App() {

  return (
    <div className="App">
      <div className="App-header">
      <div className="filter-button"><button>Filter fish</button></div>
        <h1>Fish Behavior Visualizer</h1>
       
      <div className="main-components">
        <div className='right-section'>
        <WebMap />
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
