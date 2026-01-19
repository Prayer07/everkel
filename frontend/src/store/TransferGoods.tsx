import '../styles/form.css'

export default function TransferGoods() {
  return (
    <div>
      <h2>Transfer Goods (Warehouse → Store)</h2>

      <input placeholder="Warehouse ID" />
      <input placeholder="Store ID" />
      <input placeholder="Product Name" />
      <input type="number" placeholder="Quantity" />

      <button>Transfer</button>
    </div>
  )
}