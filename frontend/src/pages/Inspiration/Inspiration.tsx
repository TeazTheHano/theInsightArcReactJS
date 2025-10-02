import { useEffect, useState } from "react";
import SegmentedButton from "../../components/Button/SegmentedButton";
import { DivFlexColumn, DivFlexRow } from "../../components/LayoutDiv/LayoutDiv";
import LazyImage from "../../components/LazyImage/lazyImage";
import { TextBodyMedium, TextHeadlineLarge } from "../../components/TextBox/textBox";
import { useTranslation } from 'react-i18next'
import { IdealBlockGen, type BlogItemProps } from "../../components/Blog/BlogItemSingle";
import Button from "../../components/Button/Button";
import styles from './Inspiration.module.css'

const item112: BlogItemProps[] = [
  {
    title: 'Coming soon',
    description: 'Coming soon',
    image: 'placeholder',
    link: '/test',
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
    title: 'Coming soon',
    description: 'Coming soon',
    image: 'placeholder',
    link: '/test',
    // timeStamp: new Date('2023-09-15 08:30:00 GMT+07:00')
  },
  {
    title: 'Coming soon',
    description: 'Coming soon',
    image: 'placeholder',
    link: '/test'
  },
]

export default function Inspiration() {
  const { t: t_landingPage } = useTranslation('landingPage')
  const { t: t_common } = useTranslation('common')

  const [gridView, setGridView] = useState<boolean>(() => localStorage.getItem('inspirationGridView') === 'true');
  const [showDescription, setShowDescription] = useState<boolean>(() => localStorage.getItem('inspirationShowDescription') === 'true');

  useEffect(() => {
    localStorage.setItem('inspirationGridView', gridView.toString());
  }, [gridView]);
  useEffect(() => {
    localStorage.setItem('inspirationShowDescription', showDescription.toString());
  }, [showDescription]);

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="/placeholder" height={'30dvh'} maxHeight='50dvw' />

      <DivFlexColumn
        style={{
          padding: 'var(--Spacing-Spaceing-M, 24px) var(--Spacing-Spaceing-S, 16px)',
          gap: ' var(--Spacing-Spaceing-M, 24px)'
        }}
      >
        <DivFlexColumn style={{ gap: 'var(--Spacing-Spaceing-XS, 12px)' }}>
          <TextHeadlineLarge children={t_landingPage('section-4-title')} />
          <DivFlexRow style={{ gap: 'var(--Spacing-Spaceing-S, 16px)' }}>
            <SegmentedButton
              preSelected={gridView ? '1' : '0'}
              compactMode
              onChange={(e) => setGridView(e === '1')}
              dataList={[
                {
                  label: t_common("inspiration-segment-freeform"),
                  value: '0',
                  icon: 'dashboard_filled'
                },
                {
                  label: t_common("inspiration-segment-grid"),
                  value: '1',
                  icon: 'grid_on_filled'
                }
              ]}
            />
            <Button
              variantMode="Icon"
              colorMode="Secondary"
              label="Show description"
              leadingIcon={showDescription ? 'comment_filled' : 'comment_disabled_filled'}
              onClick={() => setShowDescription(!showDescription)}
            />
          </DivFlexRow>
        </DivFlexColumn>
        <TextBodyMedium children={t_landingPage('section-4-description')} />
      </DivFlexColumn>

      <div className={[styles.inspirationContainer, styles[`gridView-${gridView}`]].join(' ')} style={{ padding: 'var(--Spacing-Spaceing-M, 24px) var(--Spacing-Spaceing-S, 16px)', }}>
        <IdealBlockGen dataList={item112} squareRatio={gridView} compactMode={!showDescription} />
      </div>
    </div>
  )
}
