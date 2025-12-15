import ContentSection from '../../components/content-section';
import { memo } from 'react';
import { generateUsers, getUserHeaders } from './utils';
import BasicStyling from './sections/basic-styling';
import StylingSpecificCell from './sections/styling-specific-cell';

const users = generateUsers(100);
const headers = getUserHeaders();

function SelectedCellStyling({ id }: { id: string }) {
  return (
    <ContentSection id={id} title="Selected Cell Styling" className="mb-10">
      <BasicStyling users={users} headers={headers} />
      <StylingSpecificCell users={users} headers={headers} />
    </ContentSection>
  );
}

export default memo(SelectedCellStyling);

export const BASIC_USAGE_EXAMPLE = ``;
