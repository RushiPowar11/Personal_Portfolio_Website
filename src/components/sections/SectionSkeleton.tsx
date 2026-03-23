type Props = {
  label: string;
  minHeight?: string;
};

export default function SectionSkeleton({ label, minHeight = "min-h-[70vh]" }: Props) {
  return (
    <section
      aria-label={`${label} loading`}
      className={`relative overflow-hidden border-y border-white/[5%] bg-black/[30%] ${minHeight}`}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl animate-pulse items-center px-6 py-24 md:px-12">
        <div className="h-40 w-full rounded-3xl bg-white/[5%]" />
      </div>
    </section>
  );
}

