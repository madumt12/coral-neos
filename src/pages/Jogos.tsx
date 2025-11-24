import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, RotateCcw, Trophy, Target } from "lucide-react";
import { toast } from "sonner";

const Jogos = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);

  // ------------------------- Jogo 1 ---------------------------

  const questions = [
    {
      statement: "Os corais são plantas marinhas que fazem fotossíntese.",
      correct: false,
      explanation: "Os corais são animais! Eles vivem em simbiose com algas (zooxantelas) que fazem fotossíntese."
    },
    {
      statement: "O Banco de Abrolhos é o maior recife de coral do Atlântico Sul.",
      correct: true,
      explanation: "Correto! O Banco de Abrolhos, localizado na Bahia, é realmente o maior complexo recifal do Atlântico Sul."
    },
    {
      statement: "Todos os corais brasileiros podem ser encontrados em outros países.",
      correct: false,
      explanation: "Falso! 35% dos corais brasileiros são endêmicos."
    },
    {
      statement: "Os corais podem viver centenas de anos.",
      correct: true,
      explanation: "Alguns corais vivem por séculos, passando de 400 anos."
    },
    {
      statement: "O branqueamento sempre mata os corais imediatamente.",
      correct: false,
      explanation: "Eles podem se recuperar se as condições melhorarem."
    },
    {
      statement: "Os recifes de coral protegem a costa da erosão.",
      correct: true,
      explanation: "Eles funcionam como barreiras naturais."
    },
    {
      statement: "Apenas peixes pequenos vivem nos recifes de coral.",
      correct: false,
      explanation: "Vivem desde pequenos crustáceos até tubarões."
    },
    {
      statement: "Os corais crescem rapidamente, metros por ano.",
      correct: false,
      explanation: "Eles crescem apenas centímetros por ano."
    },
    {
      statement: "O aquecimento global ameaça os corais.",
      correct: true,
      explanation: "A temperatura elevada causa estresse e branqueamento."
    },
    {
      statement: "Corais só existem em águas quentes.",
      correct: false,
      explanation: "Existem corais de águas frias!"
    }
  ];

  const handleAnswer = (answer: boolean) => {
    setSelectedAnswer(answer);
    setShowResult(true);

    if (answer === questions[currentQuestion].correct) {
      setScore(score + 10);
      toast.success("Resposta correta! +10 pontos");
    } else {
      toast.error("Resposta incorreta!");
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setGameCompleted(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameCompleted(false);
  };

  const getScoreMessage = () => {
    const percentage = (score / (questions.length * 10)) * 100;
    if (percentage >= 90) return "🏆 Especialista em Corais!";
    if (percentage >= 70) return "🌊 Muito bem!";
    if (percentage >= 50) return "🐠 Bom trabalho!";
    return "🌱 Continue aprendendo!";
  };

  // ---------------------- Jogo 2 (Adivinhação) ----------------------------
  const quizAnimais = [
    {
      pergunta: "Qual animal é conhecido por mudar de cor e viver nos recifes?",
      opcoes: ["Peixe-palhaço", "Polvo", "Cavalo-marinho"],
      correta: "Polvo"
    },
    {
      pergunta: "Qual desses animais possui uma carapaça rígida?",
      opcoes: ["Tartaruga-marinha", "Raia", "Moreia"],
      correta: "Tartaruga-marinha"
    },
    {
      pergunta: "Qual peixe famoso vive em anêmonas?",
      opcoes: ["Cirurgião-azul", "Peixe-palhaço", "Baiacu"],
      correta: "Peixe-palhaço"
    }
  ];

  const [animalIndex, setAnimalIndex] = useState(0);
  const [animalResposta, setAnimalResposta] = useState<string | null>(null);

  const responderAnimal = (opcao: string) => {
    setAnimalResposta(opcao);
  };

  const proximoAnimal = () => {
    setAnimalResposta(null);
    setAnimalIndex((prev) => (prev + 1) % quizAnimais.length);
  };

  // ---------------------- Jogo 3 (Encaixe Simples) ----------------------------

  const palavras = [
    { img: "🐠", correta: "Peixe" },
    { img: "🐢", correta: "Tartaruga" },
    { img: "🪸", correta: "Coral" }
  ];

  const [indexEncaixe, setIndexEncaixe] = useState(0);
  const [respostaEncaixe, setRespostaEncaixe] = useState<string | null>(null);

  const tentarEncaixe = (palavra: string) => {
    setRespostaEncaixe(palavra);
  };

  const proximoEncaixe = () => {
    setRespostaEncaixe(null);
    setIndexEncaixe((prev) => (prev + 1) % palavras.length);
  };

  // ------------------------- RENDERIZAÇÃO -------------------------------

  if (gameCompleted) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <Card className="shadow-coral animate-float">
            <CardHeader className="bg-coral-gradient text-white rounded-t-lg">
              <CardTitle className="text-3xl flex items-center justify-center space-x-2">
                <Trophy className="w-8 h-8" />
                <span>Parabéns!</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-12">
              <div className="text-6xl font-bold text-primary mb-4">{score}</div>
              <p className="text-xl text-muted-foreground mb-6">
                de {questions.length * 10} pontos possíveis
              </p>
              <div className="bg-ocean-gradient p-6 rounded-lg text-white mb-8">
                <p className="text-lg font-medium">{getScoreMessage()}</p>
              </div>
              <Button onClick={restartGame} className="bg-coral-gradient text-white">
                <RotateCcw className="w-5 h-5 mr-2" />
                Jogar Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* -------------------- HERO ---------------------- */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold">🎮 Jogos Educativos</h1>
          <p className="text-xl text-muted-foreground">
            Teste seus conhecimentos sobre o mar!
          </p>
        </div>

        {/* -------------------- JOGO 1 ---------------------- */}
        <Card className="shadow-ocean animate-float mb-20">
          <CardHeader>
            <Badge className="bg-ocean-500 text-white">Verdadeiro ou Falso</Badge>
            <CardTitle className="text-2xl">
              {questions[currentQuestion].statement}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {!showResult ? (
              <div className="grid grid-cols-2 gap-4">
                <Button className="bg-green-500 text-white" onClick={() => handleAnswer(true)}>
                  Verdadeiro
                </Button>
                <Button className="bg-red-500 text-white" onClick={() => handleAnswer(false)}>
                  Falso
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-lg ${
                    selectedAnswer === questions[currentQuestion].correct
                      ? "bg-green-50 border border-green-300"
                      : "bg-red-50 border border-red-300"
                  }`}
                >
                  <p>{questions[currentQuestion].explanation}</p>
                </div>

                <Button className="w-full bg-ocean-gradient text-white" onClick={nextQuestion}>
                  {currentQuestion < questions.length - 1 ? "Próxima" : "Finalizar"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* -------------------- JOGO 2 (ADIVINHAÇÃO) ---------------------- */}
        <Card className="shadow-gentle animate-float mb-20">
          <CardHeader className="text-center">
            <Badge className="bg-amber-500 text-white">Jogo 2 - Adivinhe o Animal</Badge>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            <h2 className="text-xl font-semibold">{quizAnimais[animalIndex].pergunta}</h2>

            {quizAnimais[animalIndex].opcoes.map((opcao) => (
              <Button
                key={opcao}
                variant="outline"
                className="w-full"
                onClick={() => responderAnimal(opcao)}
              >
                {opcao}
              </Button>
            ))}

            {animalResposta && (
              <div className="p-4 rounded-lg bg-blue-50 border">
                {animalResposta === quizAnimais[animalIndex].correta ? (
                  <p className="text-green-600 font-medium">✔ Acertou!</p>
                ) : (
                  <p className="text-red-600 font-medium">✘ Errou! A resposta correta é: {quizAnimais[animalIndex].correta}</p>
                )}

                <Button className="mt-4 bg-ocean-500 text-white" onClick={proximoAnimal}>
                  Próxima
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* -------------------- JOGO 3 (ENCAIXE) ---------------------- */}
        <Card className="shadow-gentle animate-float">
          <CardHeader className="text-center">
            <Badge className="bg-purple-500 text-white">Jogo 3 - Encaixe a Palavra</Badge>
          </CardHeader>

          <CardContent className="space-y-6 text-center">
            <div className="text-6xl">{palavras[indexEncaixe].img}</div>

            <div className="grid grid-cols-3 gap-4">
              {["Peixe", "Tartaruga", "Coral"].map((p) => (
                <Button key={p} variant="outline" onClick={() => tentarEncaixe(p)}>
                  {p}
                </Button>
              ))}
            </div>

            {respostaEncaixe && (
              <div className="p-4 mt-4 rounded-lg bg-blue-50 border">
                {respostaEncaixe === palavras[indexEncaixe].correta ? (
                  <p className="text-green-600 font-semibold">✔ Correto!</p>
                ) : (
                  <p className="text-red-600 font-semibold">✘ Errado. Resposta: {palavras[indexEncaixe].correta}</p>
                )}

                <Button className="mt-4 bg-purple-500 text-white" onClick={proximoEncaixe}>
                  Próximo
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Jogos;
