import Button from '../components/Button/Button';
import FAB from '../components/Button/FAB';
import Chip from '../components/Chip/Chip';
import { DivFlexColumn, DivFlexRow } from '../components/LayoutDiv/LayoutDiv';
import TextFeild from '../components/TextInput/TextFeild';

export default function Test() {


    return (
        <DivFlexColumn style={{ margin: 'var(--PAGE-Prop-Body-margin)', gap: 'var(--Spacing-Spaceing-M)' }}>
            <FAB
                variantMode='sFAB'
            />
            <div style={{
                width: '40px',
                height: '40px',
                backgroundColor: '#434843'
            }}></div>
            <Button
                styleMode='Filled'
                label='dasf'
                children='Button'
                leadingIcon='edit'
                colorMode='Tertiary'
                disabled
            />
            <Chip
                styleMode='Filled'
                label='dasf'
                children='Button'
                leadingIcon='edit'
                colorMode='Tertiary'
            />

            <DivFlexRow style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                <TextFeild
                    label='outlined'
                    onChange={(value) => {
                        console.log(value);
                    }}
                    leadingIcon='search'
                    variant='Outlined'
                    // placeholder='placeholder'
                    // value='value'
                    supportText='fajksfjahdfs'
                    autoShowClearButton
                    trailingIcon='edit'
                    trailingIconAction={() => alert('click info')}
                    widthMode='fill'
                    compactMode
                />
                <TextFeild
                    label='fill disabled'
                    onChange={() => { }}
                    variant='Filled'
                    leadingIcon='search'
                    // placeholder='placeholder'
                    // value='value'
                    trailingIcon='edit'
                    trailingIconAction={() => alert('click info')}
                    disabled
                    compactMode
                />
                <TextFeild
                    label='fill'
                    onChange={() => { }}
                    variant='Filled'
                    leadingIcon='search'
                    // placeholder='placeholder'
                    // value='value'
                    supportText='abc'
                    trailingIcon='edit'
                    trailingIconAction={() => alert('click info')}
                    compactMode
                />
            </DivFlexRow>
            <DivFlexRow style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                <TextFeild
                    label='outlined'
                    onChange={() => { }}
                    leadingIcon='search'
                    variant='Outlined'
                    placeholder='placeholder'
                    // value='value'
                    supportText='fajksfjahdfs'
                    autoShowClearButton
                    trailingIcon='edit'
                    trailingIconAction={() => alert('click info')}
                    widthMode='fix-perfect-length'
                />
                <TextFeild
                    label='fill'
                    onChange={() => { }}
                    variant='Filled'
                    leadingIcon='search'
                    // placeholder='placeholder'
                    // value='value'
                    trailingIcon='edit'
                    trailingIconAction={() => alert('click info')}
                    widthMode='max-width-perfect-length'
                />
                <TextFeild
                    label='fill'
                    onChange={() => { }}
                    variant='Filled'
                    leadingIcon='search'
                    placeholder='placeholder'
                    // value='value'
                    supportText='abc'
                    trailingIcon='edit'
                    trailingIconAction={() => alert('click info')}
                    widthMode='min-width-perfect-length'
                />
            </DivFlexRow>
        </DivFlexColumn>
    )
}
