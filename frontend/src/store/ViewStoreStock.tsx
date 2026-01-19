import '../styles/table.css'

const storeGoods = [
  {
    product_name: 'Rice',
    quantity: 10,
    selling_price: 16000
  }
]

export default function ViewStoreStock() {
  return (
    <div>
      <h2>Store Stock</h2>

      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Selling Price</th>
          </tr>
        </thead>
        <tbody>
          {storeGoods.map((g, i) => (
            <tr key={i}>
              <td>{g.product_name}</td>
              <td>{g.quantity}</td>
              <td>{g.selling_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}