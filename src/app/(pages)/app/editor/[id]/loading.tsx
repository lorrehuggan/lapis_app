export default function Loading() {
  return (
    <section className="col-span-9 w-full h-full flex justify-center items-center">
      <div className="flex gap-1 items-center">
        <div className="w-3 h-3 border-t-2 border-b-2 border-foreground rounded-full animate-spin" />
        <small>Document Loading...</small>
      </div>
    </section>
  );
}
