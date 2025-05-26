import Typography from './typography';

export default function FeedbackError({ text }: { text: string }) {
  if (!text) return null;
  return (
    <Typography as="global-hint" className="text-red-500 mt-0.5">
      {text}
    </Typography>
  );
}
