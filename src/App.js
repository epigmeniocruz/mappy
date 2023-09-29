// import map from './map.svg';
import './App.css';
import FishDataFilter from './components/FishData/FishDataFilter';
import FishList from './components/FishData/FishList'
import WebMap from './components/WebMap/WebMap'


function App() {
  const fishList = [
    {id: 1, tagCode: "3DD.003BC95F8A", },
    {id: 2, tagCode: "3DD.003BC95F8B"}
  ];

  return (
    <div className="App">
      <header className="header">
        <h1 className="h1-searchbar">Fish Behavior Visualizer</h1>
      </header>
      <div className="main-components">
        <div className='right-section'>
        <WebMap />
        </div>
      </div>
    </div>
  );
}

export default App;
