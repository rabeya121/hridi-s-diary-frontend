const SkeletonCard = () => {
  return (
    <div className="flex h-[420px] w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-gold/10 bg-velvet-light">
      <div className="h-56 w-full bg-velvet" />
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="h-5 w-3/4 rounded bg-velvet" />
        <div className="h-4 w-full rounded bg-velvet" />
        <div className="h-4 w-2/3 rounded bg-velvet" />
        <div className="mt-auto h-9 w-full rounded-full bg-velvet" />
      </div>
    </div>
  );
};

export default SkeletonCard;