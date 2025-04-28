import Typography from './typography';

export default function FeedbackError({ text }: { text: string }) {
  return (
    <Typography as="global-hint" className="text-red-500 mt-0.5">
      {text}
    </Typography>
  );
}
