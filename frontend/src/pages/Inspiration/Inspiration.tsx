import { useEffect, useState, useCallback } from "react";
import SegmentedButton from "../../components/Button/SegmentedButton";
import { DivFlexColumn, DivFlexRow } from "../../components/LayoutDiv/LayoutDiv";
import LazyImage from "../../components/LazyImage/lazyImage";
import { TextBodyMedium, TextHeadlineLarge } from "../../components/TextBox/textBox";
import { useTranslation } from 'react-i18next'

import Button from "../../components/Button/Button";
import styles from './Inspiration.module.css'
import { IdealItemGen } from "../../components/Blog/IdealItem";
import { type BlogItemProps } from "../../data/type";
import { fetchInspirationList } from "../../utils/fetchContent";

export default function Inspiration() {
  const { t: t_landingPage } = useTranslation('landingPage')
  const { t: t_inspiration } = useTranslation('inspiration')
  const { t: t_toast } = useTranslation('toast')

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


  const [data, setData] = useState<BlogItemProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')
  useEffect(() => {
    setLoading(true);
    fetchInspirationList()
      .then((data) => {
        setData(data)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        console.log(error);
      });
  }, []);

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
                  label: t_inspiration("inspiration-segment-freeform"),
                  value: '0',
                  icon: 'dashboard_filled'
                },
                {
                  label: t_inspiration("inspiration-segment-grid"),
                  value: '1',
                  icon: 'grid_on_filled'
                }
              ]}
            />
            <Button
              variantMode="Icon"
              colorMode="Secondary"
              label={showDescription ? t_inspiration("hide-description") : t_inspiration("show-description")}
              leadingIcon={showDescription ? 'comment_disabled_filled' : 'comment_filled'}
              onClick={handleToggleDescription}
              children={showDescription ? t_inspiration("hide-description") : t_inspiration("show-description")}
              showTitleWhileHover
            />
          </DivFlexRow>
        </DivFlexColumn>
        <TextBodyMedium children={t_landingPage('section-4-description')} />
      </DivFlexColumn>

      <div className={[styles.inspirationContainer, styles[`gridView-${gridView}`]].join(' ')}>
        {loading ? <TextBodyMedium children={t_toast('info.loading')} /> : null}
        <IdealItemGen dataList={data} squareRatio={gridView} compactMode={!showDescription} openAsNewTab />
      </div>
    </div>
  )
}
