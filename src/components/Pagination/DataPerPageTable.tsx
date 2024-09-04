import { DATA_PER_PAGE } from "@/lib/variables/constants";
import clsx from "clsx";
import Button from "../Button";
import { Typography } from "../Text";


export default function DataPerPageTable({ className, activePage=10, onClick }: { className?:string; activePage?:number; onClick: (page: number) => void }) {
  return (
    <div className={clsx("flex gap-x-4 items-center",className)}>
      <Typography as="global-paragraph">Jumlah data per halaman</Typography>
      <DataPerPageButtons data={DATA_PER_PAGE} activePage={activePage}  onClick={onClick} />
    </div>
  );
}

function DataPerPageButtons({
  data,
  activePage,
  onClick,
}: {
  data: number[];
  activePage: number;
  onClick: (page: number) => void;
}) {
  return (
    <div className="flex gap-x-[10px] items-center">
      {data.map((page, key) => (
        <ButtonItem key={key} page={page} activePage={activePage} onClick={onClick} />
      ))}
    </div>
  );
}

function ButtonItem({
  page,
  activePage,
  onClick,
}: {
  page: number;
  activePage: number;
  onClick: (page: number) => void;
}) {
  return (
    <Button
      variant="transparent"
      onClick={() => onClick(page)}
      className={clsx(
        "w-[2.3125rem] h-[2.3125rem] flex justify-center items-center global-button",
        {
          "!bg-knitto-blue-40": activePage === page,
          "hover:bg-knitto-blue-40 hover:!opacity-100": "on-hover"
        }
      )}
    >
      {page}
    </Button>
  );
}
