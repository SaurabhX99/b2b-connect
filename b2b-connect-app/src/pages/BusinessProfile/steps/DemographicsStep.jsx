import './FormField.css'

function DemographicsStep({ data, onChange }) {
  const handleChange = (e) => {
    onChange({ [e.target.name]: e.target.value })
  }

  return (
    <div className="demographics-step">
      <div className="form-row">
        <div className="form-field">
          <label className="form-field__label">Country</label>
          <select
            name="country"
            className="form-field__select"
            value={data.country}
            onChange={handleChange}
          >
            <option value="">Select country</option>
            <option value="us">United States</option>
            <option value="uk">United Kingdom</option>
            <option value="ca">Canada</option>
            <option value="au">Australia</option>
            <option value="de">Germany</option>
            <option value="fr">France</option>
            <option value="in">India</option>
            <option value="sg">Singapore</option>
            <option value="ae">United Arab Emirates</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-field__label">City</label>
          <input
            type="text"
            name="city"
            className="form-field__input"
            placeholder="e.g. London"
            value={data.city}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label className="form-field__label">Number of employees</label>
          <select
            name="employeeCount"
            className="form-field__select"
            value={data.employeeCount}
            onChange={handleChange}
          >
            <option value="">Select range</option>
            <option value="1-10">1 - 10</option>
            <option value="11-50">11 - 50</option>
            <option value="51-200">51 - 200</option>
            <option value="201-500">201 - 500</option>
            <option value="500+">500+</option>
          </select>
        </div>
        <div className="form-field">
          <label className="form-field__label">Annual revenue</label>
          <select
            name="annualRevenue"
            className="form-field__select"
            value={data.annualRevenue}
            onChange={handleChange}
          >
            <option value="">Select range</option>
            <option value="<100k">Under $100K</option>
            <option value="100k-500k">$100K - $500K</option>
            <option value="500k-1m">$500K - $1M</option>
            <option value="1m-5m">$1M - $5M</option>
            <option value="5m-10m">$5M - $10M</option>
            <option value="10m+">$10M+</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default DemographicsStep
