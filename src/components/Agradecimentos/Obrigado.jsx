import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LoadComponent from "../LoadingComponent/LoadComponent";

function Obrigado() {
 
    return (
        <>
           

            <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-5">
                <FontAwesomeIcon icon={faCheckCircle} color="#000" size="3x" className="mb-4" />
                <h1 className="text-3xl font-bold text-black mb-4">Pagamento Concluído</h1>
              
                <LoadComponent></LoadComponent>
            </div>
        </>
    );
}

export default Obrigado;
