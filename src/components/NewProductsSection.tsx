type Props = {
  products: {
    playProtect: {
      name: string;
      description: string;
      href: string;
    };
    mikrotikConnect: {
      name: string;
      description: string;
      href: string;
    };
  };
};

export function NewProductsSection({ products }: Props) {
  return (
    <section className="relative overflow-hidden py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {/* HimoSoft Play Protect */}
          <a
            href={products.playProtect.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-brand/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-brand/50 hover:shadow-[0_0_60px_-10px_rgba(102,126,234,0.5)]"
          >
            {/* Gradient background - properly layered */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/40 via-brand/20 to-purple-900/30 transition-all duration-500 group-hover:from-brand/50 group-hover:via-brand/30" />
            
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 z-0 h-28 w-28 rounded-full bg-brand/30 blur-2xl" />
            <div className="absolute -bottom-3 -left-3 z-0 h-20 w-20 rounded-full bg-purple-600/30 blur-xl" />
            
            <div className="relative z-10 flex items-start gap-5">
              {/* Icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-purple-600 shadow-xl shadow-brand/40">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand">Video Hosting</p>
                <h3 className="text-xl font-bold text-white group-hover:text-brand transition-colors">
                  {products.playProtect.name}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {products.playProtect.description}
                </p>
                
                {/* Stats row */}
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Support Mindset</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Client‑centric</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow indicator */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/30 text-brand backdrop-blur-sm">
                →
              </span>
            </div>
          </a>

          {/* Mikrotik Connect */}
          <a
            href={products.mikrotikConnect.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden rounded-2xl border border-emerald-500/30 p-6 backdrop-blur-xl transition-all duration-500 hover:border-emerald-500/50 hover:shadow-[0_0_60px_-10px_rgba(16,185,129,0.5)]"
          >
            {/* Gradient background - properly layered */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-emerald-500/40 via-emerald-500/20 to-teal-900/30 transition-all duration-500 group-hover:from-emerald-500/50 group-hover:via-emerald-500/30" />
            
            {/* Decorative circles */}
            <div className="absolute -right-6 -top-6 z-0 h-28 w-28 rounded-full bg-emerald-500/30 blur-2xl" />
            <div className="absolute -bottom-3 -left-3 z-0 h-20 w-20 rounded-full bg-teal-600/30 blur-xl" />
            
            <div className="relative z-10 flex items-start gap-5">
              {/* Icon */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/40">
                <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                </svg>
              </div>
              
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">Network Tools</p>
                <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {products.mikrotikConnect.name}
                </h3>
                <p className="mt-2 text-sm text-white/70 leading-relaxed">
                  {products.mikrotikConnect.description}
                </p>
                
                {/* Stats row */}
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">24/7</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Support mindset</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">100%</div>
                    <div className="mt-1 text-[10px] uppercase tracking-wider text-white/50">Client‑centric</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Arrow indicator */}
            <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/30 text-emerald-400 backdrop-blur-sm">
                →
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}