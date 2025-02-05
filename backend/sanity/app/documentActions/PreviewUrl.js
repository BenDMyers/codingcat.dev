import React from 'react';
import sanityClient from 'part:@sanity/base/client';
const client = sanityClient.withConfig({ apiVersion: `2021-05-19` });

import { Button, Select } from '@sanity/ui';

export function PreviewUrl({ id, type, published, draft }) {
  const doc = draft || published;
  const [isDialogOpen, setDialogOpen] = React.useState(false);
  const [courses, setCourses] = React.useState([]);
  const [selection, setSelection] = React.useState({});
  const [selectedCourse, setSelectedCourse] = React.useState({});

  const url = () => {
    const location = window.location;
    let front = '';
    switch (location.host) {
      case 'admin-dev.codingcat.dev':
        front = 'https://dev.codingcat.dev';
        break;
      case 'admin.codingcat.dev':
        front = 'https://codingcat.dev';
        break;
      default:
        front = 'http://localhost:3000';
    }
    return `${front}/api/preview`;
  };
  const navigate = async () => {
    const query = '*[_id == "sanity-preview-secret"][0]';
    const kv = await client.fetch(query, {});
    if (type === 'lesson') {
      const course = selection.courses.find((c) => c._id === selectedCourse);
      window.open(
        `${url()}?secret=${kv.value}&courseType=${course._type}&courseSlug=${
          course.slug.current
        }&selectionType=${selection._type}&selectionSlug=${
          selection.slug.current
        }&_id=${doc._id}`,
        '__blank'
      );
    } else {
      window.open(
        `${url()}?secret=${kv.value}&selectionType=${doc._type}&selectionSlug=${
          doc.slug.current
        }&_id=${doc._id}`,
        '_blank'
      );
    }
  };
  return {
    label: `Open Live Preview`,
    onHandle: () => {
      if (!doc?.slug?.current) {
        alert('Missing Slug');
        return;
      }
      setCourses([]);
      setSelection({});
      setSelectedCourse({});
      if (type !== 'lesson') {
        navigate(doc);
      } else {
        const query = `
      *[_id match $id][0]{
        "type":_type,
        "slug":slug.current,
        "courses": *[ _type == 'course' && $id in sections[].lessons[]._ref ]
        {
          _id,
          title,
          _type,
          slug,
        }
      }
      `;
        const params = { id };
        client.fetch(query, params).then((s) => {
          setSelection({
            ...doc,
            courses: s.courses,
          });

          if (s?.courses && s?.courses.length > 0) {
            for (const [i, course] of s?.courses.entries()) {
              if (i === 0) {
                setSelectedCourse(course._id);
              }
              setCourses((prevCourses) => [...prevCourses, course]);
            }
            setDialogOpen(true);
          } else {
            alert('This lesson has no associated courses.');
          }
        });
      }
    },
    dialog: isDialogOpen && {
      type: 'modal',
      onClose: () => {
        setDialogOpen(false);
      },
      header: 'Choose Course for Lesson',
      content: (
        <>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.currentTarget.value)}
          >
            {courses.map((c) => (
              <option value={c._id}>{c.title}</option>
            ))}
          </Select>
          <Button
            mode="default"
            onClick={(e) => {
              e.preventDefault();
              navigate();
            }}
          >
            Select
          </Button>
        </>
      ),
    },
  };
}
