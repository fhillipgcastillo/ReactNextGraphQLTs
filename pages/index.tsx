import Head from 'next/head';
import Layout, { siteTitle } from '../components/Layout';
import utilStyles from '../styles/utils.module.css';
import { getPostsPaginated } from '../lib/posts';
import { ReactNode } from 'react';
import { GetStaticProps, GetStaticPropsResult } from 'next';
import { PostPreviewItem } from '../components/PostPreviewItem';
import { PostsPaginated } from '../lib/graphqlQuery';
import LinkedButton from '../components/LinkedButton/LinkedButton';


interface Props {
  postsData: PostsPaginated;
}



export default function Home({ postsData }: Props): ReactNode {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <ul className={utilStyles.list}>
          {postsData.data.map((post) =>
            <li className={utilStyles.listItem} key={post.id} >
              <PostPreviewItem post={post} key={post.id} />
            </li>
          )}
        </ul>
        <div className='pagination' style={{ display: "flex", justifyContent: "space-evenly" }}>
          <LinkedButton href="" alt="First page"></LinkedButton>
          <LinkedButton href="" alt="Previous page"></LinkedButton>
          <label >Page 1 of {postsData?.meta.totalCount / 10}</label>
          <LinkedButton href={`/posts/page/${postsData?.links.next?.page || ''}`} alt="Nest page">{postsData?.links.next?.page && "Next →"}</LinkedButton>
          <LinkedButton href={`/posts/page/${postsData?.links.last?.page || ''}`} alt="Last page">{postsData?.links.last?.page && "Last"}</LinkedButton>
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ preview, params }): Promise<GetStaticPropsResult<Props>> => {

  const data: { posts: PostsPaginated } = await getPostsPaginated();
  return {
    props: {
      postsData: data.posts,
    }
  }
}

/**
 * This is an example if we want to use serside rendering
 * export const getServerSideProps: GetServerSideProps = async (context){
    return {
      props: {
        // props for your component
      },
    };
  }
 */