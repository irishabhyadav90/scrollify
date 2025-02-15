import React from 'react';

const PostItem = React.memo(({ title, style }: { title: string, style: any }) => (
    <div style={style} className='p-4 bg-white border-b border-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white '>{title}</div>
));

export default PostItem;