export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="font-script text-3xl text-gold">Hridi&apos;s Diary</span>
      <h1 className="font-display text-5xl italic text-ivory">
        A gift, beautifully told.
      </h1>
      <p className="max-w-md font-body text-blush">
        Skincare, haircare & occasion gift combos — Valentine&apos;s, Eid, Christmas, Puja.
      </p>
      <button className="rounded-full bg-blush px-6 py-3 font-body font-semibold text-velvet transition hover:bg-blush-deep">
        Shop Now
      </button>
    </main>
  );
}