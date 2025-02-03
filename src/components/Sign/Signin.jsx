import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';
import PersonalInteligente from '../../img/Pi.svg';

const Mainloading = () => (
  <div className="flex justify-center items-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
  </div>
);

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/home');
    } catch (e) {
      if (e.message === "Firebase: Error (auth/user-not-found).") {
        setError("Email Incorreto");
      } else if (e.message === "Firebase: Error (auth/wrong-password).") {
        setError("Senha Incorreta");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" 
    >
      <div className="w-full max-w-3xl space-y-8 bg-white p-10 rounded-xl relative bg-opacity-90">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-50">
            <Mainloading />
          </div>
        )}

        <div className="text-center">
          <img src={PersonalInteligente} alt="Logo" className="logo-image" />
          <h2 className="mt-6 text-2xl font-extrabold text-gray-900">Entrar</h2>
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
            <div>
              <label htmlFor="password" className="sr-only">Senha</label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                placeholder="Senha"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'ENTRAR'}
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
          <div className="mt-4 space-y-4">
            <Link 
              to="/redefinirsenha" 
              className="font-medium text-black hover:text-gray-800 no-underline"
            >
              Esqueceu sua senha? REDEFINIR
            </Link>
            <div>
              <Link 
                to="/signup" 
                className="inline-block px-6 py-2 border-2 border-black text-black font-bold text-lg rounded-md hover:text-white transition-colors duration-300 no-underline"
              >
                CRIAR UMA CONTA
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
