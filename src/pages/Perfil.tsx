import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { User, Edit, Heart, MessageCircle, Lightbulb, Users } from "lucide-react";

interface Profile {
  id: string;
  display_name: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
}

interface UserCuriosity {
  id: string;
  text: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

interface UserTopic {
  id: string;
  title: string;
  content: string;
  likes_count: number;
  comments_count: number;
  created_at: string;
}

const Perfil = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [userCuriosities, setUserCuriosities] = useState<UserCuriosity[]>([]);
  const [userTopics, setUserTopics] = useState<UserTopic[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchUserContent();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (error) {
      toast.error("Erro ao carregar perfil");
      console.error(error);
    } else if (data) {
      setProfile(data);
      setDisplayName(data.display_name);
      setBio(data.bio || "");
    }
    setIsLoading(false);
  };

  const fetchUserContent = async () => {
    if (!user) return;

    // Fetch user curiosities
    const { data: curiosities, error: curiositiesError } = await supabase
      .from('curiosities')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (curiositiesError) {
      console.error("Erro ao carregar curiosidades:", curiositiesError);
    } else {
      setUserCuriosities(curiosities || []);
    }

    // Fetch user topics
    const { data: topics, error: topicsError } = await supabase
      .from('community_topics')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (topicsError) {
      console.error("Erro ao carregar tópicos:", topicsError);
    } else {
      setUserTopics(topics || []);
    }
  };

  const updateProfile = async () => {
    if (!user || !profile) return;

    setIsLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: displayName,
        bio: bio
      })
      .eq('user_id', user.id);

    if (error) {
      toast.error("Erro ao atualizar perfil");
      console.error(error);
    } else {
      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
      fetchProfile();
    }
    setIsLoading(false);
  };

  const getTotalLikes = () => {
    const curiosityLikes = userCuriosities.reduce((sum, c) => sum + c.likes_count, 0);
    const topicLikes = userTopics.reduce((sum, t) => sum + t.likes_count, 0);
    return curiosityLikes + topicLikes;
  };

  const getTotalComments = () => {
    const curiosityComments = userCuriosities.reduce((sum, c) => sum + c.comments_count, 0);
    const topicComments = userTopics.reduce((sum, t) => sum + t.comments_count, 0);
    return curiosityComments + topicComments;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando perfil...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <Card className="text-center p-8">
          <CardContent>
            <User className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Perfil não encontrado</h2>
            <p className="text-muted-foreground">Faça login para ver seu perfil.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <Card className="shadow-ocean animate-float">
          <CardHeader className="bg-coral-gradient text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl flex items-center gap-3">
                <Avatar className="w-16 h-16 border-4 border-white">
                  <AvatarImage src={profile.avatar_url || undefined} />
                  <AvatarFallback className="bg-white text-primary text-xl font-bold">
                    {profile.display_name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{profile.display_name}</h1>
                  <p className="text-blue-100 text-sm">
                    Membro desde {new Date(profile.created_at).toLocaleDateString('pt-BR')}
                  </p>
                </div>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white/10 border-white text-white hover:bg-white/20"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancelar' : 'Editar'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Nome de usuário</label>
                  <Input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Conte um pouco sobre você..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={updateProfile} className="bg-coral-gradient">
                    Salvar alterações
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {profile.bio && (
                  <div>
                    <h3 className="font-semibold mb-2">Sobre mim</h3>
                    <p className="text-muted-foreground">{profile.bio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{getTotalLikes()}</p>
                    <p className="text-sm text-muted-foreground">Curtidas recebidas</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <MessageCircle className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{getTotalComments()}</p>
                    <p className="text-sm text-muted-foreground">Comentários recebidos</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Lightbulb className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-foreground">{userCuriosities.length + userTopics.length}</p>
                    <p className="text-sm text-muted-foreground">Publicações</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* User Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Curiosities */}
          <Card className="shadow-gentle animate-float">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Lightbulb className="w-5 h-5" />
                Minhas Curiosidades ({userCuriosities.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userCuriosities.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Você ainda não publicou nenhuma curiosidade.
                </p>
              ) : (
                userCuriosities.slice(0, 3).map((curiosity) => (
                  <div key={curiosity.id} className="border rounded-lg p-4 space-y-2">
                    <p className="text-sm">{curiosity.text}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {curiosity.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {curiosity.comments_count}
                      </span>
                      <span>
                        {new Date(curiosity.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Community Topics */}
          <Card className="shadow-gentle animate-float">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-primary">
                <Users className="w-5 h-5" />
                Meus Tópicos ({userTopics.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userTopics.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Você ainda não criou nenhum tópico.
                </p>
              ) : (
                userTopics.slice(0, 3).map((topic) => (
                  <div key={topic.id} className="border rounded-lg p-4 space-y-2">
                    <h4 className="font-semibold text-sm">{topic.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">{topic.content}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {topic.likes_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {topic.comments_count}
                      </span>
                      <span>
                        {new Date(topic.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Perfil;