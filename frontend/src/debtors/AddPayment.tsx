import '../styles/form.css'

export default function AddPayment() {
  return (
    <div>
      <h2>Add Payment</h2>

      <input placeholder="Debt ID" />
      <input type="number" placeholder="Amount Paid" />

      <button>Add Payment</button>
    </div>
  )
}