import { Button, Dropdown, Typography } from '@knittotextile/react-ui';
import { ReactNode, useState } from 'react';

export default function DropdownPage() {
  const [lastAction, setLastAction] = useState('Belum ada aksi');

  return (
    <div className="p-4 flex flex-col gap-3 mb-10">
      <Typography as="h3">Dropdown</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card title="Basic Menu">
          <Dropdown>
            <Dropdown.Trigger>
              <Button color="navy">Aksi</Button>
            </Dropdown.Trigger>
            <Dropdown.Popover placement="bottom">
              <Dropdown.Menu onAction={(id) => setLastAction(id)}>
                <Dropdown.Item id="edit">Edit</Dropdown.Item>
                <Dropdown.Item id="duplicate">Duplikat</Dropdown.Item>
                <Dropdown.Item id="delete" variant="danger">
                  Hapus
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
          <Typography as="global-paragraph" className="text-black-60 dark:text-black-40">
            Aksi terakhir: {lastAction}
          </Typography>
        </Card>

        <Card title="Placement">
          <div className="flex flex-wrap gap-4">
            {(['bottom', 'bottom-end', 'top', 'top-end'] as const).map((placement) => (
              <Dropdown key={placement}>
                <Dropdown.Trigger>
                  <Button variant="outline" color="navy">
                    {placement}
                  </Button>
                </Dropdown.Trigger>
                <Dropdown.Popover placement={placement}>
                  <Dropdown.Menu onAction={() => {}}>
                    <Dropdown.Item id="item-1">Item 1</Dropdown.Item>
                    <Dropdown.Item id="item-2">Item 2</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown>
            ))}
          </div>
        </Card>

        <Card title="Disabled Item">
          <Dropdown>
            <Dropdown.Trigger>
              <Button variant="outline" color="steel-blue">
                Menu dengan item disabled
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Popover>
              <Dropdown.Menu onAction={() => {}}>
                <Dropdown.Item id="view">Lihat</Dropdown.Item>
                <Dropdown.Item id="edit">Edit</Dropdown.Item>
                <Dropdown.Item id="archive" disabled>
                  Arsip (disabled)
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </Card>
      </div>
    </div>
  );
}

const Card = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <div className="p-4 flex flex-col gap-4 bg-white dark:bg-black-80 shadow-md h-max">
      <Typography as="h4" className="text-navy-100 dark:text-greyish-semi-white">
        {title}
      </Typography>
      {children}
    </div>
  );
};
