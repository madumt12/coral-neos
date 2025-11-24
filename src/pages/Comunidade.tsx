import { useState, useEffect } from "react"; 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Plus, X, Send, Users, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Topic {
  id: string;
  title: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  author_name?: string;
  category: "Corais" | "Peixes" | "Sustentabilidade";
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  author_name?: string;
}

interface Like {
  user_id: string;
}

const categories = [
  { name: "Corais", color: "bg-coral-500 text-white" },
  { name: "Peixes", color: "bg-ocean-500 text-white" },
  { name: "Sustentabilidade", color: "bg-green-500 text-white" },
];

// 20 tópicos fixos categorizados
const fixedTopics: Topic[] = [ 
  { id: "fixed-1", title: "🌊 Proteja os corais", content: "Os corais são essenciais para a vida marinha. Aprenda a protegê-los e manter os oceanos saudáveis!", likes_count: 10, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Corais" },
  { id: "fixed-2", title: "🐠 Espécies em perigo", content: "Alguns corais e peixes estão em risco de extinção. Conheça as espécies mais ameaçadas.", likes_count: 8, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Peixes" },
  { id: "fixed-3", title: "🏝️ Turismo sustentável", content: "Dicas para visitar praias e recifes sem prejudicar o meio ambiente.", likes_count: 5, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-4", title: "🌐 Ciências marinhas", content: "Descubra as principais pesquisas sobre ecossistemas marinhos.", likes_count: 12, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Corais" },
  { id: "fixed-5", title: "⚠️ Poluição nos oceanos", content: "Como resíduos plásticos afetam a vida marinha e o que você pode fazer.", likes_count: 9, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-6", title: "🔬 Projetos de restauração", content: "Conheça projetos que ajudam a restaurar recifes de corais danificados.", likes_count: 6, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Corais" },
  { id: "fixed-7", title: "🌞 Energia e oceanos", content: "Como a energia solar e eólica pode reduzir impactos ambientais.", likes_count: 4, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-8", title: "🌱 Sustentabilidade no dia a dia", content: "Pequenas ações podem ajudar a proteger os oceanos.", likes_count: 7, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-9", title: "🦀 Biodiversidade marinha", content: "Entenda a importância da diversidade de espécies marinhas.", likes_count: 5, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Peixes" },
  { id: "fixed-10", title: "📚 Educação ambiental", content: "Como ensinar crianças sobre a preservação dos oceanos.", likes_count: 8, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-11", title: "🐋 Animais incríveis", content: "Fatos sobre baleias, golfinhos e outras espécies marinhas.", likes_count: 10, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Peixes" },
  { id: "fixed-12", title: "🌊 Ondas e marés", content: "Como fenômenos naturais afetam os recifes de corais.", likes_count: 3, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Corais" },
  { id: "fixed-13", title: "🚤 Atividades aquáticas", content: "Dicas para praticar esportes sem danificar a natureza.", likes_count: 4, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-14", title: "🛑 Pesca predatória", content: "Os efeitos da pesca ilegal sobre os recifes de corais.", likes_count: 6, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Peixes" },
  { id: "fixed-15", title: "🏖️ Limpeza de praias", content: "Como eventos comunitários ajudam a manter o oceano limpo.", likes_count: 9, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-16", title: "🎨 Arte e conscientização", content: "Projetos artísticos que inspiram a preservação marinha.", likes_count: 5, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-17", title: "🧪 Pesquisa científica", content: "Novas tecnologias para monitorar a saúde dos corais.", likes_count: 7, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Corais" },
  { id: "fixed-18", title: "🌐 Comunidades globais", content: "Iniciativas internacionais de preservação marinha.", likes_count: 4, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-19", title: "📷 Fotografia subaquática", content: "Dicas para capturar a beleza do oceano sem prejudicá-lo.", likes_count: 3, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
  { id: "fixed-20", title: "💡 Dicas sustentáveis", content: "Pequenas atitudes do dia a dia que ajudam os recifes de corais.", likes_count: 6, comments_count: 0, created_at: new Date().toISOString(), user_id: "system", author_name: "Admin", category: "Sustentabilidade" },
];

const Comunidade = () => {
  const { user } = useAuth();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicContent, setNewTopicContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [likes, setLikes] = useState<{ [key: string]: Like[] }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"recent" | "popular">("recent");

  
  useEffect(() => {
    const initialLikes: { [key: string]: Like[] } = {};
    const initialComments: { [key: string]: Comment[] } = {};
    fixedTopics.forEach(topic => {
      initialLikes[topic.id] = Array(topic.likes_count).fill({ user_id: "system" });
      initialComments[topic.id] = [];
    });
    setLikes(initialLikes);
    setComments(initialComments);
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("community_topics")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Erro ao carregar tópicos");
      console.error(error);
    } else if (data) {
      const topicsWithAuthors = await Promise.all(
        data.map(async (topic: any) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", topic.user_id)
            .single();
          return { ...topic, author_name: profile?.display_name || "Usuário" };
        })
      );
      setTopics(topicsWithAuthors);
      topicsWithAuthors.forEach(topic => fetchLikes(topic.id));
    }
    setIsLoading(false);
  };

  const fetchComments = async (topicId: string) => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("target_type", "topic")
      .eq("target_id", topicId)
      .order("created_at", { ascending: true });

    if (!error && data) {
      const commentsWithAuthors = await Promise.all(
        data.map(async (comment: any) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", comment.user_id)
            .single();
          return { ...comment, author_name: profile?.display_name || "Usuário" };
        })
      );
      setComments(prev => ({ ...prev, [topicId]: commentsWithAuthors }));
    }
  };

  const fetchLikes = async (topicId: string) => {
    const { data, error } = await supabase
      .from("likes")
      .select("user_id")
      .eq("target_type", "topic")
      .eq("target_id", topicId);
    if (!error) setLikes(prev => ({ ...prev, [topicId]: data || [] }));
  };

  const handleLike = async (topicId: string) => {
    if (!user) return toast.error("Faça login para curtir");
    const userLikes = likes[topicId] || [];
    const hasLiked = userLikes.some(like => like.user_id === user.id);

    if (topicId.startsWith("fixed-")) {
      setLikes(prev => ({
        ...prev,
        [topicId]: hasLiked
          ? prev[topicId].filter(like => like.user_id !== user.id)
          : [...prev[topicId], { user_id: user.id }]
      }));
    } else {
      if (hasLiked) {
        await supabase.from("likes").delete()
          .eq("user_id", user.id)
          .eq("target_type", "topic")
          .eq("target_id", topicId);
      } else {
        await supabase.from("likes").insert({ user_id: user.id, target_type: "topic", target_id: topicId });
      }
      fetchLikes(topicId); 
      fetchTopics();
    }
  };

  const handleComment = async (topicId: string) => {
    if (!user) return toast.error("Faça login para comentar");
    const comment = newComment[topicId];
    if (!comment?.trim()) return toast.error("Escreva um comentário");

    const newC: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      content: comment.trim(),
      created_at: new Date().toISOString(),
      user_id: user.id,
      author_name: user.email || "Você",
    };

    if (topicId.startsWith("fixed-")) {
      setComments(prev => ({
        ...prev,
        [topicId]: [...(prev[topicId] || []), newC]
      }));
    } else {
      await supabase.from("comments").insert({ user_id: user.id, target_type: "topic", target_id: topicId, content: comment.trim() });
      fetchComments(topicId);
    }

    setNewComment(prev => ({ ...prev, [topicId]: "" }));
    toast.success("Comentário adicionado!");
  };

  const toggleComments = (topicId: string) => {
    const isVisible = showComments[topicId];
    setShowComments(prev => ({ ...prev, [topicId]: !isVisible }));
    if (!isVisible && !comments[topicId]) fetchComments(topicId);
  };

  const handleSubmitTopic = async () => {
    if (!user) return toast.error("Faça login para publicar um tópico");
    if (!newTopicTitle.trim() || !newTopicContent.trim()) return toast.error("Preencha título e conteúdo");
    setIsSubmitting(true);
    await supabase.from("community_topics").insert({ user_id: user.id, title: newTopicTitle.trim(), content: newTopicContent.trim() });
    setNewTopicTitle(""); setNewTopicContent(""); fetchTopics(); toast.success("Tópico publicado!"); setIsSubmitting(false);
  };

  const handleDeleteTopic = async (topicId: string) => {
    if (!user) return;
    await supabase.from("community_topics").delete().eq("id", topicId).eq("user_id", user.id);
    setTopics(prev => prev.filter(t => t.id !== topicId)); toast.success("Tópico excluído!");
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">💬 Comunidade</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Compartilhe tópicos, discuta ideias e interaja com outros membros da comunidade!
          </p>
        </div>

        {/* Criar Tópico */}
        {user && (
          <Card className="mb-12 shadow-ocean animate-float">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Plus className="w-6 h-6" />
                <span>Criar um Tópico</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Título do tópico..." value={newTopicTitle} onChange={e => setNewTopicTitle(e.target.value)} />
              <Textarea placeholder="Conteúdo do tópico..." value={newTopicContent} onChange={e => setNewTopicContent(e.target.value)} className="min-h-24" />
              <div className="flex justify-end">
                <Button onClick={handleSubmitTopic} disabled={isSubmitting} className="bg-coral-gradient text-white">
                  {isSubmitting ? "Publicando..." : "Publicar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}




          {/* Feed */}
          <div className="lg:col-span-3 space-y-6">
            {isLoading && <p>Carregando tópicos...</p>}
           {(
  sortBy === "recent"
    ? [...fixedTopics, ...topics].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : [...fixedTopics, ...topics].sort(
        (a, b) => (likes[b.id]?.length || 0) - (likes[a.id]?.length || 0) // popular: maior like primeiro
      )
).map(topic => (
  <Card key={topic.id} className="shadow-ocean animate-float">
    <CardHeader className="flex justify-between items-center">
      <CardTitle>{topic.title}</CardTitle>
      {user && topic.user_id === user.id && !topic.id.startsWith("fixed-") && (
        <Button variant="ghost" size="icon" onClick={() => handleDeleteTopic(topic.id)}>
          <X className="w-4 h-4" />
        </Button>
      )}
    </CardHeader>
    <CardContent className="space-y-4">
      <p>{topic.content}</p>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Criado por: {topic.author_name}</span>
        <span>{new Date(topic.created_at).toLocaleString()}</span>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => handleLike(topic.id)}>
          <Heart className="w-4 h-4 mr-1" /> {likes[topic.id]?.length || 0}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => toggleComments(topic.id)}>
          <MessageCircle className="w-4 h-4 mr-1" /> {comments[topic.id]?.length || topic.comments_count || 0}
        </Button>
      </div>
      {showComments[topic.id] && (
        <div className="mt-4 space-y-2">
          {(comments[topic.id] || []).map(c => (
            <div key={c.id} className="flex items-start space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarFallback>{c.author_name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{c.author_name}</p>
                <p className="text-sm text-muted-foreground">{c.content}</p>
              </div>
            </div>
          ))}
          {user && (
            <div className="flex space-x-2 mt-2">
              <Input
                placeholder="Escreva um comentário..."
                value={newComment[topic.id] || ""}
                onChange={e => setNewComment(prev => ({ ...prev, [topic.id]: e.target.value }))}
              />
              <Button onClick={() => handleComment(topic.id)}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    </CardContent>
  </Card>
))}

          </div>
        </div>
      </div>
  );
};

export default Comunidade;
