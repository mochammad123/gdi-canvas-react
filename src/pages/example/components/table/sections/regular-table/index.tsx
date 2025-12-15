import ContentSection from '../../components/content-section';
import BasicImplementation from './components/basic-implementation';
import QuickInfo from './components/quick-info';
import WithFreezeColumn from './components/with-freeze-column';

function RegularTable({ id }: { id: string }) {
  return (
    <ContentSection id={id} title="Regular Table" className="mb-10">
      <QuickInfo />
      <BasicImplementation />
      <WithFreezeColumn />
    </ContentSection>
  );
}

export default RegularTable;
