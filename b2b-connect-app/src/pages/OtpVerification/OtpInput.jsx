import { useRef } from 'react'
import './OtpInput.css'

function OtpInput({ value, onChange }) {
  const inputRefs = useRef([])

  const handleChange = (index, e) => {
    const val = e.target.value
    if (val && !/^\d$/.test(val)) return

    const newOtp = [...value]
    newOtp[index] = val
    onChange(newOtp)

    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return

    const newOtp = [...value]
    for (let i = 0; i < pasted.length; i++) {
      newOtp[i] = pasted[i]
    }
    onChange(newOtp)
    inputRefs.current[Math.min(pasted.length, 5)]?.focus()
  }

  return (
    <div className="otp-input">
      {value.map((digit, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          className={`otp-input__digit ${digit ? 'otp-input__digit--filled' : ''}`}
          autoFocus={index === 0}
        />
      ))}
    </div>
  )
}

export default OtpInput
