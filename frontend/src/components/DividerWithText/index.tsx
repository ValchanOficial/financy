export function DividerWithText({ text = "" }: { text?: string }) {
  return (
    <>
    {text ? (
      <div className="flex items-center gap-3 my-6">
      <hr className="bg-gray-300 w-full h-0.2"/>
      <span className="text-gray-500 pb-1 text-sm">
        {text}
      </span>
      <hr className="bg-gray-300 w-full h-0.2"/>
    </div>
    ) : (<hr className="bg-gray-300 w-full h-0.2"/>)}
    </>
  )
}