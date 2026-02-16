
type AlertOnTimerProps = {
  seconds: number;
  totalMinutes?: number;
}

export default function AlertOnTimer({
  seconds,
  totalMinutes = 30,
}: AlertOnTimerProps) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="alert-on-timer">
      {pad(minutes)}:{pad(secs)} / {totalMinutes} דקות
    </div>
  );
}
