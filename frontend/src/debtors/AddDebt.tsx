import '../styles/form.css'

export default function AddDebt() {
  return (
    <div>
      <h2>Add Debt</h2>

      <input placeholder="Customer ID" />
      <input type="number" placeholder="Total Amount" />

      <button>Create Debt</button>
    </div>
  )
}