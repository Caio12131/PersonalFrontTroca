import React from 'react';
import { jsPDF } from 'jspdf';

export default function RecomendaCreatina() {
    const downloadPdf = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const headerHeight = 50; 
        const lineHeight = 10;
        const primaryColor = [29, 158, 34];

        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 40, 'F');
        const title = 'Recomendações de Creatina'
        const subtitle = 'Facilita Nutri'
         // Add title
         doc.setTextColor(255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(title, pageWidth / 2, 20, { align: 'center' });

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text(subtitle, pageWidth / 2, 30, { align: 'center' });

        doc.setTextColor(0);
        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        let yPos = headerHeight; 
        const staticText = `
Guia de Creatina: Potencializando Seu Desempenho Físico

A creatina é um suplemento popular entre atletas e entusiastas do fitness devido à sua eficácia comprovada em aumentar a força muscular, melhorar o desempenho em atividades de alta intensidade e acelerar a recuperação muscular. Este guia explora os benefícios, usos e tipos de creatina disponíveis no mercado.

Quem Pode Usar Creatina? A creatina é adequada para uma ampla gama de pessoas, desde atletas profissionais até indivíduos que frequentam a academia regularmente. É especialmente benéfica para aqueles que realizam atividades que requerem explosões rápidas de força, como levantamento de peso, sprint e esportes de alta intensidade. No entanto, é sempre recomendável consultar um médico ou nutricionista antes de iniciar a suplementação, especialmente para pessoas com condições pré-existentes.

Para Que Serve a Creatina? A creatina serve para ajudar a regenerar uma forma de energia chamada ATP (trifosfato de adenosina), que é usada durante atividades físicas de curta duração e alta intensidade. Ao aumentar a disponibilidade de ATP, a creatina permite que você execute melhor essas atividades, contribuindo para ganhos de força e massa muscular, além de melhorar a recuperação muscular.

Dependendo do Objetivo Ganho de Massa Muscular: A creatina maximiza a fase de volumização celular, ajudando a aumentar o tamanho e a força dos músculos. Melhora do Desempenho Esportivo: Aumenta a capacidade de produzir energia rapidamente, o que é crucial em esportes que requerem explosões de velocidade e força. Recuperação: Auxilia na recuperação muscular ao reduzir o dano muscular e inflamação após exercícios intensos.

Tipos de Creatina Monohidratada: A forma mais estudada e utilizada, conhecida por sua eficácia em aumentar o desempenho físico e ser economicamente acessível. Micronizada: Uma versão mais finamente moída da creatina monohidratada que pode ser mais facilmente absorvida pelo corpo. Etil Ester: Alega oferecer melhor absorção e eficácia que a monohidratada, mas as pesquisas são mistas. Hidroclorato (HCL): Reivindica menor necessidade de dosagem e menos desconforto estomacal.

Marcas Recomendadas:
Universal Nutrition Optimum Nutrition Creatine Powder
Creatina Monohidratada (Dux) - Pura
Growth Supplements Creatina Monohidratada
Max Titanium Creatina Monohidratada
Integralmédica Hardcore
Probiótica Pura Nutrify


Dicas para Maximizar seus Resultados com Creatina: Hidratação é Essencial: Aumentar a ingestão de água é crucial para ajudar a creatina a funcionar efetivamente. Ciclos de Suplementação: Alguns preferem ciclar a creatina, alternando períodos de uso e pausa. Combine com Treino Adequado: Para melhores resultados, combine a suplementação de creatina com treinos de força e explosão.
`;

        const splitText = doc.splitTextToSize(staticText, pageWidth - 20);
        splitText.forEach(line => {
            if (yPos + lineHeight > pageHeight) {
                doc.addPage();
                yPos = 10;
            }
            doc.text(line, 10, yPos);
            yPos += lineHeight;
        });

        const links = [
            {
                text: "Clique aqui para ir para o site da Dux",
                url: "https://www.duxhumanhealth.com/creatinamonohidratada-pote300g/p?idsku=3422&network=x&utm_source=google&utm_medium=cpc&utm_campaign=conversao-aquisicao-google-pmax-dux-sazonais_&utm_content=&utm_term=-&cupom=clientevip15&gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBouriU0OlrRvFCJiDGa0z8QRNZNYIDRuHlvRryV0l9iLwjBlUlo7WT0aAtJeEALw_wcB"
            },
            {
                text: "Clique aqui para ir para o site da Growth",
                url: "https://www.gsuplementos.com.br/creatina-250g-creapure-growth-supplements-p985824?=&apwc=Y2FuYWxJbnRlZ3JhY2FvPTc1N3xwcm9kdXRvPTcw&gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBosnS8fAQetf4N3lRh-YzXXa6Q1ZXYnHPTSzvXwyT-d6j3YLUlwEHxgaAhCPEALw_wcB"
            },
            {
                text: "Clique aqui para ir para o site da MaxTitanium",
                url: "https://www.maxtitanium.com.br/creatine-pote-300g/p?idsku=31&utm_source=googleads&utm_medium=cpc&utm_campaign=GO_PMAX_PROD_P3_BR_MelhoresROAS-SERVER&gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBouJTTVDFeDfTma05XHNk3Q0_6SWgti1-f3M-yWVVrslo242ojO1CooaAvK3EALw_wcB"
            },
        ];

        links.forEach(link => {
            if (yPos + lineHeight > pageHeight) {
                doc.addPage();
                yPos = 10;
            }
            doc.textWithLink(link.text, 10, yPos, { url: link.url });
            yPos += lineHeight;
        });

        doc.save("Guia Creatina - Facilita Nutri.pdf");
    };

    return (
        <button className="flex border text-sm md:text-base mb-3 items-center p-5 shadow-lg rounded-lg text-black w-full h-[50px] lg:h-[40px]" onClick={downloadPdf}>
            <h1 className='pr-2 m-0'>🏋️‍♂️</h1> Recomendações de Creatina
        </button>
    );
}
