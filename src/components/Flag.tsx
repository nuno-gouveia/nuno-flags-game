interface FlagProps {
  code: string;
}

export function Flag({ code }: FlagProps) {
  return (
    <div className="flag-frame">
      <span className={`fi fi-${code} flag-image`} />
    </div>
  );
}
