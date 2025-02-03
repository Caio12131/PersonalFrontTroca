import React from 'react';
import { jsPDF } from 'jspdf';

export default function RecomendaWhey() {
    const downloadPdf = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const headerHeight = 50; 
        const lineHeight = 10;
        const primaryColor = [29, 158, 34];

        doc.setFillColor(...primaryColor);
        doc.rect(0, 0, pageWidth, 40, 'F');
        const title = 'Recomendações de Whey'
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
Guia de Whey Protein: Escolhendo o Melhor para Seu Objetivo

A escolha do whey protein adequado pode ser decisiva para seus resultados de fitness, seja você focado em perda de peso ou em ganho de massa muscular. Este guia oferece uma análise detalhada das melhores opções disponíveis no mercado, destacando as marcas brasileiras que oferecem ótimo custo-benefício.

Whey Protein Isolado para Emagrecimento:
- Ideal para quem busca reduzir a gordura corporal, o whey protein isolado é a escolha perfeita devido à sua alta concentração de proteínas e baixa presença de carboidratos e gorduras.
  
Marcas Recomendadas:
- Whey Protein Isolado (Dux) 
- Growth Supplements Whey Protein Isolado
- Max Titanium Isolate

Whey Protein Concentrado para Ganho de Massa Muscular:
- Para aqueles que desejam aumentar sua massa muscular, o whey protein concentrado oferece um equilíbrio ideal entre proteínas, carboidratos e gorduras.

Marcas Recomendadas:
- Optimum Nutrition Gold Standard 100% Whey
- Growth Supplements Whey Protein Concentrado
- Max Titanium Top Whey 3W

Dicas para Maximizar seus Resultados com Whey Protein:
- Consistência é Chave: A regularidade no consumo de whey, juntamente com treinos adequados, determina o sucesso a longo prazo.
- Ajuste a sua Dieta: Combine o uso de whey com uma dieta balanceada e específica para suas necessidades calóricas e nutricionais.
- Escolha Consciente: Priorize produtos de fornecedores confiáveis para garantir a qualidade e a eficácia do suplemento.
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
                text: "Clique aqui para ir para o site da Dux (Para Emagrecimento)",
                url: "https://www.duxhumanhealth.com/wheyproteinisolado-pouch-1800g/p?idsku=3167"
            },
            {
                text: "Clique aqui para ir para o site da Growth (Para Emagrecimento)",

                url: "https://www.gsuplementos.com.br/top-whey-protein-isolado-1kg-growth-supplements-p985937"
            },
            {
                text: "Clique aqui para ir para o site da MaxTitanium (Para Emagrecimento)",
                url: "https://www.maxtitanium.com.br/iso-whey-900g-max-titanium/p?idsku=64"
            },
            {
                text: "Clique aqui para ir para o site da Amazon (Para Massa Muscular)",
                url: "https://www.amazon.com.br/Gold-Standard-100-Whey-Chocolate/dp/B002DYIZH6/ref=asc_df_B002DYIZH6/?tag=googleshopp00-20&linkCode=df0&hvadid=405148286787&hvpos=&hvnetw=g&hvrand=3826126395115018648&hvpone=&hvptwo=&hvqmt=&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=1032132&hvtargid=pla-309593040120&psc=1&mcid=435112ec1b453670982fba6bf777ac49"
            },
            {
                text: "Clique aqui para ir para o site da Growth (Para Massa Muscular)",

                url: "https://www.gsuplementos.com.br/whey-protein-concentrado-1kg-growth-supplements-p985936?gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBosr5xdpJ9BIeoxvAASocOgpC7dYFhApEjbspyF-4Kz9RA2LKwNhZTYaAvj9EALw_wcB"
            },
            {
                text: "Clique aqui para ir para o site da MaxTitanium (Para Massa Muscular)",
                url: "https://www.maxtitanium.com.br/100-whey-pote-900g/p?idsku=114&utm_source=googleads&utm_medium=cpc&utm_campaign=GO_PMAX_PROD_P3_BR_MelhoresROAS-SERVER&gad_source=1&gclid=Cj0KCQjwrKu2BhDkARIsAD7GBotuBP8glf5Yq7rlEGiq7nJfH4kijmU6WSu19cm10F_KhgFbmep4cpAaAtnWEALw_wcB"
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

        doc.save("Guia Whey - Facilita Nutri.pdf");
    };

    return (
        <button className="flex border text-sm md:text-base items-center mb-3 p-5 shadow-lg rounded-lg text-black w-full h-[50px] lg:h-[40px]" onClick={downloadPdf}>
            <h1 className='pr-2 m-0'>💪</h1> Recomendações Whey
        </button>
    );
}









