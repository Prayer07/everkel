// import { useEffect, useState } from "react"
// import { api } from "../lib/api"
// import { Card } from "../components/ui/card"
// import CreateStoreDialog from "../components/CreateStoreDialog"
// import EditStoreDialog from "../components/EditStoreDialog"
// import DeleteStoreButton from "../components/DeleteStoreButton"

// export default function Stores() {
//   const [stores, setStores] = useState<any[]>([])

//   useEffect(() => {
//     api.get("/store").then(res => setStores(res.data))
//   }, [])

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-[#3e2f25]">
//           Stores
//         </h2>

//         <CreateStoreDialog
//           onCreated={store => setStores(prev => [store, ...prev])}
//         />
//       </div>

//       <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
//         {stores.map(store => (
//           <Card key={store.id} className="p-4 space-y-2">
//             <h3 className="font-medium">
//               {store.name}
//             </h3>

//             <p className="text-sm text-muted-foreground">
//               {store.location}
//             </p>

//             <div className="flex gap-2">
//               <EditStoreDialog
//                 store={store}
//                 onUpdated={updated =>
//                   setStores(prev =>
//                     prev.map(s => (s.id === updated.id ? updated : s))
//                   )
//                 }
//               />

//               <DeleteStoreButton
//                 storeId={store.id}
//                 onDeleted={() =>
//                   setStores(prev =>
//                     prev.filter(s => s.id !== store.id)
//                   )
//                 }
//               />
//             </div>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }