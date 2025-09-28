import { ShineBorder } from "./ui/shine-border"

function ShineBorderDemo() {
  return (
    <ShineBorder
      className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent">
        Shine Border
      </span>
    </ShineBorder>
  )
}

function ShineBorderMonotone() {
  return (
    <ShineBorder
      className="text-center text-2xl font-bold capitalize"
      color="white"
    >
      Shine Border
    </ShineBorder>
  )
}

export {
  ShineBorderDemo,
  ShineBorderMonotone,
}
