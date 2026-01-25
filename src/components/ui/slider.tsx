import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    value: number[]
    max?: number
    step?: number
    onValueChange?: (value: number[]) => void
}

const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
    ({ className, value, max = 100, step = 1, onValueChange, ...props }, ref) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onValueChange) {
                onValueChange([parseFloat(e.target.value)])
            }
        }

        const val = value[0] || 0
        const percentage = (val / max) * 100

        return (
            <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
                <input
                    type="range"
                    min={0}
                    max={max}
                    step={step}
                    value={val}
                    onChange={handleChange}
                    ref={ref}
                    className="absolute h-full w-full opacity-0 cursor-pointer z-10"
                    {...props}
                />
                <div className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
                    <div
                        className="absolute h-full bg-primary transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
                <div
                    className="absolute h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    style={{ left: `calc(${percentage}% - 10px)` }}
                />
            </div>
        )
    }
)
Slider.displayName = "Slider"

export { Slider }
