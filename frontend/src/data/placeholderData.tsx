import type { BlogItemProps } from "./type";

export const placeholderData: BlogItemProps[] = [
    {
        id: '1',
        title: 'Coming soon',
        slug: 'coming-soon',
        description: 'Coming soon',
        coverImage: 'placeholder',
        timeStamp: new Date('2023-10-01T12:00:00+07:00'),
        tags: [
            {
                title: 'Coming soon',
                link: 'abc',
            },
            {
                title: 'Coming soon',
                link: 'abc',
            }
        ]
    },
    {
        id: '2',
        title: 'Coming soon2',
        slug: 'coming-soon2',
        description: 'Coming soon2',
        coverImage: 'placeholder',
        timeStamp: new Date('2023-09-15T08:30:00+07:00')
    },
    {
        id: '3',
        title: 'Coming soon3',
        slug: 'coming-soon3',
        description: 'Coming soon3',
        coverImage: 'placeholder',
        timeStamp: new Date('2023-08-20T14:45:00+07:00')
    },
]