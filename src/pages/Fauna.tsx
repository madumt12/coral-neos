import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Fish, MapPin, AlertCircle, Star, X } from "lucide-react";

// Imagens reais de exemplo para cada espécie
import marineFaunaImage from "@/assets/marine-fauna.jpg";
import baiacuImg from "@/assets/bacaiu.jpg";
import peixeBorboletaImg from "@/assets/peixeborboleta.jpg";
import caranguejoImg from "@/assets/caranguejo.jpg";
import coralCerebroImg from "@/assets/coralcerebro.jpg";
import coralPedregosoImg from "@/assets/coraispedregoso.jpg";


const Fauna = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<any>(null);

  const species = [
    { 
      emoji: "🐡", name: "Baiacu", latin: "Pufferfish", description: "Peixes que se inflam quando ameaçados",
      images: [baiacuImg],
      extraInfo: "O Baiacu é venenoso e inflama seu corpo quando ameaçado, tornando-se quase impossível de ser predado."
    },
    { 
      emoji: "🐠", name: "Peixe-borboleta", latin: "Chaetodon striatus", description: "Coloridos habitantes dos recifes",
      images: [peixeBorboletaImg],
      extraInfo: "Possuem cores vibrantes que ajudam na camuflagem entre os corais."
    },
    { 
      emoji: "🦀", name: "Caranguejo-eremita", latin: "Pagurus spp.", description: "Crustáceos que usam conchas vazias",
      images: [caranguejoImg],
      extraInfo: "Mudam de concha conforme crescem, garantindo proteção ao corpo mole."
    },
    { 
      emoji: "🧠", name: "Coral-cérebro", latin: "Mussismilia braziliensis", description: "Corais endêmicos brasileiros",
      images: [coralCerebroImg],
      extraInfo: "É uma espécie endêmica brasileira que forma colônias muito resistentes."
    },
    { 
      emoji: "🌑", name: "Coral-pedregoso", latin: "Siderastrea stellata", description: "Construtores dos recifes",
      images: [coralPedregosoImg],
      extraInfo: "Esses corais contribuem para a estrutura física dos recifes e abrigam muitas espécies."
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🐠 A Fauna dos Recifes de Corais do Brasil
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Os recifes brasileiros se estendem por quase 3 mil km entre o Maranhão e o Espírito Santo 
            e abrigam uma incrível diversidade de espécies marinhas.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-ocean animate-float">
          <img 
            src={marineFaunaImage} 
            alt="Fauna marinha dos recifes de coral brasileiro" 
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center shadow-gentle hover:shadow-coral transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">3.000 km</div>
              <p className="text-muted-foreground">Extensão dos recifes brasileiros</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-gentle hover:shadow-coral transition-all duration-300 ">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-accent mb-2">35%</div>
              <p className="text-muted-foreground">Dos corais brasileiros são endêmicos</p>
            </CardContent>
          </Card>
          
          <Card className="text-center shadow-gentle hover:shadow-coral transition-all duration-300 ">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-ocean-500 mb-2">408</div>
              <p className="text-muted-foreground">Espécies de peixes recifais registradas</p>
            </CardContent>
          </Card>
        </div>

        {/* Relationship Section */}
        <Card className="mb-12 shadow-ocean animate-float">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary text-2xl">
              <Fish className="w-8 h-8" />
              <span>Relação Entre Corais e Peixes</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-ocean-gradient p-6 rounded-lg text-white">
              <h3 className="text-xl font-semibold mb-4">Uma Parceria Vital</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">🏠 Os corais oferecem:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Abrigo seguro contra predadores</li>
                    <li>• Locais para reprodução</li>
                    <li>• Fonte de alimento</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">🐠 Os peixes contribuem:</h4>
                  <ul className="space-y-1 text-sm">
                    <li>• Limpeza dos corais</li>
                    <li>• Controle de algas</li>
                    <li>• Dispersão de nutrientes</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                <div>
                  <p className="text-red-700 font-medium">Ameaça Critical</p>
                  <p className="text-red-600 text-sm">
                    A perda de apenas 25% dos corais pode levar à extinção de metade das espécies recifais!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Species Showcase */}
<div className="mb-12">
  <h2 className="text-3xl font-bold text-center text-primary mb-2">
    Espécies em Destaque
  </h2>
  <p className="text-center text-muted-foreground mb-6">
    Clique nos ícones para descobrir mais sobre cada espécie
  </p>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {species.map((s, index) => (
      <Card 
        key={index} 
        className="shadow-gentle hover:shadow-coral transition-all duration-300 cursor-pointer"
        onClick={() => setSelectedSpecies(s)}
      >
        <CardHeader className="text-center">
          <div className="text-6xl mb-2">{s.emoji}</div>
          <CardTitle className="text-lg">{s.name}</CardTitle>
          <p className="text-sm text-muted-foreground italic">{s.latin}</p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-center text-muted-foreground">{s.description}</p>
        </CardContent>
      </Card>
    ))}
  </div>
</div>

        {/* Modal de Detalhes */}
        {selectedSpecies && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="max-w-2xl w-full relative animate-fade-in">
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSelectedSpecies(null)}
              >
                <X className="w-6 h-6"/>
              </button>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <span>{selectedSpecies.emoji}</span>
                  <span>{selectedSpecies.name}</span>
                </CardTitle>
                <p className="text-sm italic text-muted-foreground">{selectedSpecies.latin}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{selectedSpecies.extraInfo}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSpecies.images.map((img: string, idx: number) => (
                    <img key={idx} src={img} alt={selectedSpecies.name} className="w-full h-40 object-cover rounded-lg"/>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Gráfico de Pizza */}
<div className="mt-6 mb-12 text-center">
  <h4 className="text-lg font-semibold text-primary mb-4">Distribuição de Diversidade</h4>
  <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden bg-gray-200">
    <div
      className="w-full h-full rounded-full"
      style={{
        background: 'conic-gradient(#3b82f6 0% 35%, #f87171 35% 90%, #22c55e 90% 100%)',
      }}
    ></div>
    {/* Texto central */}
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      <span className="font-bold text-gray-700">100%</span>
      <span className="text-sm text-muted-foreground">Diversidade</span>
    </div>
  </div>

  {/* Legenda */}
  <div className="mt-4 flex justify-center gap-4 text-sm">
    <div className="flex items-center gap-1">
      <span className="w-4 h-4 bg-ocean-500 block rounded-sm"></span> Único 35%
    </div>
    <div className="flex items-center gap-1">
      <span className="w-4 h-4 bg-coral-500 block rounded-sm"></span> Rico 55%
    </div>
    <div className="flex items-center gap-1">
      <span className="w-4 h-4 bg-green-500 block rounded-sm"></span> Diverso 10%
    </div>
  </div>
</div>

{/* Call to Action */}
<Card className="shadow-gentle animate-float mt-8">
  <CardContent className="p-8 text-center">
    <h3 className="text-2xl font-bold text-primary mb-4">Preservação da Fauna Marinha</h3>
    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
      Cada espécie tem um papel fundamental no equilíbrio dos recifes. A preservação da fauna 
      marinha é essencial para manter a saúde dos oceanos e a biodiversidade brasileira.
    </p>
    <div className="bg-ocean-gradient p-4 rounded-lg text-white">
      <p className="font-medium">
        "Proteger os corais é proteger um dos ecossistemas mais ricos e importantes do planeta!"
      </p>
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
};

export default Fauna;
