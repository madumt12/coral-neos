import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Waves, Users, Heart, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-coral-reef.jpg";

const Index = () => {
  const features = [
    {
      icon: "🌱",
      title: "Flora Marinha",
      description: "Descubra as algas e plantas que vivem nos recifes",
      link: "/flora"
    },
    {
      icon: "🐠",
      title: "Fauna dos Recifes",
      description: "Conheça os peixes e animais dos corais brasileiros",
      link: "/fauna"
    },
    {
      icon: "🎥",
      title: "Vídeos Educativos",
      description: "Aprenda de forma visual e divertida",
      link: "/videos"
    },
    {
      icon: "💡",
      title: "Curiosidades",
      description: "Fatos incríveis sobre os corais",
      link: "/curiosidades"
    },
    {
      icon: "🌍",
      title: "Preservação",
      description: "Como proteger nossos recifes",
      link: "/preservacao"
    },
    {
      icon: "🎮",
      title: "Jogos",
      description: "Aprenda brincando com nossos jogos",
      link: "/jogos"
    },
    {
  icon: "🐠",
  title: "Reef Kids",
  description: "Atividades e desenhos de corais para brincar e colorir",
  link: "/reefkids"
}
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-900/70 to-ocean-600/50"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto animate-float">
          <div className="mb-8 animate-wave">
            <Waves className="w-20 h-20 text-white mx-auto mb-4" />
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            🌊 Coralíneos Brasil
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Descobrindo os tesouros dos recifes de coral brasileiros
          </p>
          <Link to="/flora">
            <Button size="lg" className="bg-coral-gradient hover:shadow-coral text-white font-semibold px-8 py-4 text-lg animate-float">
              Comece a Explorar
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>

        {/* Animated waves at bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20 animate-wave">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
                  fill="hsl(var(--background))"></path>
          </svg>
        </div>
      </section>



      {/* Features Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Explore Nosso Conteúdo
            </h2>
            <p className="text-xl text-muted-foreground">
              Descubra tudo sobre os corais brasileiros de forma interativa e educativa
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.link}>
                <Card className="h-full shadow-gentle hover:shadow-coral transition-all duration-300 group cursor-pointer">
                  <CardHeader className="text-center">
                    <div className="text-5xl mb-4 group-hover:animate-wave">{feature.icon}</div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <Button variant="ghost" className="group-hover:bg-ocean-gradient group-hover:text-white transition-all">
                      Explorar <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-coral-gradient text-white shadow-coral animate-float">
            <CardContent className="p-12">
              <BookOpen className="w-16 h-16 mx-auto mb-6 animate-wave" />
              <h2 className="text-3xl font-bold mb-4">
                Pronto para Mergulhar no Conhecimento?
              </h2>
              <p className="text-xl mb-8 text-white/90">
                Junte-se a nós nesta jornada educativa pelos recifes de coral mais incríveis do Brasil!
              </p>
              <div className="space-x-4">
                <Link to="/flora">
                  <Button size="lg" variant="secondary" className="text-primary">
                    Começar Agora
                  </Button>
                </Link>
                <Link to="/curiosidades">
                  <Button size="lg" variant="outline" className="border-white text-black hover:bg-white hover:text-coral-500">
                    Ver Curiosidades
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="shadow-ocean animate-float">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-primary flex items-center justify-center space-x-2">
                <Users className="w-8 h-8" />
                <span>Quem Somos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-lg leading-relaxed space-y-4">
              <p>
                Olá! Nós somos a <strong>Beatriz</strong>, a <strong>Madu</strong> e a <strong>Maria Laura</strong>, 
                estudantes do 3º ano T2 do Ensino Médio Integrado em Informática para Internet no 
                <strong> IFSP – Campus Salto</strong>.
              </p>
              <p>
                Nosso projeto nasceu da vontade de unir <strong>tecnologia e educação</strong> para falar sobre 
                um tema que consideramos essencial: os corais do oceano brasileiro 🌊🐠.
              </p>
              <p>
                Queremos compartilhar informações de forma simples e acessível, especialmente para 
                <strong> alunos do ensino fundamental</strong>, mostrando a importância dos corais para a vida marinha, 
                para o equilíbrio ambiental e também para nós, seres humanos.
              </p>
              <div className="bg-ocean-gradient p-6 rounded-lg text-white mt-6">
                <p className="font-semibold flex items-center justify-center space-x-2">
                  <Heart className="w-6 h-6" />
                  <span>Nosso objetivo é despertar a curiosidade, a consciência ambiental e o cuidado com o oceano!</span>
                </p>
              </div>
              <p className="text-xl font-medium text-primary">
                ✨ Sejam bem-vindos ao nosso site e embarquem com a gente nessa jornada pelo fundo do mar! 🌍
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
