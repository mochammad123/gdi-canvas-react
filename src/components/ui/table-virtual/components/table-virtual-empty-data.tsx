export default function TableVirtualEmptyData({ searchValue }: { searchValue?: string }) {
  const text = searchValue ? (
    <>
      <b>{searchValue}</b> tidak ditemukan
    </>
  ) : (
    'Tidak ada data yang tersedia'
  );

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <p className="text-base text-gray-600">{text}</p>
    </div>
  );
}
