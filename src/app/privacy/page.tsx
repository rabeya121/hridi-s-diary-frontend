export default function PrivacyPage() {
  return (
    <main className="flex-1 bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="font-script text-2xl text-gold">Legal</span>
          <h1 className="font-display text-3xl italic text-ivory md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 font-body text-xs text-ivory/50">
            Last updated: July 2026
          </p>
        </div>

        <div className="flex flex-col gap-8 font-body text-sm leading-relaxed text-ivory/70">
          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              1. Information We Collect
            </h2>
            <p>
              When you create an account, place an order, or contact us, we collect
              information such as your name, email address, phone number, delivery
              address, and payment details necessary to process your order.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              2. How We Use Your Information
            </h2>
            <p>
              We use your information to process orders, communicate order updates,
              respond to customer support inquiries, and improve our products and
              services. We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              3. Payment Security
            </h2>
            <p>
              Card payments are processed securely through Stripe. We do not store
              your card details on our servers. Cash on Delivery orders are handled
              directly by our delivery partners.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              4. Cookies & Local Storage
            </h2>
            <p>
              We use browser local storage to keep your shopping cart items and
              login session active across visits. This data stays on your device
              and is not shared with third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              5. Third-Party Services
            </h2>
            <p>
              We use trusted third-party services including Google (for sign-in),
              Stripe (for payments), and ImgBB (for image hosting) to operate our
              platform. Each of these providers maintains their own privacy and
              security practices.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              6. Your Rights
            </h2>
            <p>
              You may request access to, correction of, or deletion of your
              personal data at any time by contacting our support team through the
              Contact page.
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-display text-xl italic text-ivory">
              7. Contact Us
            </h2>
            <p>
              For any questions about this Privacy Policy, please reach out to us
              at hello@hridisdiary.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}