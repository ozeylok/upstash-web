import getData from "../../get-data";
import PageHeaderTitle from "@/components/page-header-title";
import Link from "next/link";
import Bg from "@/components/bg";
import { uniq } from "lodash";
import { Post } from "contentlayer/generated";
import PostGridCard from "@/components/blog/grid-item";
import Container from "@/components/container";

type Props = {
  params: {
    author: string;
  };
};

export async function generateStaticParams(): Promise<Props["params"][]> {
  const posts = await getData();
  const authors = uniq(posts.map((post) => post.author));
  return authors.map((author) => ({ author }));
}

export async function generateMetadata({
  params,
}: {
  params: Props["params"];
}) {
  return {
    title: `${params.author}'s Posts`,
  };
}

export default async function BlogPage({ params: { author } }: Props) {
  const posts = await getData();
  const postsByAuthor = posts.filter((post) => post.author === author);

  return (
    <main className="relative z-0">
      <Bg />

      <header className="py-12 text-center md:py-24">
        <PageHeaderTitle>
          <span className="font-medium opacity-40">blog/author/</span>
          <span className="font-bold">{author}</span>
        </PageHeaderTitle>
        <div className="mt-4">
          <Link className="text-emerald-400 hover:underline" href="/blog">
            Back to all posts
          </Link>
        </div>
      </header>

      <section>
        <Container>
          <div className="grid gap-4 md:grid-cols-2 md:gap-8">
            {postsByAuthor.map((post: Post) => {
              return <PostGridCard key={post.slug} data={post} />;
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}