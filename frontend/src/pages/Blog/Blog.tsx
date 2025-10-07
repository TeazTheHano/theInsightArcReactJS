import { useTranslation } from 'react-i18next';
import styles from './BlogList.module.css';
import LazyImage from '../../components/LazyImage/lazyImage';
import { DivFlexColumn } from '../../components/LayoutDiv/LayoutDiv';
import { BlogItem2RowGen } from '../../components/Blog/BlogListVariant';
import { TextHeadlineLarge } from '../../components/TextBox/textBox';
import Button from '../../components/Button/Button';
import { placeholderData } from '../../data/placeholderData';
import Divider from '../../components/Divider/Divider';
import { useEffect, useState } from 'react';

export default function BlogList() {
  const { t } = useTranslation('blog')
  // check if screen is .sm 
  const [isInSM, setIsInSM] = useState<boolean>(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsInSM(document.body.classList.contains('size-and-spacing-sm'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    // Initial check
    setIsInSM(document.body.classList.contains('size-and-spacing-sm'));
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="/placeholder" height={'30dvh'} maxHeight='50dvw' />

      {/* LATEST */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <DivFlexColumn>
          <TextHeadlineLarge children={t('latestPost')} />
          <Button
            label={t('viewAll')}
            children={t('viewAll')}
            leadingIcon='arrow_outward'
            colorMode='Primary'
            onClick={() => { }} />
        </DivFlexColumn>
        <BlogItem2RowGen dataList={placeholderData} thumbSize={600} direction={isInSM ? "column" : "row"} />
      </DivFlexColumn>

      <Divider />
      {/* CATEGORY 1 */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <LazyImage alt="Category 1 Banner" src="/placeholder" height={'20dvh'} maxHeight='50dvw' />
        <BlogItem2RowGen dataList={placeholderData} thumbSize={600} direction={isInSM ? "column" : "row"} />
      </DivFlexColumn>

      <Divider />
      {/* CATEGORY 2 */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <LazyImage alt="Category 2 Banner" src="/placeholder" height={'20dvh'} maxHeight='50dvw' />
        <BlogItem2RowGen dataList={placeholderData} thumbSize={600} direction={isInSM ? "column" : "row"} />
      </DivFlexColumn>

      <Divider />
      {/* CATEGORY 3 */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <TextHeadlineLarge children={t('trending')} />
        <BlogItem2RowGen dataList={placeholderData} thumbSize={isInSM ? 100 : 300} ratio={isInSM ? '1' : undefined} hideDescription />
      </DivFlexColumn>
    </div>
  )
}
