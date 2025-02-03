import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from "../components/Sign/Signin";
import Signup from "../components/Sign/SignUp/Signup";
import ProtectedRoute from "../routes/ProtectedRoute";
import Emagrecer from "../components/Checkouts/TreinoEmagrecimento/TreinoEmagrecimento";
import MassaMuscular from "../components/Checkouts/GanhoDeMassa/GanhoDeMassa";
import Personalizado from "../components/Checkouts/TreinoPersonalizado/TreinoPersonalizado";
import Home from "../components/Home/Home";
import Termos from "../components/Termos/Termos";
import Suporte from "../components/SuporteFaleConosco/Suporte";
import DefinicaoMassa from "../components/Checkouts/EmagrecimentoMassa/EmagrecimentoMassa";
import LocalTreino from "../components/LocalTreino/LocalTreino";
import SobreMim from "../components/InfoUsuario/SobreMim";
import RedefinePassword from "../components/RedefinePassword/RedefinePassword";
import Agradecimentos from '../components/Kiwify/Agradecimento';
import Obrigado from '../components/Agradecimentos/Obrigado';
import PlanosNutri from '../components/Planos/PlanosTreino';
import LoadComponent from '../components/LoadingComponent/LoadComponent';
import Instrucao from "../components/LocalTreino/InstrucaoTreino";
import Exercicios  from '../components/LocalTreino/Exercicios';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/redefinirsenha" element={<RedefinePassword />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/suporte" element={<Suporte />} />
      <Route path="/Treino" element={<ProtectedRoute><LocalTreino /></ProtectedRoute>} />
      <Route path="/sobre" element={<ProtectedRoute><SobreMim /></ProtectedRoute>} />
      <Route path="/obrigado" element={<ProtectedRoute><Agradecimentos /></ProtectedRoute>} />
      <Route path="/comprarealizada" element={<Obrigado />} />
      <Route path="/carregando" element={<ProtectedRoute><LoadComponent/></ProtectedRoute>} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/planos"
        element={
          <ProtectedRoute>
            <PlanosNutri />
          </ProtectedRoute>
        }
      />
            <Route
        path="/exercicios"
        element={
          <ProtectedRoute>
            <Exercicios />
          </ProtectedRoute>
        }
      />
      <Route    
        path="/emagrecer"
        element={
          <ProtectedRoute>
            <Emagrecer/>
          </ProtectedRoute>
        }
      /> 
      <Route
        path="/massamuscular"
        element={
          <ProtectedRoute>
            <MassaMuscular />
          </ProtectedRoute>
        }
      />
      <Route
        path="/personalizado"
        element={
          <ProtectedRoute>
            <Personalizado />
          </ProtectedRoute>
        }
      />  
      <Route
        path="/definicaomassa"
        element={
          <ProtectedRoute>
            <DefinicaoMassa />
          </ProtectedRoute>
        }
      />
      <Route
        path="/instrucao"
        element={
          <ProtectedRoute>
            <Instrucao /> {/* Nova rota para a página de instrução */}
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
