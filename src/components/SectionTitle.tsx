interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionTitle = ({ title, subtitle, className = "" }: SectionTitleProps) => {
  return (
    <div className={`text-center mb-8 md:mb-12 ${className}`}>
      <h2 className="font-heading font-bold text-2xl md:text-3xl lg:text-4xl text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-4 flex items-center justify-center gap-2">
        <span className="w-8 h-1 rounded-full bg-pink" />
        <span className="w-3 h-3 rounded-full bg-lilac" />
        <span className="w-8 h-1 rounded-full bg-baby-blue" />
      </div>
    </div>
  );
};

export default SectionTitle;
