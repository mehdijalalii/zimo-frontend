interface HomeTrustProps {
  translations: {
    trust: {
      heading: string;
      lead: string;
      items: { title: string; description: string }[];
    };
  };
}

export default function HomeTrust({ translations }: HomeTrustProps) {
  const { trust } = translations;

  return (
    <section className="section-block">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <h2 className="section-heading section-heading--center">
            {trust.heading}
          </h2>
          <p className="section-copy mx-auto max-w-2xl">{trust.lead}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="group relative rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">{trust.items[0]?.title}</h3>
            <p className="leading-relaxed text-gray-600">
              {trust.items[0]?.description}
            </p>
          </div>
          <div className="group relative rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5a2 2 0 10-2 2h2zm0 0h4m-4 0H8m12 3v6a2 2 0 01-2 2H6a2 2 0 01-2-2v-6m16 0H4"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">{trust.items[1]?.title}</h3>
            <p className="leading-relaxed text-gray-600">
              {trust.items[1]?.description}
            </p>
          </div>
          <div className="group relative rounded-3xl border border-gray-100 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#841474]/10 text-[#841474]">
              <svg
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 11h.01M12 7h.01M15 11h.01M12 14h.01M4.05 11a8 8 0 1115.9 0c-.015.033-.03.066-.047.1L19.5 13l-1.5 2.5-2-1.5-1.5 3-2.5-1-1 2.5H9l-1-2.5-2.5 1-1-3-1.5 1.5-2-2.5 1.5-1.9c-.017-.034-.032-.067-.047-.1z"
                />
              </svg>
            </div>
            <h3 className="mb-3 text-xl font-bold">{trust.items[2]?.title}</h3>
            <p className="leading-relaxed text-gray-600">
              {trust.items[2]?.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
