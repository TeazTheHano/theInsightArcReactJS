import { ButtonDefault } from '../components/Button/Button';
import SegmentedButton from '../components/Button/SegmentedButton';
import { DivFlexColumn } from '../components/LayoutDiv/LayoutDiv';

export default function Test() {


    return (
        <DivFlexColumn style={{ margin: 'var(--PAGE-Prop-Body-margin)', gap: 'var(--Gap-Gap-0)' }}>
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Primary' styleMode='Outlined' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Secondary' styleMode='Outlined' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Tertiary' styleMode='Outlined' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Primary' styleMode='Text' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Secondary' styleMode='Text' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Tertiary' styleMode='Text' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Primary' styleMode='Elevated' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Secondary' styleMode='Elevated' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Tertiary' styleMode='Elevated' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Primary' styleMode='Filled' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Secondary' styleMode='Filled' />
            <ButtonDefault iconMain='phone_filled' children='heheh' label='' colorMode='Tertiary' styleMode='Filled' />
            <SegmentedButton borderRadius={'default'} styleMode='Filled' colorMode='Primary' />
            <SegmentedButton borderRadius={'default'} styleMode='Outlined' colorMode='Primary' />
            <SegmentedButton borderRadius={'rounded'} styleMode='Text' colorMode='Tertiary' />

            <SegmentedButton borderRadius={'rounded'} styleMode='Outlined' colorMode='Secondary' iconOnSelected='check' />
        </DivFlexColumn>
    )
}
