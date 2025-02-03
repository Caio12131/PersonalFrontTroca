import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import { UserAuth } from '../../../context/AuthContext';
import PersonalInteligente from '../../../img/Pi.svg';
import 'react-phone-number-input/style.css';
import '../../Sign/SignUp/Signup.css'; // Importando o CSS

const Mainloading = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Numero, setNumero] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termoscheck, setTermosCheck] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleCheck = () => {
    setTermosCheck(!termoscheck);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirmPassword) {
      setError('As senhas não são iguais. Por favor, verifique novamente.');
      return;
    }
    if (!termoscheck) {
      setError('Você deve concordar com os termos e condições para criar uma conta');
      return;
    }

    try {
      setLoading(true);
      await createUser(email, password, Numero);
      navigate('/home');
    } catch (e) {
      if (e.message === 'Firebase: Error (auth/invalid-email).') {
        setError('Email inválido. Cadastre com email corretamente');
      } else if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
        setError('Email já existente. Clique no botão entrar com conta abaixo');
      } else if (e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        setError('Sua senha precisa ter mais de 6 caracteres');
      } else {
        setError('Ocorreu um erro ao criar a conta. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 signup-bg" // Adicionando classe CSS com fundo
    >
      <div className="w-full max-w-3xl space-y-8 bg-white p-10 rounded-xl relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
            <Mainloading />
          </div>
        )}
        
        <div className="text-center">
          <img src={PersonalInteligente} alt="Logo" className="logo-image" />
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Criar Conta</h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                placeholder="Email"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                placeholder="Senha"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={togglePasswordVisibility}
              >
                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-gray-400`}></i>
              </button>
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmar Senha</label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                placeholder="Confirmar Senha"
              />
            </div>
            <div>
              <label htmlFor="numero" className="sr-only">Número de Telefone</label>
              <PhoneInput
                id="numero"
                value={Numero}
                onChange={setNumero}
                placeholder="Número de Telefone"
                defaultCountry="BR"
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="termosCheck"
              name="termosCheck"
              type="checkbox"
              checked={termoscheck}
              onChange={handleCheck}
              className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="termosCheck" className="ml-2 block text-sm text-gray-900">
              Eu estou de acordo com os{' '}
              <Link to="/termos" target="_blank" className="font-medium text-black hover:text-gray-800">
                Termos e Condições de uso
              </Link>{' '}
              do Personal Inteligente
            </label>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50"
            >
              {loading ? 'Criando conta...' : 'CRIAR CONTA'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Ou</span>
            </div>
          </div>
          <Link 
            to="/" 
            className="inline-block mt-4 px-6 py-2 border-2 border-black text-black font-bold text-lg rounded-md hover:text-white transition-colors duration-300"
          >
            Entrar com conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
