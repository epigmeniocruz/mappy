// import map from './map.svg';
import "./App.css";
// import FishDataFilter from "./components/FishData/FishDataFilter";
import WebMap from "./components/WebMap";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <h1>Fish Behavior Visualizer</h1>
      </div>
      <div className="map-component">
        <WebMap />
      </div>
      <p className="bottom-text">
        2023 NINA-TUYEN TRAN DEVELOPED FOR FOUR PEAKS ENVIRONMENTAL
      </p>
    </div>
  );
}

export default App;
