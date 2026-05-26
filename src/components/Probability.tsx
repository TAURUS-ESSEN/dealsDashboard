type Props = {
  value: number;
};

export const ProbabilityBar = ({ value }: Props) => {
  const safeValue = Math.min(100, Math.max(0, value));
 
  const color = (safeValue: number) => {
  if (safeValue >= 70) return "bg-slate-700";
  if (safeValue >= 40) return "bg-orange-500";
  if (safeValue > 0) return "bg-amber-400";
  return "bg-gray-300";
};
      
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 w-20 rounded bg-gray-200">
        <div
          className={`h-2 rounded ${color(safeValue)}`}
          style={{ width: `${safeValue}%` }}
        />
      </div>
      <span className="w-9 text-sm">{safeValue}%</span>
    </div>
  );
};