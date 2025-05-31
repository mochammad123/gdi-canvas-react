import { Typography } from '@/components/ui/typhography';
import NavyButtonsCard from './cards/navy-buttons-card';
import BurntOrangeButtonsCard from './cards/burnt-orange-buttons-card';
import SteelBlueButtonsCard from './cards/steel-blue-buttons-card';
import WhiteButtonsCard from './cards/white-buttons-card';
import NavyButtonsSmCard from './cards/navy-buttons-sm-card';
import BurntOrangeButtonsSmCard from './cards/burnt-orange-buttons-sm-card';
import SteelBlueButtonsSmCard from './cards/steel-blue-buttons-sm-card';
import WhiteButtonsSmCard from './cards/white-buttons-sm-card';
import IconButtonsCard from './cards/icon-buttons-card';

export default function ButtonPage() {
  return (
    <div className="p-4 bg-knitto-blue-20 flex flex-col gap-3">
      <Typography as="h3">Button</Typography>
      <div className="h-2 w-72 bg-burnt-orange-100" />

      <div className="grid grid-cols-4 py-2 gap-4">
        <NavyButtonsCard />
        <BurntOrangeButtonsCard />
        <SteelBlueButtonsCard />
        <WhiteButtonsCard />
        <NavyButtonsSmCard />
        <BurntOrangeButtonsSmCard />
        <SteelBlueButtonsSmCard />
        <WhiteButtonsSmCard />
        <IconButtonsCard />
      </div>
    </div>
  );
}
