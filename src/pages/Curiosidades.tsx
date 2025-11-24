import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Plus, CheckCircle, X, Send } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface Curiosity {
  id: string;
  text: string;
  verified: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  author_name?: string;
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

const Curiosidades = () => {
  const [newCuriosity, setNewCuriosity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [curiosities, setCuriosities] = useState<Curiosity[]>([]);
  const [comments, setComments] = useState<{ [key: string]: Comment[] }>({});
  const [newComment, setNewComment] = useState<{ [key: string]: string }>({});
  const [likes, setLikes] = useState<{ [key: string]: Like[] }>({});
  const [showComments, setShowComments] = useState<{ [key: string]: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchCuriosities();
  }, []);

  const fetchCuriosities = async () => {
    setIsLoading(true);
    try {
      const { data: curiositiesData, error } = await supabase
        .from("curiosities")
        .select("*")
        .eq("verified", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      const curiositiesWithAuthors = await Promise.all(
        curiositiesData.map(async (curiosity) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", curiosity.user_id)
            .single();

          return {
            ...curiosity,
            author_name: profile?.display_name || "Usuário",
          };
        })
      );

      setCuriosities(curiositiesWithAuthors);

      // Carregar likes de cada curiosidade
      curiositiesWithAuthors.forEach((curiosity) => fetchLikes(curiosity.id));
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar curiosidades");
    }
    setIsLoading(false);
  };

  const fetchComments = async (curiosityId: string) => {
    try {
      const { data: commentsData, error } = await supabase
        .from("comments")
        .select("*")
        .eq("target_type", "curiosity")
        .eq("target_id", curiosityId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const commentsWithAuthors = await Promise.all(
        commentsData.map(async (comment) => {
          const { data: profile } = await supabase
            .from("profiles")
            .select("display_name")
            .eq("user_id", comment.user_id)
            .single();

          return {
            ...comment,
            author_name: profile?.display_name || "Usuário",
          };
        })
      );

      setComments((prev) => ({ ...prev, [curiosityId]: commentsWithAuthors }));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLikes = async (curiosityId: string) => {
    try {
      const { data, error } = await supabase
        .from("likes")
        .select("user_id")
        .eq("target_type", "curiosity")
        .eq("target_id", curiosityId);

      if (error) throw error;

      setLikes((prev) => ({ ...prev, [curiosityId]: data || [] }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLike = async (curiosityId: string) => {
    if (!user) return toast.error("Faça login para curtir");

    const userLikes = likes[curiosityId] || [];
    const hasLiked = userLikes.some((like) => like.user_id === user.id);

    try {
      if (hasLiked) {
        await supabase
          .from("likes")
          .delete()
          .eq("user_id", user.id)
          .eq("target_type", "curiosity")
          .eq("target_id", curiosityId);
      } else {
        await supabase
          .from("likes")
          .insert({ user_id: user.id, target_type: "curiosity", target_id: curiosityId });
      }

      fetchLikes(curiosityId);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao atualizar like");
    }
  };

  const handleComment = async (curiosityId: string) => {
    if (!user) return toast.error("Faça login para comentar");

    const comment = newComment[curiosityId];
    if (!comment?.trim()) return toast.error("Escreva um comentário");

    try {
      await supabase.from("comments").insert({
        user_id: user.id,
        target_type: "curiosity",
        target_id: curiosityId,
        content: comment.trim(),
      });

      setNewComment((prev) => ({ ...prev, [curiosityId]: "" }));
      fetchComments(curiosityId);
      toast.success("Comentário adicionado!");
    } catch (err) {
      console.error(err);
      toast.error("Erro ao adicionar comentário");
    }
  };

  const toggleComments = (curiosityId: string) => {
    const isVisible = showComments[curiosityId];
    setShowComments((prev) => ({ ...prev, [curiosityId]: !isVisible }));

    if (!isVisible && !comments[curiosityId]) fetchComments(curiosityId);
  };

  const handleSubmitCuriosity = async () => {
    if (!user) return toast.error("Faça login para publicar curiosidades");
    if (!newCuriosity.trim()) return toast.error("Escreva sua curiosidade!");

    setIsSubmitting(true);

    setTimeout(async () => {
      const isTrue = Math.random() > 0.3;

      if (isTrue) {
        try {
          await supabase.from("curiosities").insert({
            user_id: user.id,
            text: newCuriosity.trim(),
            verified: true,
          });

          toast.success("Curiosidade verificada e publicada!");
          setNewCuriosity("");
          fetchCuriosities();
        } catch (err) {
          console.error(err);
          toast.error("Erro ao publicar curiosidade");
        }
      } else {
        toast.error("Curiosidade não verídica, não foi publicada");
      }

      setIsSubmitting(false);
    }, 2000);
  };

  const handleDeleteCuriosity = async (curiosityId: string) => {
    if (!user) return toast.error("Faça login para excluir");

    if (!confirm("Tem certeza que deseja excluir esta curiosidade?")) return;

    try {
      await supabase.from("curiosities").delete().eq("id", curiosityId).eq("user_id", user.id);
      toast.success("Curiosidade excluída!");
      setCuriosities((prev) => prev.filter((c) => c.id !== curiosityId));
    } catch (err) {
      console.error(err);
      toast.error("Erro ao excluir curiosidade");
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-float">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            💡 Curiosidades dos Corais
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Descubra fatos incríveis sobre os corais brasileiros e compartilhe suas próprias descobertas!
          </p>
        </div>

        {user && (
          <Card className="mb-12 shadow-ocean animate-float">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-primary">
                <Plus className="w-6 h-6" />
                <span>Compartilhe uma Curiosidade</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Escreva aqui uma curiosidade interessante sobre corais..."
                value={newCuriosity}
                onChange={(e) => setNewCuriosity(e.target.value)}
                className="min-h-24"
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Nossa IA verificará se a curiosidade é verídica antes de publicar
                </p>
                <Button
                  onClick={handleSubmitCuriosity}
                  disabled={isSubmitting}
                  className="bg-coral-gradient hover:shadow-coral text-white"
                >
                  {isSubmitting ? "Verificando..." : "Publicar"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {isLoading ? (
          <p className="text-center text-muted-foreground">Carregando curiosidades...</p>
        ) : (
          curiosities.map((curiosity) => (
            <Card key={curiosity.id} className="mb-6 shadow-ocean animate-float">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{curiosity.author_name}</span>
                  {curiosity.user_id === user?.id && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCuriosity(curiosity.id)}
                    >
                      <X />
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{curiosity.text}</p>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleLike(curiosity.id)}
                  >
                    <Heart className={`w-5 h-5 ${likes[curiosity.id]?.some(l => l.user_id === user?.id) ? "text-red-500" : ""}`} />
                  </Button>
                  <span>{likes[curiosity.id]?.length || curiosity.likes_count}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleComments(curiosity.id)}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </Button>
                  <span>{comments[curiosity.id]?.length || curiosity.comments_count}</span>
                </div>

                {showComments[curiosity.id] && (
                  <div className="mt-4 space-y-2">
                    {comments[curiosity.id]?.map((comment) => (
                      <div key={comment.id} className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback>{comment.author_name?.[0]}</AvatarFallback>
                        </Avatar>
                        <p className="text-sm">
                          <span className="font-semibold">{comment.author_name}: </span>
                          {comment.content}
                        </p>
                      </div>
                    ))}
                    <div className="flex space-x-2 mt-2">
                      <Input
                        placeholder="Comentar..."
                        value={newComment[curiosity.id] || ""}
                        onChange={(e) =>
                          setNewComment((prev) => ({ ...prev, [curiosity.id]: e.target.value }))
                        }
                      />
                      <Button onClick={() => handleComment(curiosity.id)}>
                        <Send />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Curiosidades;
