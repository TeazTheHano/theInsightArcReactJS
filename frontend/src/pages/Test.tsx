import React from 'react';
import { DivFlexColumn } from '../components/LayoutDiv/LayoutDiv';
import TextField from '../components/TextInput/TextField';
import { TextHeadlineLarge } from '../components/TextBox/textBox';

export default function Test() {

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


        </DivFlexColumn>
    )
}
