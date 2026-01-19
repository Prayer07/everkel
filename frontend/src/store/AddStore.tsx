import '../styles/form.css'

export default function AddStore() {
  return (
    <div>
      <h2>Add Store</h2>

      <input type="text" placeholder="Store Name" />
      <input type="text" placeholder="Store Location" />

      <button>Add Store</button>
    </div>
  )
}