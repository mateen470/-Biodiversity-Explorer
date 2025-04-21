import { useState } from 'react'
import DropDown from './components/dropdown/Dropdown'

const DUMMY_OPTIONS = [
  { name: 'Option One', value: 'one' },
  { name: 'Option Two', value: 'two' },
  { name: 'Option Three', value: 'three' },
]

function App() {
  const [selectedValue, setSelectedValue] = useState<string>('')

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-black)]">
      <DropDown
        name="Select an Option"
        options={DUMMY_OPTIONS}
        selected={selectedValue}
        onChange={(value) => setSelectedValue(value)}
      />
    </div>
  )
}

export default App
