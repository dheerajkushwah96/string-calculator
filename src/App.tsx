import './App.css';
import { Container } from "@mui/material";
import MainHeader from './components/main-header';
import StringCalculator from "./components/string-calculator";

function App() {
  return (
    <>
      <MainHeader />
      <Container maxWidth="sm">
        <StringCalculator />
      </Container>
    </>
  );
}

export default App;
