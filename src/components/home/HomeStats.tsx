interface HomeStatsProps {
  translations: {
    stats: {
      no_conflicts: string;
      return_rate: string;
      transparency: string;
      uptime: string;
    };
  };
}

export default function HomeStats({ translations }: HomeStatsProps) {
  const { stats } = translations;

  return (
    <section className="section-block">
      <div className="mx-auto max-w-6xl">
        <div className="cta-panel grid grid-cols-2 gap-y-10 rounded-3xl bg-[#841474] px-8 py-12 md:grid-cols-4 md:px-12 md:gap-y-0 md:divide-x md:divide-white/20">
          <div className="text-center">
            <div className="mb-2 text-2xl font-bold text-white md:text-3xl">۰٪</div>
            <div className="text-sm text-white/80">{stats.no_conflicts}</div>
          </div>

          <div className="text-center">
            <div className="mb-2 text-2xl font-bold text-white md:text-3xl">۴۰٪</div>
            <div className="text-sm text-white/80">{stats.return_rate}</div>
          </div>

          <div className="text-center">
            <div className="mb-2 text-2xl font-bold text-white md:text-3xl">100٪</div>
            <div className="text-sm text-white/80">{stats.transparency}</div>
          </div>

          <div className="text-center">
            <div className="mb-2 text-2xl font-bold text-white md:text-3xl">۲۴/۷</div>
            <div className="text-sm text-white/80">{stats.uptime}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
