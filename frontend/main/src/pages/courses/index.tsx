import Layout from '@/layout/Layout';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';

import { NextSeo } from 'next-seo';
import { getPaginated, Pagination } from '@/components/Pagination';
import { ModelType } from '@/models/builder.model';
import dynamic from 'next/dynamic';
const CodingCatBuilder = dynamic(
  () =>
    import('@/components/builder/CodingCatBuilder').then((res) => res as any),
  { ssr: false }
) as any;

export async function getStaticProps({
  preview,
}: GetStaticPropsContext<{ pageNumber: string }>) {
  return getPaginated({
    preview,
    baseUrl: '/courses',
    model: ModelType.course,
  });
}

export default function Courses({
  modelData,
  model,
  header,
  footer,
  list,
  baseUrl,
  pageNumber,
  showNext,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <NextSeo
        title="Courses | CodingCatDev"
        canonical={`https://codingcat.dev/courses`}
      ></NextSeo>
      <Layout header={header} footer={footer}>
        <CodingCatBuilder
          options={{ includeRefs: true }}
          model={model}
          content={modelData}
          data={{
            modelData,
            list,
          }}
        />
        <Pagination
          list={list}
          baseUrl={baseUrl}
          pageNumber={pageNumber as number}
          showNext={showNext}
        />
      </Layout>
    </>
  );
}
