import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, ExternalLink, Clock, Eye, X } from "lucide-react";

const Videos = () => {
  const [modalVideo, setModalVideo] = useState(null); // Video atual para o modal

  const videoCategories = [
    {
      title: "O que são corais",
      description: "Vídeos introdutórios sobre a natureza dos corais",
      videos: [
        {
          title: "Os Corais são animais ou plantas?",
          description: " Descubra nessa postagem se essas incríveis estruturas submarinas são mais parecidas com vegetais 🌱 ou criaturas marinhas 🦑.",
          duration: "0:51",
          views: "399",
          thumbnail: "🌊",
          url: "https://www.youtube.com/embed/lK3jYrr9a0M"
        },
        {
          title: "O que são RECIFES de CORAIS 🌿🐠 (Tipos, como são formados e importância)",
          description: "Os RECIFES de CORAIS são um dos ECOSSISTEMAS mais diversos do planeta. ",
          duration: "6:02",
          views: "36k",
          thumbnail: "🌊",
          url: "https://www.youtube.com/embed/FI0hANxRqMc"
        }
      ]
    },
    {
  title: "Fauna e Flora dos Recifes",
  description: "A vida que habita os recifes de coral",
  videos: [
    {
      title: "Vida nos Recifes",
      description: "Documentário produzido pelo Projeto Coral Vivo fala sobre os corais brasileiros e os recifes coralíneos da Bahia. Nele abordamos de forma clara e objetiva informações sobre os corais, sua importância, características dos recifes brasileiros e sua biodiversidade.",
      duration: "17:26",
      views: "232k",
      thumbnail: "🐠",
      url: "https://www.youtube.com/embed/YJwESgeDBis"
    },
    {
  title: "Tubarões extintos em recifes de corais pelo mundo",
  description: "pesquisadores da Global FinPrint revelam que os tubarões estão ausentes em muitos dos recifes de coral do mundo, indicando que eles estão raros demais para cumprirem a sua função normal no ecossistema e se tornaram 'funcionalmente extintos'.",
  duration: "1:33",
  views: "242",
  thumbnail: "🦈",
  url: "https://www.youtube.com/embed/f12tBDU7C0I"
}
,
    {
      title: "cadeia alimentar nos OCEANOS.",
      description: "Entenda qual a função de cada ser vivo dentro de uma cadeia alimentar, por vezes, o seu nível trófico pode mudar, em se tratando de consumidores.",
      duration: "2:30",
      views: "1,8k",
      thumbnail: "🐠",
      url: "https://www.youtube.com/embed/HrEQnwYX4Is"
    }
  ]
}
,
    {
      title: "Ameaças e Preservação",
      description: "Como proteger os recifes de coral",
      videos: [
        {
          title: "O que é branqueamento dos corais",
          description: "Entenda este fenômeno e suas causas.",
          duration: "1:49",
          views: "82k",
          thumbnail: "🤍",
          url: "https://www.youtube.com/embed/QgI4zJZKTJc"
        },
        {
          title: "Os oceanos e as mudanças climáticas",
          description: "O impacto do aquecimento global nos recifes de coral.",
          duration: "6:18",
          views: "4,4k",
          thumbnail: "🌡️",
          url: "https://www.youtube.com/embed/8VA9fIRQnDg"
        },
        {
          title: "Projetos para trabalhar na conservação e preservação da biodiversidade",
          description: "Conheça iniciativas para salvar os recifes brasileiros.",
          duration: "2,56",
          views: "347",
          thumbnail: "🛡️",
          url: "https://www.youtube.com/embed/HkKFn2ZISa8"
        }
      ]
    }
  ];

  const featuredVideo = {
    title: "SEGREDOS DE ABROLHOS | Sobrevivendo Entre Corais e Predadores do Oceano | Documentários animais",
    description: "Olá, pessoal! Hoje, vamos embarcar juntos em uma jornada fascinante pelo arquipélago de Abrolhos, um dos santuários marinhos mais únicos do planeta.",
    duration: "1:17:53",
    views: "109.913",
    category: "Documentário",
    url: "https://www.youtube.com/embed/x8dIg3bYaT0"
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            🎥 Vídeos Educativos
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Aprenda de forma visual e divertida sobre os corais brasileiros através de 
            nossos vídeos educativos cuidadosamente selecionados.
          </p>
        </div>

        {/* Featured Video */}
        <Card className="mb-12 shadow-ocean">
          <CardHeader className="bg-coral-gradient text-white rounded-t-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Badge className="bg-white/20 text-white">Em Destaque</Badge>
              <Badge className="bg-white/20 text-white">{featuredVideo.category}</Badge>
            </div>
            <CardTitle className="text-2xl">{featuredVideo.title}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div
              className="relative aspect-video bg-gradient-to-br from-ocean-600 to-ocean-800 flex items-center justify-center group cursor-pointer"
              onClick={() => setModalVideo(featuredVideo)}
            >
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto group-hover:bg-white/30 transition-all duration-300">
                  <Play className="w-10 h-10 text-white ml-1" />
                </div>
                <p className="text-lg font-medium">Assistir Vídeo em Destaque</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Categories */}
        {videoCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-12">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-primary mb-2">{category.title}</h2>
              <p className="text-muted-foreground">{category.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.videos.map((video, videoIndex) => (
                <Card
                  key={videoIndex}
                  className="shadow-gentle hover:shadow-coral transition-all duration-300 group cursor-pointer"
                  onClick={() => setModalVideo(video)}
                >
                  <CardContent className="p-0">
                    <div className="relative aspect-video bg-gradient-to-br from-ocean-200 to-ocean-400 flex items-center justify-center">
                      <div className="text-6xl mb-2">{video.thumbnail}</div>
                    </div>
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{video.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{video.views}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Modal */}
        {modalVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl overflow-hidden relative">
              <button
                className="absolute top-3 right-3 text-gray-700 hover:text-gray-900"
                onClick={() => setModalVideo(null)}
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                className="w-full aspect-video"
                src={modalVideo.url}
                title={modalVideo.title}
                allowFullScreen
              ></iframe>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{modalVideo.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{modalVideo.description}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{modalVideo.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{modalVideo.views}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videos;
