import { NextSeo } from 'next-seo';
import Layout from '@/layout/Layout';
import PostsCards from '@/components/PostsCards';

import { getSite, postsService } from '@/services/serversideApi';
import { Post, PostType } from '@/models/post.model';
import { Site } from '@/models/site.model';

export default function Community({
  site,
  posts,
}: {
  site: Site | null;
  posts: Post[];
}): JSX.Element {
  return (
    <Layout site={site}>
      <NextSeo
        title="Community | CodingCatDev"
        canonical={`https://codingcat.dev/community/`}
      ></NextSeo>
      <section className="grid grid-cols-1 gap-10 p-4 place-items-center">
        <a
          href="https://discord.gg/kGYAaAKZQf"
          className="flex px-4 py-2 space-x-2 transform rounded-md shadow-lg bg-basics-600 dark:bg-basics-600 hover:text-basics-50 dark:hover:text-basics-50 text-basics-50 dark:text-basics-50 hover:shadow-md hover:opacity-90"
        >
          <svg
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.80081 9.95703C9.26571 9.95703 8.84326 10.4362 8.84326 11.0208C8.84326 11.6054 9.2751 12.0845 9.80081 12.0845C10.3359 12.0845 10.7584 11.6054 10.7584 11.0208C10.7678 10.4362 10.3359 9.95703 9.80081 9.95703ZM13.2273 9.95703C12.6922 9.95703 12.2698 10.4362 12.2698 11.0208C12.2698 11.6054 12.7016 12.0845 13.2273 12.0845C13.7624 12.0845 14.1849 11.6054 14.1849 11.0208C14.1849 10.4362 13.7624 9.95703 13.2273 9.95703Z"
              fill="#7289DA"
            ></path>
            <path
              d="M17.7897 1.91675H5.21013C4.14932 1.91675 3.28564 2.79841 3.28564 3.89091V16.8476C3.28564 17.9401 4.14932 18.8217 5.21013 18.8217H15.8558L15.3583 17.0488L16.5599 18.1892L17.6958 19.2626L19.7142 21.0834V3.89091C19.7142 2.79841 18.8505 1.91675 17.7897 1.91675ZM14.1661 14.4326C14.1661 14.4326 13.8281 14.0205 13.5465 13.6563C14.7763 13.3017 15.2456 12.5159 15.2456 12.5159C14.8607 12.7747 14.4946 12.9567 14.1661 13.0813C13.6967 13.2826 13.2461 13.4167 12.8048 13.4934C11.9036 13.6659 11.0775 13.618 10.3734 13.4838C9.8383 13.3784 9.3783 13.2251 8.9934 13.0717C8.77748 12.9855 8.54279 12.8801 8.30809 12.7459C8.27993 12.7267 8.25177 12.7172 8.2236 12.698C8.20483 12.6884 8.19544 12.6788 8.18605 12.6692C8.01707 12.5734 7.9232 12.5063 7.9232 12.5063C7.9232 12.5063 8.37381 13.273 9.56605 13.6372C9.28442 14.0013 8.93707 14.4326 8.93707 14.4326C6.86238 14.3655 6.07381 12.9759 6.07381 12.9759C6.07381 9.89008 7.42564 7.38883 7.42564 7.38883C8.77748 6.35383 10.0636 6.38258 10.0636 6.38258L10.1575 6.49758C8.46769 6.99592 7.6885 7.753 7.6885 7.753C7.6885 7.753 7.89503 7.638 8.24238 7.47508C9.24687 7.02466 10.0448 6.90008 10.3734 6.87133C10.4297 6.86175 10.4767 6.85217 10.533 6.85217C11.1056 6.7755 11.7534 6.75633 12.4293 6.833C13.3212 6.93842 14.2787 7.20675 15.255 7.753C15.255 7.753 14.5134 7.03425 12.9175 6.53591L13.0489 6.38258C13.0489 6.38258 14.335 6.35383 15.6869 7.38883C15.6869 7.38883 17.0387 9.89008 17.0387 12.9759C17.0387 12.9759 16.2407 14.3655 14.1661 14.4326Z"
              fill="#7289DA"
            ></path>
          </svg>
          <span className="css-1y6ic72">Join Discord</span>
        </a>
        <section className="max-w-2xl text-3xl text-center">
          <h1 className="font-sans text-3xl ">
            CodingCat.Dev Discord Community
          </h1>
          <h2 className="font-sans text-2xl">
            A safe place for anyone to drop in, hang out, ask questions, and
            chat about topics surrounding development.
          </h2>
        </section>
        <iframe
          className="max-w-sm"
          src="https://discord.com/widget?id=543906775066345473&theme=dark"
          width="100%"
          height="500"
          frameBorder="0"
          sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        ></iframe>
      </section>
    </Layout>
  );
}

export async function getStaticProps(): Promise<{
  props: {
    site: Site | null;
    posts: Post[];
  };
  revalidate: number;
}> {
  const site = await getSite();
  const posts = await postsService(PostType.group);
  return {
    props: {
      site,
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
