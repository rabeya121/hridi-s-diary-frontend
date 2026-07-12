import Image from "next/image";
import Link from "next/link";

const posts = [
  {
    slug: "skincare-routine-for-humid-weather",
    title: "Building a Skincare Routine for Humid Weather",
    excerpt:
      "Dhaka's humidity calls for lightweight, non-comedogenic products. Here's how to adjust your routine to stay fresh without clogging pores.",
    image: "https://picsum.photos/seed/hd-blog1/700/450",
    date: "June 2, 2026",
  },
  {
    slug: "choosing-the-right-gift-combo",
    title: "How to Choose the Right Gift Combo for Every Occasion",
    excerpt:
      "From Eid to Valentine's, picking a combo that feels personal comes down to a few simple questions. Here's our gifting guide.",
    image: "https://picsum.photos/seed/hd-blog2/700/450",
    date: "May 20, 2026",
  },
  {
    slug: "haircare-basics-for-damaged-hair",
    title: "Haircare Basics for Repairing Damaged, Dry Strands",
    excerpt:
      "Heat styling and weather damage are common culprits. These haircare habits can help restore softness and strength over time.",
    image: "https://picsum.photos/seed/hd-blog3/700/450",
    date: "May 8, 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="flex-1 bg-velvet px-6 py-16 md:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <span className="font-script text-2xl text-gold">From Our Journal</span>
          <h1 className="font-display text-3xl italic text-ivory md:text-4xl">Blog</h1>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex h-[420px] flex-col overflow-hidden rounded-2xl border border-gold/20 bg-velvet-light"
            >
              <div className="relative h-48 w-full">
                <Image src={post.image} alt={post.title} fill className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="font-body text-xs text-ivory/40">{post.date}</p>
                <h2 className="mt-2 line-clamp-2 font-display text-lg italic text-ivory">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 font-body text-sm text-ivory/60">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-auto pt-4 font-body text-sm font-semibold text-gold hover:underline"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}