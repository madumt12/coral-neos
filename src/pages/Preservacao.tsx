import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, DollarSign, Users, Globe, ExternalLink, Heart } from "lucide-react";
import coralConservationImage from "@/assets/coral-conservation.jpg";

const Preservacao = () => {
  const importanceItems = [
    {
      icon: Globe,
      title: "Biodiversidade",
      description: "25% das espécies marinhas vivem em recifes de coral",
      color: "bg-green-500"
    },
    {
      icon: Shield,
      title: "Proteção Natural",
      description: "Funcionam como barreiras contra erosão costeira",
      color: "bg-blue-500"
    },
    {
      icon: DollarSign,
      title: "Economia e Turismo",
      description: "Geram até R$ 7 bilhões/ano no Brasil",
      color: "bg-yellow-500"
    },
    {
      icon: Users,
      title: "Segurança Alimentar",
      description: "Milhões de pessoas dependem da pesca em recifes",
      color: "bg-purple-500"
    }
  ];

  const organizations = [
    {
  name: "Biofábrica de Corais",
  description: "Restaurar recifes de coral e promover pesquisas científicas sobre conservação marinha",
  website: "https://biofabricadecorais.com/"
},
    {
      name: "Projeto Conservação Recifal",
      description: "Iniciativa para proteção e restauração de recifes",
      website: "https://www.conservacaorecifal.com/"
    },
    {
      name: "Instituto Coral Vivo",
      description: "Pesquisa científica e educação ambiental",
      website: "https://www.coralvivo.org.br"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🌍 A Importância da Preservação dos Corais no Brasil
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Os recifes de coral são ecossistemas fundamentais para a vida no planeta. 
            Protegê-los é proteger nosso futuro.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-ocean animate-float">
          <img 
            src={coralConservationImage} 
            alt="Conservação dos recifes de coral" 
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Importance Cards */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            Por Que Preservar os Corais?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {importanceItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card key={index} className="shadow-gentle hover:shadow-coral transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3">
                      <div className={`p-3 rounded-full ${item.color} text-white`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xl">{item.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-lg">{item.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Statistics Section */}
        <Card className="mb-12 shadow-ocean animate-float">
          <CardHeader className="bg-ocean-gradient text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center">Números que Impressionam</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">25%</div>
                <p className="text-muted-foreground">das espécies marinhas</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-accent mb-2">R$ 7bi</div>
                <p className="text-muted-foreground">em turismo anual</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-ocean-500 mb-2">500mi</div>
                <p className="text-muted-foreground">pessoas dependem dos recifes</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-coral-500 mb-2">3.000km</div>
                <p className="text-muted-foreground">de recifes no Brasil</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Threats Section */}
        <Card className="mb-12 shadow-gentle animate-float">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center space-x-2">
              <Shield className="w-8 h-8" />
              <span>Principais Ameaças</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Badge className="bg-red-500 text-white">🌡️ Aquecimento Global</Badge>
                <p className="text-sm text-muted-foreground">
                  O aumento da temperatura oceânica causa branqueamento dos corais
                </p>
                
                <Badge className="bg-orange-500 text-white">🏭 Poluição</Badge>
                <p className="text-sm text-muted-foreground">
                  Produtos químicos e plásticos prejudicam os ecossistemas recifais
                </p>
              </div>
              <div className="space-y-3">
                <Badge className="bg-yellow-500 text-white">🚢 Turismo Predatório</Badge>
                <p className="text-sm text-muted-foreground">
                  Visitação sem controle danifica os recifes fisicamente
                </p>
                
                <Badge className="bg-purple-500 text-white">🎣 Pesca Excessiva</Badge>
                <p className="text-sm text-muted-foreground">
                  Desequilibra a cadeia alimentar dos recifes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Organizations Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center text-primary mb-8">
            ONGs e Projetos
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {organizations.map((org, index) => (
              <Card key={index} className="shadow-gentle hover:shadow-coral transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{org.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 text-sm">{org.description}</p>
                  <a 
                    href={org.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:bg-ocean-500 hover:text-white"
                    >
                      Saiba Mais <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Help Section */}
        <Card className="shadow-coral animate-float">
          <CardHeader className="bg-coral-gradient text-white rounded-t-lg">
            <CardTitle className="text-2xl text-center flex items-center justify-center space-x-2">
              <Heart className="w-8 h-8" />
              <span>Como Você Pode Ajudar</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Ações Individuais</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Reduza o uso de plásticos descartáveis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Use protetor solar biodegradável</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Pratique turismo responsável</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-green-500">✓</span>
                    <span>Apoie produtos sustentáveis</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-primary mb-4">Educação e Conscientização</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500">📚</span>
                    <span>Compartilhe conhecimento sobre corais</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500">👥</span>
                    <span>Participe de projetos de conservação</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500">🌱</span>
                    <span>Apoie pesquisas científicas</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-blue-500">💬</span>
                    <span>Sensibilize outros sobre a importância</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <div className="bg-white/20 p-6 rounded-lg">
                <p className="text-lg font-medium text-primary mb-2">
                  "Cada ação individual contribui para a preservação dos oceanos"
                </p>
                <p className="text-muted-foreground">
                  Juntos, podemos garantir que as futuras gerações também possam 
                  admirar a beleza dos recifes de coral brasileiros.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Preservacao;
