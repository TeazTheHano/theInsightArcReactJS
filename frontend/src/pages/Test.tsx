import React from 'react';
import { DivFlexColumn, DivFlexRow } from '../components/LayoutDiv/LayoutDiv';
import TextField from '../components/TextInput/TextField';
import { TextHeadlineLarge } from '../components/TextBox/textBox';
import Chip from '../components/Chip/Chip';
import type { BlogItemProps } from '../data/type';
import { IdealItemGen } from '../components/Blog/IdealItem';

export default function Test() {

    const item112: BlogItemProps[] = [
        {
            id: '1',
            title: 'Coming soon',
            description: 'Coming soon',
            coverImage: 'https://docs-assets.developer.apple.com/published/e39001cb17826d4c35aed0a5a8371d2a/components-text-view-intro~dark%402x.png',
            link: '/test',
            ratio: '16/9',
            // timeStamp: new Date('2023-10-01 12:00:00 GMT+07:00'),
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
            title: 'Coming soon',
            description: 'Coming soon',
            coverImage: 'https://cdn.sanity.io/images/599r6htc/regionalized/19bc5a345fc9d23d9890a3188aa18a67f3c57550-2880x1440.png?q=75&fit=max&auto=format&dpr=0.75',
            link: '/landingpage',
            ratio: '3',
            timeStamp: new Date('2023-09-15 08:30:00 GMT+07:00')
        },
        {
            id: '3',
            title: 'Coming soon',
            description: 'Coming soon',
            coverImage: 'https://cdn.sanity.io/images/599r6htc/regionalized/da4205446e7c425053653d58c5aed6fac556c659-2160x1440.png?q=75&fit=max&auto=format&dpr=2',
            link: '/test'
        },
    ]

    const [data, setData] = React.useState<string>('');
    const [data1, setData1] = React.useState<string>('');
    return (
        <DivFlexColumn style={{ margin: 'var(--PAGE-Prop-Body-margin)', gap: 'var(--Spacing-Spaceing-M)' }}>
            <TextHeadlineLarge>{data}</TextHeadlineLarge>
            <TextHeadlineLarge>{data1}</TextHeadlineLarge>

            <TextField
                label='fill fill'
                // onChange={() => {
                //     setData('');
                // }}
                onChange={e => { setData(e.target.value); setData1(e.target.id) }}
                variant='Filled'
                leadingIcon='search'
                placeholder='placeholder'
                preValue='value2'
                supportText='abc'
                trailingIcon='edit'
                // trailingIconAction={() => alert('click info')}
                autoShowClearButton
                widthMode='fix-perfect-length'
                widthModeNumber={200}
                perfectLengthSizedParagraph='Long'
            // compactMode
            />
            <DivFlexRow style={{ gap: '1vw' }}>
                <IdealItemGen dataList={item112} />
            </DivFlexRow>

            <Chip children='asdfasdfsa' label='chip1' onClick={() => alert('click chip 1')} showTitleWhileHover/>

        </DivFlexColumn>
    )
}
