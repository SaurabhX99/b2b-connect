import './FormField.css'

function OwnerStep({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <div className="owner-step">
      <div className="form-field">
        <label className="form-field__label">Full name</label>
        <input
          type="text"
          name="ownerName"
          className="form-field__input"
          placeholder="e.g. Anika Patel"
          value={data.ownerName}
          onChange={handleChange}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-field__label">Work email</label>
          <input
            type="email"
            name="ownerEmail"
            className="form-field__input"
            placeholder="you@company.com"
            value={data.ownerEmail}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label className="form-field__label">Phone number</label>
          <input
            type="tel"
            name="ownerPhone"
            className="form-field__input"
            placeholder="+1 (555) 000-0000"
            value={data.ownerPhone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">Your role</label>
        <select
          name="ownerRole"
          className="form-field__select"
          value={data.ownerRole}
          onChange={handleChange}
        >
          <option value="">Select your role</option>
          <option value="founder">Founder / CEO</option>
          <option value="director">Director</option>
          <option value="manager">Manager</option>
          <option value="partner">Partner</option>
          <option value="employee">Employee</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  )
}

export default OwnerStep
