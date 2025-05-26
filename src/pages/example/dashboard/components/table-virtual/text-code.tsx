export default function TextCode({ text }: { text: string }) {
  return <span className="p-0.5 bg-gray-500/20 rounded-md w-max">{text}</span>;
}
