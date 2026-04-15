interface PageBannerProps {
  title: string;
  subtitle?: string;
  bgColor?: string;
}

const PageBanner = ({ title, subtitle, bgColor = "bg-secondary" }: PageBannerProps) => {
  return (
    <section className={`${bgColor} py-12 md:py-20`}>
      <div className="container text-center">
        <h1 className="font-heading font-bold text-3xl md:text-4xl lg:text-5xl text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        <div className="mt-5 flex items-center justify-center gap-2">
          <span className="w-8 h-1 rounded-full bg-pink" />
          <span className="w-3 h-3 rounded-full bg-lilac" />
          <span className="w-8 h-1 rounded-full bg-baby-blue" />
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
