import { memo } from 'react';
import ContentSection from '../../components/content-section';
import AdvancedRowspan from './components/advanced-rowspan';
import BasicRowspan from './components/basic-rowspan';
import OnclickDocumentation from './components/onclick-documentation';
import QuickInfo from './components/quick-info';

function RowSpan({ id }: { id: string }) {
  return (
    <ContentSection id={id} title="Row Span" className="mb-10">
      <QuickInfo />
      <BasicRowspan />
      <AdvancedRowspan />
      <OnclickDocumentation />
    </ContentSection>
  );
}

export default memo(RowSpan);
