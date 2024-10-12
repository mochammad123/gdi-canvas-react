import { TableCell, TableRow } from "../Table";
import { Line, Shimmer } from "./Shimmer";

export default function ShimmerTableRow({
  cells = 4,
  classNameCell,
}: {
  classNameCell?: string;
  cells?: number;
}) {
  return (
    <TableRow>
      {Array(cells)
        .fill(1)
        .map((_, key) => (
          <TableCell className={classNameCell} key={key}>
            <Shimmer>
              <Line />
            </Shimmer>
          </TableCell>
        ))}
    </TableRow>
  );
}

export function ShimmerTableRows({ rows=7, cells=2 }: { rows?: number; cells?: number }) {
  return Array(rows)
    .fill(1)
    .map((_, key) => (
      <ShimmerTableRow classNameCell="!py-3.5" cells={cells} key={key} />
    ));
}
