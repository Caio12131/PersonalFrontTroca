
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signin from "../components/Sign/Signin";
import Signup from "../components/Sign/SignUp/Signup";
import ProtectedRoute from "../routes/ProtectedRoute";
import Emagrecer from "../components/Checkouts/Emagrecer/Emagrecer";
import MassaMuscular from "../components/Checkouts/MassaMuscular/MassaMuscular";
import DietaTreino from "../components/Checkouts/DietaTreino/DietaTreino";
import Home from "../components/Home/Home";
import Termos from "../components/Termos/Termos";
import Suporte from "../components/SuporteFaleConosco/Suporte";
import Definicao from "../components/Checkouts/Definicao/Definicao";
import DefinicaoMassa from "../components/Checkouts/DefMassa/DefinicaoMassa";
import Dieta from "../components/Checkouts/Acompanhamento/AcompanhamentoNutri";
import LocalTreino from "../components/LocalTreino/LocalTreino";
import SobreMim from "../components/InfoUsuario/SobreMim";
import RedefinePassword from "../components/RedefinePassword/RedefinePassword";
import Desafio from "../components/Checkouts/Desafio/Desafio"
import SubscriptionComponent from "../components/MercadoPago/SubscriptionComponent/Subscription.component";
import Agradecimentos from '../components/Kiwify/Agradecimento'
import Obrigado from '../components/Agradecimentos/Obrigado'
import PlanosNutri from '../components/Planos/PlanosTreino'
import ProtectedAtendimento from './ProtectedAtendimento';
import LoadComponent from '../components/LoadingComponent/LoadComponent'
import DietaAcompanhamento from '../components/Checkouts/Acompanhamento/DietaAcompanhamento';
import ProtectedAtendimentoPersonalizado from './ProtectedAtendimentoPersonalizado';

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
      <Route path="/teste" element={<ProtectedRoute><SubscriptionComponent /></ProtectedRoute>} />
      <Route path="/obrigado" element={<ProtectedRoute><Agradecimentos></Agradecimentos></ProtectedRoute>} />
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
        path="/desafio"
        element={
          <ProtectedRoute>
            <Desafio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dietatreino"
        element={
          <ProtectedRoute>
            <DietaTreino />
          </ProtectedRoute>
        }
      />
      <Route
        path="/definicao"
        element={
          <ProtectedRoute>
            <Definicao />
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
        path="/dieta3meses"
        element={
          <ProtectedRoute>
            <Dieta />
          </ProtectedRoute>
        }
      />
       <Route
        path="/dietaacompanhamento"
        element={
          <ProtectedRoute>
            <DietaAcompanhamento />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
