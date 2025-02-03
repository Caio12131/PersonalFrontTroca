import {React, useEffect} from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from "./styles/Globals";
import StyledToastContainer from "./styles/App.style";
import 'react-toastify/dist/ReactToastify.css';
import initializeMercadoPago from './services/mecadopago.helper';
import Content from "./routes/Content";
import { lightTheme } from "./styles/Themes";
import { Helmet } from 'react-helmet';

initializeMercadoPago();


function App() {
  useEffect(() => {
    


    const disableF12 = (event) => {
      if (event.key === 'F12') {
        event.preventDefault();
      }
    };

    const disableShiftRightClick = (event) => {
      if (event.shiftKey) {
        event.preventDefault();
      }
    };

  

  
    document.addEventListener('contextmenu', disableShiftRightClick);
    document.addEventListener('keydown', disableF12);
    return () => {
     
      document.addEventListener('contextmenu', disableShiftRightClick);
      document.addEventListener('keydown', disableF12);
    
    };

  
  
}, []);
  return (
    <div>
      <ThemeProvider theme={lightTheme}>
        <Helmet>
          <meta name='description' content="Personal Inteligente | O maior site de treinos do Brasil | O Personal Inteligente gera seus planos de treino totalmente personalizados e adaptados às suas metas específicas!"/>
        </Helmet>
        <StyledToastContainer />
        <GlobalStyle />
        <Content />
      </ThemeProvider>
    </div>
  );
}

export default App;
