import './FormField.css'

function BusinessStep({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <div className="business-step">
      <div className="form-field">
        <label className="form-field__label">Registered business name</label>
        <div className="form-field__input-wrapper">
          <svg className="form-field__icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="4" width="14" height="10" rx="2" stroke="#9B9B9B" strokeWidth="1.5"/>
            <path d="M6 4V2.5C6 1.67 6.67 1 7.5 1H10.5C11.33 1 12 1.67 12 2.5V4" stroke="#9B9B9B" strokeWidth="1.5"/>
          </svg>
          <input
            type="text"
            name="businessName"
            className="form-field__input form-field__input--with-icon"
            placeholder="e.g. Northlane Advisory Ltd"
            value={data.businessName}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-field__label">Business registration number</label>
          <input
            type="text"
            name="registrationNumber"
            className="form-field__input"
            placeholder="Company or tax ID"
            value={data.registrationNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label className="form-field__label">Year established</label>
          <input
            type="text"
            name="yearEstablished"
            className="form-field__input"
            placeholder="e.g. 2018"
            value={data.yearEstablished}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">Primary business category</label>
        <div className="form-field__input-wrapper">
          <svg className="form-field__icon" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="2" y="2" width="6" height="6" rx="1" stroke="#9B9B9B" strokeWidth="1.5"/>
            <rect x="10" y="2" width="6" height="6" rx="1" stroke="#9B9B9B" strokeWidth="1.5"/>
            <rect x="2" y="10" width="6" height="6" rx="1" stroke="#9B9B9B" strokeWidth="1.5"/>
            <rect x="10" y="10" width="6" height="6" rx="1" stroke="#9B9B9B" strokeWidth="1.5"/>
          </svg>
          <select
            name="category"
            className="form-field__select form-field__input--with-icon"
            value={data.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="technology">Technology</option>
            <option value="consulting">Consulting</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
            <option value="manufacturing">Manufacturing</option>
            <option value="retail">Retail</option>
            <option value="legal">Legal</option>
            <option value="marketing">Marketing & Advertising</option>
            <option value="construction">Construction</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label">
          What does your business do?
          <span className="form-field__char-count">{data.description.length} / 300</span>
        </label>
        <textarea
          name="description"
          className="form-field__textarea"
          placeholder="Describe your core services, ideal customers and what makes your business distinctive."
          value={data.description}
          onChange={handleChange}
          maxLength={300}
          rows={4}
        />
      </div>
    </div>
  )
}

export default BusinessStep
