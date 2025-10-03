import { useTranslation } from 'react-i18next';
import styles from './BlogList.module.css';
import LazyImage from '../../components/LazyImage/lazyImage';
import { DivFlexColumn } from '../../components/LayoutDiv/LayoutDiv';
import { IdealBlockGen } from '../../components/Blog/BlogItemSingle';
import { TextHeadlineLarge } from '../../components/TextBox/textBox';

export default function BlogList() {
  const { t } = useTranslation('blog')

  return (
    <div>
      <LazyImage alt="Inspiration Banner" src="/placeholder" height={'30dvh'} maxHeight='50dvw' />

      <DivFlexColumn className={styles.inspirationContainer}>
        <DivFlexColumn>
          <TextHeadlineLarge children={t('newestPosts')}/>
        </DivFlexColumn>
        <IdealBlockGen dataList={[]} />
      </DivFlexColumn>
    </div>
  )
}
