import React, { useEffect, useState } from "react";
import "../Styles/App.css";
import HamburgerMenu from "../Menu/HamburgerMenu";
import "bootstrap/dist/css/bootstrap.css";
import { UserAuth } from "../../context/AuthContext";
import ErrorCard from "../Error/ErrorCardHome";
import LoadInicial from "../LoadingComponent/LoadInicial";
import WorkoutGenerator from "../LocalTreino/Exercicios";
import { get, getDatabase, ref } from "firebase/database";
//import Step from '../../img/FacilitaNutri-Step.svg'

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [suporte, setSuporte] = useState(false);
  const [treinoDisponivel, setTreinoDisponivel] = useState(false)
  const { retornaTicket, user} = UserAuth();
  const [userTickets, setUserTickets] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  useEffect(() => {
    const fetchWorkout = async () => {
      console.log('Fetching workout...')
      try {
        if (user?.uid) {
          const db = getDatabase()
          const userRef = ref(db, `users/${user.uid}/currentWorkout`)
          const snapshot = await get(userRef)
          
          console.log('Firebase response:', snapshot.val())
          
          if (snapshot.exists()) {
            const workoutData = snapshot.val()
            console.log('Workout data:', workoutData)
            setTreinoDisponivel(true)
          } else {
            console.log('No workout found')
            setTreinoDisponivel(false)
          }
        }
      } catch (error) {
        console.error('Error fetching workout:', error)
      } 
    }

    fetchWorkout()
  }, [user])


  useEffect(() => {
    retornaTicket()
      .then(async (tickets) => {
        if (tickets !== null) {
          setUserTickets(tickets);
          console.log(tickets)
        } else {
          setUserTickets(0);
        }
      })
      .catch((error) => {
        setUserTickets(0);
      });
  }, [retornaTicket]);



  const wpp = () => {
    if (userTickets === "TreinoNormal" || userTickets === "TreinoAvançado") {
      setSuporte(!suporte);
    } else {
      const numeroum = "5524999375062";
      const numerodois = "5524992178767";

      const numeros = [];
      function selecionarNumeroAleatoriamente() {
        numeros.push(numeroum);
        numeros.push(numerodois);

        const indiceAleatorio = Math.floor(Math.random() * numeros.length);
        return numeros[indiceAleatorio];
      }

      const whatsappURL = `https://api.whatsapp.com/send?phone=${selecionarNumeroAleatoriamente()}`;

      // Abre uma nova janela ou guia para iniciar a conversa no WhatsApp
      window.open(whatsappURL, "_blank");
    }
  };

 

  // const sendRequest = async (data) => {
  //   try {
  //     const result = await axios.post(
  //       `${process.env.REACT_APP_API_URL}/GerarTreino`,
  //       { data: data, uid: user.uid }
  //     );
  //     setAnswer(result.data.answer);
  //     return;
  //   } catch (error) {
  //     // Adicionando mais detalhes ao erro, se disponíve
  //       console.error("Erro na requisição:", error.message);
  //       adicionarErro("Erro ao enviar a requisição: " + error.message);
  //     }
  //   }


  // Exemplo de uso:

  return (
    <div className="App pb-5">
      {treinoDisponivel === true ? (
        <LoadInicial onClose={() => setTreinoDisponivel(false)} />
      ) : (
        <>
          <header className="App-header p-3">
            <HamburgerMenu
              isOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              userTickets={userTickets}
            />
          </header>
          <br></br>
          <main className="App-main">
            <WorkoutGenerator tickets={userTickets}></WorkoutGenerator>
          </main>
          {suporte && (
            <ErrorCard
              title={"Monte o Seu Treino"}
              message={
                "Preencha as informações novamente, selecione seus musculos e depois clique em montar treino"
              }
              onClose={wpp}
            />
          )}
          <br />
          <br />
          <div></div>
        </>
      )}
    </div>
  );
}

export default Home;