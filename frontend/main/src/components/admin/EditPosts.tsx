import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Post, PostStatus, PostType } from '@/models/post.model';
import { map, take } from 'rxjs/operators';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import {
  collection,
  query,
  orderBy,
  where,
  CollectionReference,
} from '@firebase/firestore';

function EditPosts({ type }: { type: PostType }): JSX.Element {
  const firestore = useFirestore();
  const collectionRef = collection(
    firestore,
    'posts'
  ) as CollectionReference<Post>;
  const q = query<Post>(
    collectionRef,
    where('type', '==', type),
    orderBy('updatedAt', 'desc')
  );
  const { status, data: posts } = useFirestoreCollectionData(q);

  return (
    <section
      className="block w-full space-y-4 lg:space-y-0 lg:table"
      role="table"
    >
      {status === 'loading' ? (
        <>Loading...</>
      ) : (
        posts.map((post, index) => (
          <section
            role="rowgroup"
            key={post.id}
            className="flex tbody lg:block"
          >
            <ul
              role="row"
              className="grid justify-between text-center tr rounded-tl-md rounded-bl-md lg:rounded-tr-md lg:rounded-bl-none lg:grid-cols-6 bg-secondary-600 dark:bg-secondary-600 text-basics-50 dark:text-basics-50"
            >
              <li
                className="p-2 text-left lg:justify-self-start"
                role="columnheader"
              >
                Title
              </li>
              <li className="p-2 text-left" role="columnheader">
                Id
              </li>
              <li className="p-2 text-left" role="columnheader">
                Slug
              </li>
              <li className="p-2 text-left" role="columnheader">
                Date Published
              </li>
              <li className="p-2 text-left" role="columnheader">
                Author
              </li>
              <li
                className="p-2 text-left lg:justify-self-center"
                role="columnheader"
              >
                Status
              </li>
            </ul>
            <ul
              className={`w-full tr ${
                index % 2
                  ? 'bg-primary-100 hover:bg-primary-200'
                  : 'bg-basics-100 hover:bg-basics-200'
              }`}
            >
              <Link href={`${type}/${post.id}`}>
                <a className="grid items-center lg:grid-cols-6 hover:text-current dark:hover:text-current">
                  <li className="p-2 text-left td" role="cell">
                    {post.title}
                  </li>
                  <li className="p-2 text-sm text-left td" role="cell">
                    {post.id}
                  </li>
                  <li className="p-2 text-left td" role="cell">
                    {post.slug}
                  </li>
                  <li className="p-2 text-left td" role="cell">
                    {post.publishedAt
                      ? new Date(
                          post.publishedAt as unknown as Date
                        ).toLocaleString()
                      : ''}
                  </li>
                  <li className="flex flex-col p-2 text-left td" role="cell">
                    {post.authors?.map((author, i) => (
                      <p key={i} className="text-sm">
                        {author.email}
                      </p>
                    ))}
                  </li>
                  <li
                    className="p-2 text-left lg:justify-self-center"
                    role="cell"
                  >
                    <span
                      className={`m-1 ${
                        post && post.status === PostStatus.draft
                          ? `px-2 py-1 rounded-full bg-basics-400 text-white dark:bg-basics-400 dark:text-white`
                          : `px-2 py-1 rounded-full bg-success-600 text-basics-50 dark:bg-success-600 dark:text-basics-50`
                      }`}
                    >
                      {post.status}
                    </span>
                  </li>
                </a>
              </Link>
            </ul>
          </section>
        ))
      )}
      <style jsx>{`
        .td {
          word-break: break-word;
        }
        @media (min-width: 1024px) {
          .tbody:not(:first-child) .tr:first-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}

export default EditPosts;

// const titleBodyTemplate = (rowData) => {
//   return (
//     <React.Fragment>
//       <span className="p-column-title lg:hidden">Title</span>
//       {rowData.title}
//     </React.Fragment>
//   );
// };

// const idBodyTemplate = (rowData) => {
//   return (
//     <React.Fragment>
//       <span className="p-column-title lg:hidden">ID</span>
//       {rowData.id}
//     </React.Fragment>
//   );
// };

// const dateBodyTemplate = (rowData) => {
//   return (
//     <React.Fragment>
//       <span className="p-column-title lg:hidden">Date</span>
//       {rowData.updatedAt}
//     </React.Fragment>
//   );
// };

// const authorBodyTemplate = (rowData) => {
//   return (
//     <React.Fragment>
//       <span className="p-column-title lg:hidden">Author</span>
//       {rowData.createdBy}
//     </React.Fragment>
//   );
// };

// const statusBodyTemplate = (rowData) => {
//   return (
//     <React.Fragment>
//       <span className="p-column-title lg:hidden">Status</span>
//       {rowData.status}
//     </React.Fragment>
//   );
// };
// <section className="data-responsive-demo">
//   <div className="card">
//     <DataTable value={posts} className="p-datatable-responsive-demo">
//       <Column
//         className=""
//         field="title"
//         header="Title"
//         body={titleBodyTemplate}
//       />
//       <Column className="" field="id" header="ID" body={idBodyTemplate} />
//       <Column
//         className=""
//         field="date"
//         header="Date"
//         body={dateBodyTemplate}
//       />
//       <Column
//         className=""
//         field="author"
//         header="Author"
//         body={authorBodyTemplate}
//       />
//       <Column
//         className=""
//         field="status"
//         header="Status"
//         body={statusBodyTemplate}
//       />
//     </DataTable>
//   </div>
