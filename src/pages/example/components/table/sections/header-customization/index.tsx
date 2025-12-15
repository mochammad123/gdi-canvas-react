import ContentSection from '../../components/content-section';
import { memo } from 'react';
import SingleHeader from './components/single-header';
import DoubleHeader from './components/double-header';
import FilterCustomization from './components/filter-customization';
import CustomRender from './components/custom-render';

function HeaderCustomization({ id }: { id: string }) {
  return (
    <ContentSection id={id} title="Header Customization" className="mb-10">
      <SingleHeader />
      <DoubleHeader />
      <FilterCustomization />
      <CustomRender />
    </ContentSection>
  );
}

export default memo(HeaderCustomization);
