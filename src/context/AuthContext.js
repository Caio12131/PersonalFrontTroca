import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  deleteUser,
} from 'firebase/auth';
import { auth } from '../firebase';
import { get, getDatabase, ref, set, update} from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import api from '../services';
import { saveUserInfo,getPaymentId, removeUserInfo, removePaymentId, removePaymentStartTime } from '../helpers/localStorage.helper';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  
 

  const createUser = async (email, password, numero) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    const uid = userCredential.user.uid;
    // Crie um nó no Realtime Database para armazenar informações do usuário
    const db = getDatabase();
    const userRef = ref(db, "users/" + uid);
    set(userRef, {
      email: email,
      Treino: "",
      Tickets: 0,
      Numero: numero,
      lastLogin: new Date().toISOString()
    });
    setUser(userCredential.user);
    saveUserInfo(userCredential.user);
  };

  const retornaDados = async () => {
    try {
      const current = auth.currentUser;
      if (current != null) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userPeso = userData.Peso;
          const userAltura = userData.Altura;
          // const userTMB = userData.TMB;
          const userIMC = userData.IMC;
          const userPrompt = userData.Prompt;
          return [userPeso, userAltura, userIMC, userPrompt]; // Retorna o valor dos tickets
        } else {
          return null; // Retorna null se o usuário não existir
        }
      } else {
        return null; // Retorna null se não houver usuário autenticado
      }
    } catch (error) {
      console.error("Erro ao recuperar tickets:", error);
      return null; // Retorna null em caso de erro
    }
  };



  const deleteAccount = async () =>{
    try{
      const current = auth.currentUser;
      deleteUser(current).then(() => {
        navigate("/")
      }).catch((error) => {
      });

      }catch{
    }
  }

  const redefinePassword = async (email) =>{
    try{
    await sendPasswordResetEmail(auth, email)
      .then(() => {
      })
      .catch((error) => {
      });
    }catch{
    }
  }

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const uid = userCredential.user.uid;
    // Crie um nó no Realtime Database para armazenar informações do usuário
    const db = getDatabase();
    const userRef = ref(db, "users/" + uid);

    update(userRef, {
      email: email,
      lastLogin: new Date().toISOString()
    });
    setUser(userCredential.user);
    saveUserInfo(userCredential.user);
  };

    const CriarPagamento = async (amount, addordebump, email, uid) => {
      try{
      const response = await fetch(`${process.env.REACT_APP_API_URL}/processarPagamento`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
       body: JSON.stringify({amount, addordebump, email, uid})
    });

    if (response.ok) {
      const data = await response.json()
      
      console.log(data)
      return(data)
      
    } else {
      console.log('Erro ao criar pagamento')
    }
} catch (error) {
    console.error("Erro ao fazer a requisição:", error);
}
  }
  

  const VerificarPagamento = async (PaymentID) => {
    
    try{
    const response = await fetch(`${process.env.REACT_APP_API_URL}/VerificarPagamento`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({PaymentID})
  });

  if (response.ok) {
    const data = await response.json()
  console.log(data)
  return(data)
      
      // Chama getUserData para obter dados atualizados do usuário
      // Faça algo com userData, como atualizar o estado ou exibir na tela
  } else {
    console.log('Erro ao criar pagamento')
  }
} catch (error) {
  console.error("Erro ao fazer a requisição:", error);
}
}

const CancelarPagamento = async (PaymentID) => {
    
  try{
  const response = await fetch(`${process.env.REACT_APP_API_URL}/CancelarPagamento`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({PaymentID})
});

if (response.ok) {
  const data = await response.json()
console.log(data)
return(data)
    
    // Chama getUserData para obter dados atualizados do usuário
    // Faça algo com userData, como atualizar o estado ou exibir na tela
} else {
  console.log('Erro ao criar pagamento')
}
} catch (error) {
console.error("Erro ao fazer a requisição:", error);
}
}

  const retornaTicket = async () => {
    
    try {
      const current = auth.currentUser;
      if (current != null) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userTickets = userData.Tickets;
          
          return userTickets; // Retorna o valor dos tickets
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao recuperar tickets:", error);
      return null;
    }
  };

  const retornaTicketUsado = async () => {
    try {
      const current = auth.currentUser;
      if (current != null) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userTickets = userData.TicketsUsados;
          return userTickets; // Retorna o valor dos tickets
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao recuperar tickets:", error);
      return null;
    }
  };

  const adicionarPromptTreino = async (prompt) => {
    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const newPrompt = prompt
            update(userRef, {
              Prompt: newPrompt,
            })
          }
        
      }
    } catch (error) {
      console.log(error);
    }
  };

  const salvarDados = async (peso, altura, imc) => {
    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          const setPeso = peso;
          const setAltura = altura;
          // const setTMB = tmb;
          const setImc = imc;

          update(userRef, {
            email: current.email,
            Peso: setPeso,
            Altura: setAltura,
            // TMB: setTMB,
            IMC: setImc
          })

        }
      }
    } catch (error) {
      adicionarErro("Erro ao salvar Dados");
    }
  };

  const adicionarErro = async (erro) => {
    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const setErro = erro
            update(userRef, {
              Erro: setErro,
            })
          }
        
      }
    } catch (error) {
      console.error("Erro treino", error);
    }
  };

  const adicionarRequest = async (erro) => {
    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {
            const setErro = erro
            update(userRef, {
              Requisições: setErro,
            })
          }
        
      }
    } catch (error) {
      console.error("Erro treino", error);
    }
  };

  const retornarTreino = async () => {
    try {
      const current = auth.currentUser;
      if (current != null) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userTreino = userData.Treino;
          return userTreino; // Retorna o valor dos tickets
        } else {
          return null; // Retorna null se o usuário não existir
        }
      } else {
        return null; // Retorna null se não houver usuário autenticado
      }
    } catch (error) {
      console.error("Erro ao recuperar Treino:", error);
      return null; // Retorna null em caso de erro
    }
  };


  const retirarTicket = async () => {

    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {

          const Tickets = snapshot.val().Tickets
          // eslint-disable-next-line
          if (Tickets) {
            const setTicket = 0
            update(userRef, {
              email: current.email,
              Tickets: setTicket,
              lastLogin: new Date().toISOString()
            })
          } else {
          }
        }
      }
    } catch (error) {
    }
  };
  const adicionarTicketUsado = async () => {

    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {

          if(snapshot.val().TicketsUsados){
           const Tickets = snapshot.val().TicketsUsados + 1
           update(userRef, {
            email: current.email,
            TicketsUsados: Tickets,
            lastLogin: new Date().toISOString()
          })
          // eslint-disable-next-line
        }else{
         const Tickets = 1
         update(userRef, {
          email: current.email,
          TicketsUsados: Tickets,
          lastLogin: new Date().toISOString()
        })
        }
      }
    }
    } catch (error) {
    }
  };

  const adicionarEdicaoTreino = async () => {

    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {

          if(snapshot.val().edicaoTreino){
           update(userRef, {
            email: current.email,
            edicaoTreino: true,
            lastLogin: new Date().toISOString()
          })
          // eslint-disable-next-line
        }else{
         update(userRef, {
          email: current.email,
          edicaoTreino: true,
          lastLogin: new Date().toISOString()
        })
        }
      }
    }
    } catch (error) {
    }
  };

  const retirarEdicaoTreino = async () => {

    try {
      const current = auth.currentUser;
      if (current) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);

        const snapshot = await get(userRef);

        if (snapshot.exists()) {

          if(snapshot.val().edicaoTreino){
           update(userRef, {
            email: current.email,
            edicaoTreino: false,
            lastLogin: new Date().toISOString()
          })
          // eslint-disable-next-line
        }else{
         
         update(userRef, {
          email: current.email,
          edicaoTreino: false,
          lastLogin: new Date().toISOString()
        })
        }
      }
    }
    } catch (error) {
    }
  };

  const retornaEdicaoTreino = async () => {
    try {
      const current = auth.currentUser;
      if (current != null) {
        const db = getDatabase();
        const userRef = ref(db, `users/${current.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const userData = snapshot.val();
          const userTickets = userData.edicaoTreino;
          return userTickets; // Retorna o valor dos tickets
        } else {
          return null;
        }
      } else {
        return null;
      }
    } catch (error) {
      console.error("Erro ao recuperar tickets:", error);
      return null;
    }
  };



  const logout = () => {
    
    const paypay = getPaymentId()
    if (paypay){
    api.cancelPayment(paypay, user?.accessToken);
    removePaymentStartTime();
    removePaymentId();
    }
    removeUserInfo();
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      saveUserInfo(currentUser)
      if (currentUser !== null && window.location.pathname === "/") {
        navigate('/home');
      }

    });
    return () => {
      unsubscribe();
    };
  }, [navigate]);

  return (
    <UserContext.Provider value={{ createUser,CriarPagamento, VerificarPagamento, CancelarPagamento, user, adicionarRequest, adicionarPromptTreino,adicionarErro,logout, retirarEdicaoTreino, signIn, retornaEdicaoTreino, adicionarEdicaoTreino ,retornaTicketUsado, salvarDados,redefinePassword,adicionarTicketUsado, deleteAccount, retornaDados, retornaTicket, retirarTicket, retornarTreino, theme, setTheme }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
