import ContentSection from '../../components/content-section';
import QuickInfo from './components/quick-info';
import RegularTableImplementation from './components/regular-table-implementation';
import VirtualTableImplementation from './components/virtual-table-implementation';

function RowReorder({ id }: { id: string }) {
  return (
    <ContentSection id={id} title="Row Reorder (Drag & Drop)" className="mb-10">
      <QuickInfo />
      <RegularTableImplementation />
      <VirtualTableImplementation />
    </ContentSection>
  );
}

export default RowReorder;
