import Welcome from './Welcome';
import Clock from './Clock';
import Toggle from './Toggle';

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
      <Clock />
      <Toggle />
    </div>
  );
}

export default App;
