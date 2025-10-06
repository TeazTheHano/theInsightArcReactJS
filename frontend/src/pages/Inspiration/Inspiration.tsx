import { useEffect, useState, useCallback } from "react";
import SegmentedButton from "../../components/Button/SegmentedButton";
import { DivFlexColumn, DivFlexRow } from "../../components/LayoutDiv/LayoutDiv";
import LazyImage from "../../components/LazyImage/lazyImage";
import { TextBodyMedium, TextHeadlineLarge } from "../../components/TextBox/textBox";
import { useTranslation } from 'react-i18next'
import { IdealBlockGen } from "../../components/Blog/BlogItemSingle";
import Button from "../../components/Button/Button";
import styles from './Inspiration.module.css'
import { placeholderData } from "../../data/placeholderData";

export default function Inspiration() {
  const { t: t_landingPage } = useTranslation('landingPage')
  const { t } = useTranslation('inspiration')

  const [gridView, setGridView] = useState<boolean>(() => localStorage.getItem('inspirationGridView') === 'true');
  const [showDescription, setShowDescription] = useState<boolean>(() => localStorage.getItem('inspirationShowDescription') === 'true');

  useEffect(() => {
    localStorage.setItem('inspirationGridView', gridView.toString());
  }, [gridView]);
  
  useEffect(() => {
    localStorage.setItem('inspirationShowDescription', showDescription.toString());
  }, [showDescription]);

  const handleGridViewChange = useCallback((e: string) => setGridView(e === '1'), []);
  const handleToggleDescription = useCallback(() => setShowDescription(prev => !prev), []);

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="/placeholder" height={'30dvh'} maxHeight='50dvw' />

      <DivFlexColumn className={styles.inspirationContainer}>
        <DivFlexColumn className={styles.titleSectionStyle}>
          <TextHeadlineLarge children={t_landingPage('section-4-title')} />
          <DivFlexRow className={styles.controlsStyle}>
            <SegmentedButton
              preSelected={gridView ? '1' : '0'}
              compactMode
              onChange={handleGridViewChange}
              dataList={[
                {
                  label: t("inspiration-segment-freeform"),
                  value: '0',
                  icon: 'dashboard_filled'
                },
                {
                  label: t("inspiration-segment-grid"),
                  value: '1',
                  icon: 'grid_on_filled'
                }
              ]}
            />
            <Button
              variantMode="Icon"
              colorMode="Secondary"
              label={showDescription ? t("hide-description") : t("show-description")}
              leadingIcon={showDescription ? 'comment_disabled_filled' : 'comment_filled'}
              onClick={handleToggleDescription}
              children={showDescription ? t("hide-description") : t("show-description")}
              showTitleWhileHover
            />
          </DivFlexRow>
        </DivFlexColumn>
        <TextBodyMedium children={t_landingPage('section-4-description')} />
      </DivFlexColumn>

      <div className={[styles.inspirationContainer, styles[`gridView-${gridView}`]].join(' ')}>
        <IdealBlockGen dataList={placeholderData} squareRatio={gridView} compactMode={!showDescription} />
      </div>
    </div>
  )
}
