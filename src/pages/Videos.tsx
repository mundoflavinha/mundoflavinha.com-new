import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowRight, Calendar, Play } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import Layout from "@/components/Layout";
import PageBanner from "@/components/PageBanner";
import { ChannelVideo, getChannelVideos } from "@/lib/youtube";

const formatPublishedAt = (value: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));

const VideosSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: 9 }).map((_, index) => (
      <div key={index} className="bg-card rounded-2xl overflow-hidden shadow-sm">
        <Skeleton className="aspect-square rounded-none" />
        <div className="p-4 space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-9 w-28 rounded-full" />
        </div>
      </div>
    ))}
  </div>
);

const Videos = () => {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [selectedVideo, setSelectedVideo] = useState<ChannelVideo | null>(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["youtube-channel-videos"],
    queryFn: getChannelVideos,
    staleTime: 1000 * 60 * 30,
  });

  const filteredVideos = useMemo(() => {
    if (!data?.videos) {
      return [];
    }

    if (activeCategory === "Todos") {
      return data.videos;
    }

    return data.videos.filter((video) => video.categories.includes(activeCategory));
  }, [activeCategory, data?.videos]);

  return (
    <Layout>
      <PageBanner
        title="Vídeos do Canal"
        subtitle="Toda segunda e quinta tem vídeo novo no canal Mundo Flavinha"
        bgColor="bg-pink/15"
      />

      <section className="py-12 md:py-16">
        <div className="container">
          {isLoading && <VideosSkeleton />}

          {error && (
            <div className="max-w-2xl mx-auto rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
              <AlertCircle className="w-10 h-10 text-primary mx-auto mb-3" />
              <h2 className="font-heading font-bold text-xl text-foreground">
                Não foi possível carregar os vídeos
              </h2>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {(error as Error).message}
              </p>
            </div>
          )}

          {!isLoading && !error && data?.videos && (
            <>
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {data.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-heading font-semibold transition-colors ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-foreground/70 hover:bg-secondary/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVideos.map((video) => (
                    <motion.article
                      key={video.id}
                      whileHover={{ y: -4 }}
                      className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <button
                        type="button"
                        onClick={() => setSelectedVideo(video)}
                        className="block w-full text-left"
                        aria-label={`Assistir ${video.title}`}
                      >
                        <div className="relative aspect-video overflow-hidden bg-foreground/5">
                          {video.thumbnailUrl && (
                            <img
                              src={video.thumbnailUrl}
                              alt={video.title}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          )}
                          <div className="absolute inset-0 bg-foreground/10 flex items-center justify-center">
                            <div className="w-14 h-14 rounded-full bg-primary-foreground/90 flex items-center justify-center shadow-sm">
                              <Play className="w-7 h-7 text-primary ml-0.5" />
                            </div>
                          </div>
                        </div>
                      </button>
                      <div className="p-4">
                        <button type="button" onClick={() => setSelectedVideo(video)} className="block w-full text-left">
                          <div className="flex flex-wrap gap-1.5">
                            {(video.categories.length ? video.categories : ["Mundo Flavinha"]).slice(0, 2).map((category) => (
                              <span key={category} className="text-xs font-heading font-semibold text-primary">
                                {category}
                              </span>
                            ))}
                          </div>
                          <h3 className="font-heading font-bold text-sm text-foreground mt-1 leading-snug">
                            {video.title}
                          </h3>
                          <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatPublishedAt(video.publishedAt)}
                          </p>
                        </button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedVideo(video)}
                          className="mt-3 rounded-full font-heading text-xs border-primary/30 text-foreground gap-1"
                        >
                          Assistir aqui <ArrowRight className="w-3 h-3" />
                        </Button>
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
                  <h2 className="font-heading font-bold text-xl text-foreground">Nenhum vídeo nessa playlist</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Escolha outra categoria para ver os vídeos disponíveis.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Dialog open={Boolean(selectedVideo)} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-5xl border-0 bg-background p-0 overflow-hidden">
          {selectedVideo && (
            <>
              <div className="aspect-video w-full bg-black">
                <iframe
                  key={selectedVideo.id}
                  src={`${selectedVideo.embedUrl}?autoplay=1&rel=0`}
                  title={selectedVideo.title}
                  className="h-full w-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <DialogHeader className="p-5">
                <DialogTitle className="font-heading text-xl font-bold leading-tight text-foreground">
                  {selectedVideo.title}
                </DialogTitle>
                <DialogDescription className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatPublishedAt(selectedVideo.publishedAt)}
                </DialogDescription>
              </DialogHeader>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Videos;
