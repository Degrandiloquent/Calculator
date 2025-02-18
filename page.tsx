"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as math from "mathjs"

export default function AdvancedCalculator() {
  const [display, setDisplay] = useState("0")
  const [memory, setMemory] = useState<number | null>(null)

  const handleButtonClick = useCallback((value: string) => {
    setDisplay((prev) => {
      if (prev === "0" && "0123456789".includes(value)) {
        return value
      }
      if (prev === "Error") {
        return value
      }
      return prev + value
    })
  }, [])

  const handleClear = useCallback(() => {
    setDisplay("0")
  }, [])

  const handleCalculate = useCallback(() => {
    try {
      const result = math.evaluate(display)
      setDisplay(result.toString())
    } catch (error) {
      setDisplay("Error")
    }
  }, [display])

  const handleMemoryOperation = useCallback(
    (operation: string) => {
      switch (operation) {
        case "M+":
          setMemory((prev) => (prev || 0) + Number.parseFloat(display))
          break
        case "M-":
          setMemory((prev) => (prev || 0) - Number.parseFloat(display))
          break
        case "MR":
          if (memory !== null) {
            setDisplay(memory.toString())
          }
          break
        case "MC":
          setMemory(null)
          break
      }
    },
    [display, memory],
  ) // Added memory dependency

  const buttons = [
    "7",
    "8",
    "9",
    "/",
    "C",
    "(",
    "4",
    "5",
    "6",
    "*",
    ")",
    "sin(",
    "1",
    "2",
    "3",
    "-",
    "π",
    "cos(",
    "0",
    ".",
    "%",
    "+",
    "e",
    "tan(",
    "√(",
    "^",
    "log(",
    "ln(",
    "M+",
    "M-",
    "MR",
    "MC",
  ]

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg bg-white p-4 shadow-lg">
        <Input className="mb-4 text-right text-2xl" value={display} readOnly />
        <div className="grid grid-cols-6 gap-2">
          {buttons.map((btn) => (
            <Button
              key={btn}
              onClick={() => {
                if (btn === "C") {
                  handleClear()
                } else if (btn === "=") {
                  handleCalculate()
                } else if (["M+", "M-", "MR", "MC"].includes(btn)) {
                  handleMemoryOperation(btn)
                } else {
                  handleButtonClick(btn)
                }
              }}
              variant={btn === "C" ? "destructive" : btn === "=" ? "default" : "outline"}
              className={btn === "=" ? "col-span-2" : ""}
            >
              {btn}
            </Button>
          ))}
          <Button onClick={handleCalculate} className="col-span-2" variant="default">
            =
          </Button>
        </div>
      </div>
    </div>
  )
}

