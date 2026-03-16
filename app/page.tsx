import Link from "next/link";
import { getAllPosts } from "@/lib/markdown";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight mb-3">MD Reader</h1>
        <p className="text-stone-500 dark:text-stone-400 text-lg leading-relaxed">
          Markdown dosyalarınızı güzel bir tasarımla okuyun.
          <br />
          <span className="text-sm">
            Hiçbir veri toplanmaz — her şey tarayıcınızda kalır.
          </span>
        </p>
      </section>

      <section>
        <h2 className="text-sm font-medium text-stone-400 dark:text-stone-500 uppercase tracking-wider mb-4">
          Yazılar
        </h2>
        <div className="space-y-1">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="block group rounded-lg p-4 -mx-4 transition-colors hover:bg-stone-100 dark:hover:bg-stone-900"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="font-medium text-lg group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
                    {post.title}
                  </h3>
                  {post.description && (
                    <p className="text-stone-500 dark:text-stone-400 text-sm mt-1 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                </div>
                {post.date && (
                  <time className="text-xs text-stone-400 dark:text-stone-500 whitespace-nowrap pt-1.5">
                    {new Date(post.date).toLocaleDateString("tr-TR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
