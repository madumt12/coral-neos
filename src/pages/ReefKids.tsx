import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Palette, Image as ImageIcon } from "lucide-react";
import { Link } from "react-router-dom";

import coral1 from "../assets/desenho-coral1.png";
import coral2 from "../assets/desenho-coral2.avif";
import coral3 from "../assets/desenho-coral3.jpg";

const drawings = [
  { src: coral1, title: "Coral 01", imgId: 1, badgeColor: "bg-ocean-500" },
  { src: coral2, title: "Coral 02", imgId: 2, badgeColor: "bg-coral-gradient" },
  { src: coral3, title: "Coral 03", imgId: 3, badgeColor: "bg-amber-500" },
];

const ReefKids = () => {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4 flex items-center justify-center gap-3">
          🐠 Reef Kids 🎨
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
          Um espaço divertido para aprender sobre os corais enquanto colore, brinca e explora o mundo marinho!
        </p>

        <h2 className="text-3xl font-bold text-primary mb-6 flex items-center gap-2 justify-center">
          <Palette className="w-7 h-7" /> Desenhos para Colorir
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drawings.map(({ src, title, imgId, badgeColor }) => (
            <Card key={imgId} className="shadow-ocean hover:shadow-coral transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-primary">
                  <ImageIcon className="w-6 h-6" />
                  <span>{title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <img
                  src={src}
                  alt={title}
                  className="w-full rounded-lg mb-4 hover:scale-105 transition-transform"
                />
                <Link to={`/colorir?img=${imgId}`}>
                  <Badge className={`${badgeColor} text-white cursor-pointer`}>Colorir</Badge>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReefKids;
