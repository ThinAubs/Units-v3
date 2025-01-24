import React, { useState } from 'react'
import { ArrowRight, Ruler, Scale, Thermometer, Droplet, Clock, Zap, Sun, Moon, Battery, Wifi, Cloud, Database } from 'lucide-react'

// Enhanced conversion functions
const convertLength = (value: number, from: string, to: string) => {
  const conversions = {
    Meters: 1,
    Feet: 3.28084,
    Inches: 39.3701,
    Centimeters: 100,
    Kilometers: 0.001,
    Miles: 0.000621371,
    Yards: 1.09361,
    Millimeters: 1000,
    'Nautical Miles': 0.000539957,
    'Light Years': 1.057e-16
  }
  return (value * conversions[to]) / conversions[from]
}

const convertWeight = (value: number, from: string, to: string) => {
  const conversions = {
    Kilograms: 1,
    Pounds: 2.20462,
    Ounces: 35.274,
    Grams: 1000,
    'Metric Tons': 0.001,
    'US Tons': 0.00110231,
    Carats: 5000,
    Milligrams: 1000000,
    Stones: 0.157473,
    'Troy Ounces': 32.1507
  }
  return (value * conversions[to]) / conversions[from]
}

const convertTemperature = (value: number, from: string, to: string) => {
  if (from === to) return value
  
  // Convert to Celsius first
  let celsius = value
  if (from === 'Fahrenheit') {
    celsius = (value - 32) * (5/9)
  } else if (from === 'Kelvin') {
    celsius = value - 273.15
  }

  // Convert to target unit
  if (to === 'Celsius') return celsius
  if (to === 'Fahrenheit') return (celsius * (9/5)) + 32
  if (to === 'Kelvin') return celsius + 273.15
  return value
}

const convertVolume = (value: number, from: string, to: string) => {
  const conversions = {
    Liters: 1,
    Gallons: 0.264172,
    Milliliters: 1000,
    'Cubic Meters': 0.001,
    'Cubic Feet': 0.0353147,
    'Cubic Inches': 61.0237,
    Quarts: 1.05669,
    Pints: 2.11338,
    'Fluid Ounces': 33.814,
    'Cups': 4.22675
  }
  return (value * conversions[to]) / conversions[from]
}

const convertTime = (value: number, from: string, to: string) => {
  const conversions = {
    Seconds: 1,
    Minutes: 1/60,
    Hours: 1/3600,
    Days: 1/86400,
    Weeks: 1/604800,
    Months: 1/2.628e+6,
    Years: 1/3.154e+7,
    Milliseconds: 1000,
    Microseconds: 1e+6,
    Nanoseconds: 1e+9
  }
  return (value * conversions[to]) / conversions[from]
}

const convertEnergy = (value: number, from: string, to: string) => {
  const conversions = {
    Joules: 1,
    'Kilojoules': 0.001,
    Calories: 0.239006,
    'Kilocalories': 0.000239006,
    'Watt Hours': 0.000277778,
    'Kilowatt Hours': 2.77778e-7,
    'Electronvolts': 6.242e+18,
    'British Thermal Units': 0.000947817,
    'Therms': 9.47817e-9,
    'Foot-pounds': 0.737562
  }
  return (value * conversions[to]) / conversions[from]
}

const convertDigitalStorage = (value: number, from: string, to: string) => {
  const conversions = {
    Bytes: 1,
    Kilobytes: 1/1024,
    Megabytes: 1/Math.pow(1024, 2),
    Gigabytes: 1/Math.pow(1024, 3),
    Terabytes: 1/Math.pow(1024, 4),
    Petabytes: 1/Math.pow(1024, 5),
    Bits: 8,
    'Nibbles': 2
  }
  return (value * conversions[to]) / conversions[from]
}

const convertSpeed = (value: number, from: string, to: string) => {
  const conversions = {
    'Meters/Second': 1,
    'Kilometers/Hour': 3.6,
    'Miles/Hour': 2.23694,
    'Feet/Second': 3.28084,
    'Knots': 1.94384,
    'Mach': 0.00293858,
    'Light Speed': 3.3356e-9
  }
  return (value * conversions[to]) / conversions[from]
}

const categories = [
  { 
    name: 'Length', 
    units: ['Meters', 'Feet', 'Inches', 'Centimeters', 'Kilometers', 'Miles', 'Yards', 'Millimeters', 'Nautical Miles', 'Light Years'], 
    color: 'blue',
    bgColor: 'from-blue-100 to-blue-200',
    textColor: 'text-blue-800',
    hoverColor: 'hover:bg-blue-100',
    activeColor: 'bg-blue-200',
    borderColor: 'border-blue-200',
    Icon: Ruler,
    converter: convertLength
  },
  { 
    name: 'Weight', 
    units: ['Kilograms', 'Pounds', 'Ounces', 'Grams', 'Metric Tons', 'US Tons', 'Carats', 'Milligrams', 'Stones', 'Troy Ounces'], 
    color: 'green',
    bgColor: 'from-green-100 to-green-200',
    textColor: 'text-green-800',
    hoverColor: 'hover:bg-green-100',
    activeColor: 'bg-green-200',
    borderColor: 'border-green-200',
    Icon: Scale,
    converter: convertWeight
  },
  { 
    name: 'Temperature', 
    units: ['Celsius', 'Fahrenheit', 'Kelvin'], 
    color: 'red',
    bgColor: 'from-red-100 to-red-200',
    textColor: 'text-red-800',
    hoverColor: 'hover:bg-red-100',
    activeColor: 'bg-red-200',
    borderColor: 'border-red-200',
    Icon: Thermometer,
    converter: convertTemperature
  },
  { 
    name: 'Volume', 
    units: ['Liters', 'Gallons', 'Milliliters', 'Cubic Meters', 'Cubic Feet', 'Cubic Inches', 'Quarts', 'Pints', 'Fluid Ounces', 'Cups'], 
    color: 'purple',
    bgColor: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-800',
    hoverColor: 'hover:bg-purple-100',
    activeColor: 'bg-purple-200',
    borderColor: 'border-purple-200',
    Icon: Droplet,
    converter: convertVolume
  },
  { 
    name: 'Time', 
    units: ['Seconds', 'Minutes', 'Hours', 'Days', 'Weeks', 'Months', 'Years', 'Milliseconds', 'Microseconds', 'Nanoseconds'], 
    color: 'yellow',
    bgColor: 'from-yellow-100 to-yellow-200',
    textColor: 'text-yellow-800',
    hoverColor: 'hover:bg-yellow-100',
    activeColor: 'bg-yellow-200',
    borderColor: 'border-yellow-200',
    Icon: Clock,
    converter: convertTime
  },
  { 
    name: 'Energy', 
    units: ['Joules', 'Kilojoules', 'Calories', 'Kilocalories', 'Watt Hours', 'Kilowatt Hours', 'Electronvolts', 'British Thermal Units', 'Therms', 'Foot-pounds'], 
    color: 'indigo',
    bgColor: 'from-indigo-100 to-indigo-200',
    textColor: 'text-indigo-800',
    hoverColor: 'hover:bg-indigo-100',
    activeColor: 'bg-indigo-200',
    borderColor: 'border-indigo-200',
    Icon: Zap,
    converter: convertEnergy
  },
  { 
    name: 'Digital Storage', 
    units: ['Bytes', 'Kilobytes', 'Megabytes', 'Gigabytes', 'Terabytes', 'Petabytes', 'Bits', 'Nibbles'], 
    color: 'pink',
    bgColor: 'from-pink-100 to-pink-200',
    textColor: 'text-pink-800',
    hoverColor: 'hover:bg-pink-100',
    activeColor: 'bg-pink-200',
    borderColor: 'border-pink-200',
    Icon: Database,
    converter: convertDigitalStorage
  },
  { 
    name: 'Speed', 
    units: ['Meters/Second', 'Kilometers/Hour', 'Miles/Hour', 'Feet/Second', 'Knots', 'Mach', 'Light Speed'], 
    color: 'teal',
    bgColor: 'from-teal-100 to-teal-200',
    textColor: 'text-teal-800',
    hoverColor: 'hover:bg-teal-100',
    activeColor: 'bg-teal-200',
    borderColor: 'border-teal-200',
    Icon: Cloud,
    converter: convertSpeed
  }
]

function App() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  const [fromUnit, setFromUnit] = useState(selectedCategory.units[0])
  const [toUnit, setToUnit] = useState(selectedCategory.units[1])
  const [inputValue, setInputValue] = useState('')
  const [result, setResult] = useState('')

  const convertUnits = () => {
    const value = parseFloat(inputValue)
    if (isNaN(value)) {
      setResult('Invalid input')
      return
    }

    try {
      const convertedValue = selectedCategory.converter(value, fromUnit, toUnit)
      setResult(convertedValue.toFixed(4).replace(/\.?0+$/, ''))
    } catch (error) {
      setResult('Conversion error')
    }
  }

  const SelectedIcon = selectedCategory.Icon

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-sm overflow-hidden p-6 space-y-6 border border-gray-100">
        {/* Header */}
        <div className={`bg-gradient-to-r ${selectedCategory.bgColor} p-6 rounded-lg text-center`}>
          <h1 className="text-4xl font-bold text-white mb-2">HowManyIn</h1>
          <p className="text-white/90 text-sm">Quick and Accurate Unit Conversions</p>
        </div>

        {/* Category Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {categories.map((category) => {
            const CategoryIcon = category.Icon
            return (
              <button
                key={category.name}
                onClick={() => {
                  setSelectedCategory(category)
                  setFromUnit(category.units[0])
                  setToUnit(category.units[1])
                  setInputValue('')
                  setResult('')
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all duration-200
                  bg-gradient-to-br ${category.bgColor} hover:brightness-95
                  ${
                    selectedCategory.name === category.name
                      ? 'ring-1 ring-gray-300 ring-offset-2'
                      : 'opacity-90 hover:opacity-100'
                  }`}
              >
                <CategoryIcon className={`w-6 h-6 mb-1 ${category.textColor}`} />
                <span className={`text-sm font-medium ${category.textColor}`}>{category.name}</span>
              </button>
            )
          })}
        </div>

        {/* Conversion Section */}
        <div className="space-y-4">
          {/* Input Section */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {selectedCategory.units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setFromUnit(unit)}
                  className={`flex-1 min-w-[100px] p-2 text-sm rounded-lg transition-all duration-200
                    ${selectedCategory.textColor}
                    ${
                      fromUnit === unit
                        ? `${selectedCategory.activeColor} border ${selectedCategory.borderColor}`
                        : `bg-white hover:${selectedCategory.hoverColor} border ${selectedCategory.borderColor}`
                    }`}
                >
                  {unit}
                </button>
              ))}
            </div>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className={`w-full p-3 bg-white rounded-lg focus:ring-1 focus:ring-${selectedCategory.color}-300 border ${selectedCategory.borderColor} font-medium`}
            />
          </div>

          {/* Arrow Icon */}
          <div className="flex justify-center">
            <ArrowRight className={`text-${selectedCategory.color}-400`} size={24} />
          </div>

          {/* Output Section */}
          <div className="space-y-2">
            <div className="flex gap-2 flex-wrap">
              {selectedCategory.units.map((unit) => (
                <button
                  key={unit}
                  onClick={() => setToUnit(unit)}
                  className={`flex-1 min-w-[100px] p-2 text-sm rounded-lg transition-all duration-200
                    ${selectedCategory.textColor}
                    ${
                      toUnit === unit
                        ? `${selectedCategory.activeColor} border ${selectedCategory.borderColor}`
                        : `bg-white hover:${selectedCategory.hoverColor} border ${selectedCategory.borderColor}`
                    }`}
                >
                  {unit}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={result}
              readOnly
              className={`w-full p-3 bg-white rounded-lg border ${selectedCategory.borderColor} font-medium`}
            />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={convertUnits}
          className={`w-full p-3 bg-gradient-to-r ${selectedCategory.bgColor} ${selectedCategory.textColor} rounded-lg 
            hover:brightness-95 focus:ring-1 focus:ring-${selectedCategory.color}-300 
            transition-all duration-200 flex items-center justify-center gap-2 border ${selectedCategory.borderColor} font-medium`}
        >
          <SelectedIcon className="w-5 h-5" />
          <span>Convert</span>
        </button>
      </div>
    </div>
  )
}

export default App
