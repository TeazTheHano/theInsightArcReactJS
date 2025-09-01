import Button from '../components/Button/Button';
import FAB from '../components/Button/FAB';
import { DivFlexColumn, DivFlexRow } from '../components/LayoutDiv/LayoutDiv';

export default function Test() {


    return (
        <DivFlexColumn style={{ margin: 'var(--PAGE-Prop-Body-margin)', gap: 'var(--Spacing-Spaceing-M)' }}>
            <FAB
                variantMode='sFAB'
            />

            <DivFlexRow style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                <DivFlexColumn style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                    <Button
                        children='Fill'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'
                        disabled
                        colorMode='Primary'
                        styleMode='Filled'
                    />
                    <Button
                        children='FillFixed'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Primary'
                        styleMode='FillFixed'
                    />
                    <Button
                        children='Outlined'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'
                        autoFocus
                        colorMode='Primary'
                        styleMode='Outlined'
                    />
                    <Button
                        children='Text'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'
                        disabled
                        colorMode='Primary'
                        styleMode='Text'
                    />
                    <Button
                        children='Elevated'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Primary'
                        styleMode='Elevated'
                    />
                </DivFlexColumn>

                <DivFlexColumn style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                    <Button
                        children='Fill'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='Filled'
                    />
                    <Button
                        children='FillFixed'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='FillFixed'
                    />
                    <Button
                        children='Outlined'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='Outlined'
                    />
                    <Button
                        children='Text'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='Text'
                    />
                    <Button
                        children='Elevated'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='Elevated'
                    />
                </DivFlexColumn>

                <DivFlexColumn style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                    <Button
                        children='Fill'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Tertiary'
                        styleMode='Filled'
                    />
                    <Button
                        children='FillFixed'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Tertiary'
                        styleMode='FillFixed'
                    />
                    <Button
                        children='Outlined'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Tertiary'
                        styleMode='Outlined'
                    />
                    <Button
                        children='Text'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Tertiary'
                        styleMode='Text'
                    />
                    <Button
                        children='Elevated'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Tertiary'
                        styleMode='Elevated'
                    />
                </DivFlexColumn>

                <DivFlexColumn style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                    <Button
                        children='Fill'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Default'
                        styleMode='Filled'
                    />
                    <Button
                        children='FillFixed'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Default'
                        styleMode='FillFixed'
                    />
                    <Button
                        children='Outlined'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Default'
                        styleMode='Outlined'
                    />
                    <Button
                        children='Text'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Default'
                        styleMode='Text'
                    />
                    <Button
                        children='Elevated'
                        onClick={() => { }}
                        iconMain='edit'
                        label='Edit'

                        colorMode='Default'
                        styleMode='Elevated'
                    />
                </DivFlexColumn>

                <DivFlexColumn style={{ gap: 'var(--Spacing-Spaceing-XS)' }}>
                    <FAB
                        onClick={() => { }}
                        icon='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='Filled'
                        variantMode='Full-FAB'
                    />
                    <FAB
                        onClick={() => { }}
                        icon='edit'
                        label='Edit'

                        colorMode='Secondary'
                        styleMode='FillFixed'
                        variantMode='Full-FAB'
                    />
                    <FAB
                        onClick={() => { }}
                        icon='edit'
                        label='Edit'

                        colorMode='Primary'
                        styleMode='Filled'
                        variantMode='FAB'
                    />
                    <FAB
                        onClick={() => { }}
                        icon='edit'
                        label='Edit'

                        colorMode='Primary'
                        styleMode='Filled'
                        variantMode='mFAB'
                    />
                    <FAB
                        onClick={() => { }}
                        icon='edit'
                        label='Edit'

                        colorMode='Primary'
                        styleMode='Filled'
                        variantMode='sFAB'
                    />

                </DivFlexColumn>
            </DivFlexRow>
        </DivFlexColumn>
    )
}
