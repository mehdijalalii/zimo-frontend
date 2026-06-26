import { getMessages } from '@/i18n/request';
import type { Locale } from '@/i18n/config';

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  const messages = getMessages(typedLocale);

  return (
    <section className="section-block pt-32">
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mb-16 text-center md:mb-20">
          <p className="section-kicker mx-auto mb-4">
            {messages.demo_page.kicker}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#841474]">
            {messages.demo_page.title}
          </h1>
          <p className="section-lead section-lead--center mx-auto mt-3 max-w-2xl">
            {messages.demo_page.description}
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Left: Steps */}
          <div>
            <h2 className="section-heading">{messages.demo_form.heading}</h2>
            <p className="section-copy">{messages.demo_form.lead}</p>

            <ul className="mt-8 space-y-6">
              {messages.demo_form.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#841474]/10 text-xl text-[#841474]">
                    {step.number}
                  </span>
                  <div>
                    <strong className="block text-base text-gray-900">
                      {step.title}
                    </strong>
                    <p className="mt-1 text-sm leading-relaxed text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Form */}
          <form className="zimo-form-card rounded-3xl border border-gray-100 bg-white p-6 shadow-lg md:p-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="demo-name" className="mb-1.5 block text-sm font-bold text-gray-700">
                  {messages.demo_form.form.manager_name_label}
                </label>
                <input
                  id="demo-name"
                  name="contact_name"
                  type="text"
                  placeholder={messages.demo_form.form.manager_name_placeholder}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10"
                />
              </div>

              <div>
                <label htmlFor="demo-phone" className="mb-1.5 block text-sm font-bold text-gray-700">
                  {messages.demo_form.form.phone_label}
                </label>
                <input
                  id="demo-phone"
                  name="contact_phone"
                  type="tel"
                  placeholder={messages.demo_form.form.phone_placeholder}
                  required
                  dir="ltr"
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-left text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10"
                />
              </div>

              <div>
                <label htmlFor="demo-salon" className="mb-1.5 block text-sm font-bold text-gray-700">
                  {messages.demo_form.form.salon_label}
                </label>
                <input
                  id="demo-salon"
                  name="brand_name"
                  type="text"
                  placeholder={messages.demo_form.form.salon_placeholder}
                  required
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10"
                />
              </div>

              <div>
                <label htmlFor="demo-branches" className="mb-1.5 block text-sm font-bold text-gray-700">
                  {messages.demo_form.form.branches_label}
                </label>
                <div className="relative">
                  <select
                    id="demo-branches"
                    name="branches"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10"
                  >
                    <option value="1">{messages.demo_form.form.branches_options['1']}</option>
                    <option value="2-3">{messages.demo_form.form.branches_options['2-3']}</option>
                    <option value="3+">{messages.demo_form.form.branches_options['3+']}</option>
                  </select>
                  <svg className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="demo-plan" className="mb-1.5 block text-sm font-bold text-gray-700">
                  {messages.demo_form.form.plan_label}
                </label>
                <div className="relative">
                  <select
                    id="demo-plan"
                    name="plan_interest"
                    className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10"
                  >
                    <option value="unsure">{messages.demo_form.form.plan_options.unsure}</option>
                    <option value="starter">{messages.demo_form.form.plan_options.starter}</option>
                    <option value="professional">{messages.demo_form.form.plan_options.professional}</option>
                    <option value="enterprise_custom">{messages.demo_form.form.plan_options.enterprise_custom}</option>
                  </select>
                  <svg className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div>
                <label htmlFor="demo-message" className="mb-1.5 block text-sm font-bold text-gray-700">
                  {messages.demo_form.form.message_label}
                </label>
                <textarea
                  id="demo-message"
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#841474] focus:ring-2 focus:ring-[#841474]/10"
                  placeholder={messages.demo_form.form.message_placeholder}
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-[#841474] py-3.5 text-sm font-bold text-white transition hover:bg-[#6b105d]"
              >
                {messages.demo_form.form.submit}
              </button>

              <p className="text-center text-xs text-gray-500">
                {messages.demo_form.form.disclaimer}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
