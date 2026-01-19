import '../styles/form.css'

export default function AddCustomer() {
  return (
    <div>
      <h2>Add Customer</h2>

      <input placeholder="Full Name" />
      <input placeholder="Phone" />
      <input placeholder="Address" />

      <button>Add Customer</button>
    </div>
  )
}