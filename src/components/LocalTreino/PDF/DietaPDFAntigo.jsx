import jsPDF from "jspdf";
import header from '../../../img/Header.png'
import { UserAuth } from "../../../context/AuthContext";
import { useState, useEffect } from "react";

const DietaPDFAntigo = ({userDieta}) => {
  const {retornaDados} = UserAuth()
  const [userAltura, setUserAltura] = useState(null);
  const [userPeso, setUserPeso] = useState(null);
  const [userImc, setUserImc] = useState('');
  const [mensagem, setMensagem] = useState('');
  useEffect(() => {
    
    retornaDados()
      .then((array) => {
        if (array !== null) {
          setUserPeso(array[0]);
          setUserAltura(array[1]);
          const imcCalculado = array[0] / (array[1] * array[1]);
          setUserImc(imcCalculado.toFixed(1));
          if (imcCalculado < 18.5) {
            setMensagem("Você está abaixo do peso");
          } else if (imcCalculado >= 18.5 && imcCalculado <= 24.9) {
            setMensagem("Você está com peso normal");
          } else if (imcCalculado >= 25 && imcCalculado <= 29.9) {
            setMensagem("Você está com sobrepeso");
          } else if (imcCalculado >= 30) {
            setMensagem("Você está com obesidade");
          } else {
            setMensagem("Por favor, atualize seus dados de peso e altura.");
          }
        } else {
          console.log('Sem dados ainda');
        }
      })
      .catch((error) => {
        console.error('Erro ao obter os dados:', error);
      });
  }, [retornaDados]);

    const handleDownloadPDF = (userDieta) => {
        if (!userDieta) {
          return;
        }
  
      const agua = (userPeso ? 0.035 * userPeso : 0).toFixed(2);
        
      const pdf = new jsPDF();
      const margin = 10;
      const pageWidth = pdf.internal.pageSize.width;
      const pageHeight = pdf.internal.pageSize.height - 1 * 8;
      const fontSize = 12;
      const dado = `Altura: ${userAltura}\nPeso: ${userPeso}\nIMC: ${userImc}\n${mensagem}\nQuantidade de Água Mínima Recomendada: ${agua}L\n`
  
      const splitText = pdf.splitTextToSize(`\nDieta Totalmente Personalizada e Exclusiva\nAconselhável Trocar a Dieta Depois de 20 Dias\n${dado}\n${userDieta}`, pageWidth - margin * 2);
  
        const headerHeight = 49;
        pdf.addImage(header, 'PNG', 0, 0, pageWidth, headerHeight); // Ajusta a largura da imagem para corresponder à largura total da página
    
        let yPosition = margin + headerHeight - 8; 
    
        for (let i = 0; i < splitText.length; i++) {
          if (yPosition + 5 > pageHeight) {
            pdf.addPage();
            yPosition = margin;
          }
    
          pdf.setFontSize(fontSize);
    
          if (splitText[i].includes('Dieta Totalmente Personalizada e Exclusiva')) {
            pdf.setFontSize(16)
          } else {
            pdf.setTextColor(0);
          }
    
          if (splitText[i].includes('Café da Manhã') ||
            splitText[i].includes('Lanche da Manhã') ||
            splitText[i].includes('Café da manhã') ||
            splitText[i].includes('Lanche da manhã') ||
            splitText[i].includes('Almoço') ||
            splitText[i].includes('Lanche da Tarde') ||
            splitText[i].includes('Lanche da tarde') ||
            splitText[i].includes('Dieta Totalmente Personalizada e Exclusiva') ||
            splitText[i].includes('Janta')) {
            pdf.setTextColor(50, 205, 50); // Cor azul 
          } else {
            pdf.setTextColor(0); // Volta à cor padrão do texto (preto)
          }
    
          pdf.text(margin, yPosition, splitText[i]);
    
          yPosition += fontSize - 2;
        }
    
    
        // Rodapé moderno
        pdf.setFillColor('#1C9E22'); // Cor de fundo verde
        pdf.rect(0, pageHeight - 10, pageWidth, 30, 'F');
        pdf.setFontSize(12); // Ajusta o tamanho da fonte
        pdf.setTextColor('#ffffff'); // Texto branco
    
        // Centraliza o texto no rodapé
        let footerText = 'Caso tenha algudasdsama dúvida, entre em contato.';
        let textWidth = pdf.getTextWidth(footerText);
        pdf.text((pageWidth - textWidth) / 2, pageHeight - 5, footerText);
    
        const fileName = 'Facilita-Nutri .pdf';
        pdf.save(fileName);
    };
    return (     <button className='bg-green-50 text-green-800 font-bold py-2 px-2 rounded mx-2' onClick={() => handleDownloadPDF(userDieta)}
          >
            Baixar PDF 📥
          </button>
      );
}

export default DietaPDFAntigo;