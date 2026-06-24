import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import './styles/main.css';

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
