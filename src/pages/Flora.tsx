import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Leaf, AlertTriangle, Microscope, MapPin } from "lucide-react";

// Caminhos relativos corrigidos
import marineFloraImage from "../assets/corais1.jpg";
import algaeTypesImage from "../assets/algas1.jpg";
import symbiosisDiagram from "../assets/zooxantelas1.jpg";
import abrolhosMap from "../assets/abrolhos1.jpg";

const Flora = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🌱 A Flora dos Recifes de Coral no Brasil
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Os recifes de coral são como cidades no fundo do mar, onde plantas e algas desempenham papéis essenciais.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-ocean animate-float">
          <img 
            src={marineFloraImage} 
            alt="Flora marinha dos recifes de coral brasileiro" 
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Algae Types Card com imagem */}
        <Card className="mb-8 shadow-gentle hover:shadow-coral transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary">
              <Leaf className="w-6 h-6" />
              <span>Tipos de Algas</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className="bg-coral-gradient text-white">Algas Vermelhas</Badge>
              <Badge className="bg-ocean-500 text-white">Algas Verdes</Badge>
              <Badge className="bg-amber-500 text-white">Algas Marrons</Badge>
            </div>
            <img src={algaeTypesImage} alt="Tipos de algas marinhas" className="w-full rounded-lg mb-4" />
            <p className="text-muted-foreground">
              As algas são essenciais para o ecossistema marinho, fornecendo alimento e abrigo para diversas espécies.
            </p>
          </CardContent>
        </Card>

        {/* Symbiosis Section com diagrama */}
        <Card className="mb-8 shadow-ocean animate-float">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-primary text-2xl">
              <Microscope className="w-8 h-8" />
              <span>Parceria Microscópica</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-ocean-gradient p-6 rounded-lg text-white text-center">
              <h3 className="text-xl font-semibold mb-3">Zooxantelas - As Algas Parceiras</h3>
              <img src={symbiosisDiagram} alt="Diagrama simbiótico coral-alga" className="w-full rounded-lg mb-4"/>
              <p>
                As zooxantelas vivem dentro dos corais e fornecem nutrientes essenciais através da fotossíntese.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Abrolhos Map */}
        <Card className="bg-coral-gradient text-white shadow-coral animate-float mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <MapPin className="w-8 h-8" />
              <span>Alerta em Abrolhos</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <img src={abrolhosMap} alt="Mapa da região de Abrolhos" className="w-full rounded-lg mb-4"/>
            <p className="text-lg font-medium mb-2">Descoberta Científica Importante</p>
            <p>
              Pesquisadores encontraram a presença de <strong>Symbiodinium necroappetens</strong> em corais estressados na região de Abrolhos.
            </p>
          </CardContent>
        </Card>

        {/* Conclusion */}
        <Card className="mt-12 shadow-gentle animate-float">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-primary mb-4">Conclusão</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              A flora dos recifes é <strong>riquíssima e essencial</strong> para o ecossistema marinho. 
              Proteja esses ambientes para as futuras gerações.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Flora;
