import { useEffect, useState } from 'react';

import { Post } from '@/models/post.model';

export default function EditPostCourseGroups({
  historyInput,
}: {
  historyInput: Post;
}): JSX.Element {
  const [, setHistory] = useState<Post>();

  useEffect(() => {
    setHistory(historyInput);
  }, [historyInput]);

  return <>TODO: Create Groups</>;
}
