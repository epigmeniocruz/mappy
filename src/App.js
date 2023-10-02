// import map from './map.svg';
import './App.css';
import FishDataFilter from './components/FishData/FishDataFilter';
import FishList from './components/FishData/FishList'
import WebMap from './components/WebMap/WebMap'


function App() {

  return (
    <div className="App">
      <div className="App-header">
        <h1>Fish Behavior Visualizer</h1>
        <div className = 'filter-form'>
       <FishDataFilter /> 
       </div>
       </div>
      <div className="map-component">
        <WebMap />
      </div>
    </div>
  );
}

export default App;
