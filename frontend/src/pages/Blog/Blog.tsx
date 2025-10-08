import { useTranslation } from 'react-i18next';
import styles from './BlogList.module.css';
import LazyImage from '../../components/LazyImage/lazyImage';
import { DivFlexColumn } from '../../components/LayoutDiv/LayoutDiv';
import { BlogItem2RowGen } from '../../components/Blog/BlogListVariant';
import { TextHeadlineLarge } from '../../components/TextBox/textBox';
import Button from '../../components/Button/Button';
import { placeholderData } from '../../data/placeholderData';
import Divider from '../../components/Divider/Divider';
import { useEffect, useState, useMemo, useCallback } from 'react';
import type { BlogItemProps } from '../../data/type';
import { fetchBlogList } from '../../utils/fetchContent';

export default function BlogList() {
  const { t } = useTranslation('blog')
  const { t: t_toast } = useTranslation('toast')

  const [isInSM, setIsInSM] = useState<boolean>(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsInSM(document.body.classList.contains('size-and-spacing-sm'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setIsInSM(document.body.classList.contains('size-and-spacing-sm'));
    return () => observer.disconnect();
  }, []);

  const [LATEST_POSTS, set_LATEST_POSTS] = useState<BlogItemProps[]>([]);
  const [TRENDING_POSTS, set_TRENDING_POSTS] = useState<BlogItemProps[]>([]);
  const [CATE_1_POSTS, set_CATE_1_POSTS] = useState<BlogItemProps[]>([]);
  const [CATE_2_POSTS, set_CATE_2_POSTS] = useState<BlogItemProps[]>([]);

  const sortData = useCallback((data: BlogItemProps[]) => {
    const sortedByTime = [...data].sort((a, b) => {
      const dateA = a.timeStamp ? new Date(a.timeStamp).getTime() : 0;
      const dateB = b.timeStamp ? new Date(b.timeStamp).getTime() : 0;
      return dateB - dateA;
    });

    set_LATEST_POSTS(sortedByTime.slice(0, 5) || placeholderData);
    set_TRENDING_POSTS(sortedByTime.slice(0, 5));
    const category1 = data.filter(item => item.category === 'Category 1');
    set_CATE_1_POSTS(category1.slice(0, 5) || placeholderData);
    const category2 = data.filter(item => item.category === 'Category 2');
    set_CATE_2_POSTS(category2.slice(0, 5) || placeholderData);
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchBlogList()
      .then((data) => {
        sortData(data);
        setLoading(false);
      })
      .catch((err) => { setError(err.message); setLoading(false); });
  }, [sortData]);

  const direction = useMemo(() => isInSM ? "column" : "row", [isInSM]);
  const trendingThumbSize = useMemo(() => isInSM ? 100 : 300, [isInSM]);
  const trendingRatio = useMemo(() => isInSM ? '1' : undefined, [isInSM]);
  // TODO: handle view all
  const handleViewAll = useCallback(() => { }, []);

  // TODO: modal needed
  if (loading) return <div>{t_toast('info.loading')}</div>;
  if (error) return <div>{t_toast('error.loadFailed')} - {error}</div>

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
            onClick={handleViewAll} />
        </DivFlexColumn>
        <BlogItem2RowGen dataList={LATEST_POSTS} thumbSize={600} direction={direction} />
      </DivFlexColumn>

      <Divider />
      {/* CATEGORY 1 */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <LazyImage alt="Category 1 Banner" src="/placeholder" height={'20dvh'} maxHeight='50dvw' />
        <BlogItem2RowGen dataList={CATE_1_POSTS} thumbSize={600} direction={direction} />
      </DivFlexColumn>

      <Divider />
      {/* CATEGORY 2 */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <LazyImage alt="Category 2 Banner" src="/placeholder" height={'20dvh'} maxHeight='50dvw' />
        <BlogItem2RowGen dataList={CATE_2_POSTS} thumbSize={600} direction={direction} />
      </DivFlexColumn>

      <Divider />
      {/* TRENDING */}
      <DivFlexColumn className={styles.inspirationContainer}>
        <TextHeadlineLarge children={t('trending')} />
        <BlogItem2RowGen dataList={TRENDING_POSTS} thumbSize={trendingThumbSize} ratio={trendingRatio} hideDescription />
      </DivFlexColumn>
    </div>
  )
}
