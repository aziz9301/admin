// // pages/satuan-produk.js

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import toast from 'react-hot-toast';

// export default function SatuanProdukPage() {
//   const [satuanProduk, setSatuanProduk] = useState([]);
//   const [newSatuan, setNewSatuan] = useState('');

//   useEffect(() => {
//     fetchSatuan();
//   }, []);

//   function fetchSatuan() {
//     axios.get('/api/satuan-produk').then((response) => {
//       setSatuanProduk(response.data);
//     });
//   } 

//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Manage Satuan Produk</h1>
//       <div className="flex gap-2 mb-4">
//         <input
//           type="text"
//           className="flex-1 rounded-md border-gray-300 shadow-sm p-3"
//           placeholder="New Satuan"
//           value={newSatuan}
//           onChange={(e) => setNewSatuan(e.target.value)}
//         />
//         <button
//           className="rounded-md bg-blue-500 text-white px-4 py-2"
//           onClick={addSatuanProduk}
//         >
//           Add
//         </button>
//       </div>

//       <ul className="list-disc pl-5">
//         {satuanProduk.map((satuan) => (
//           <li key={satuan._id}>{satuan.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

function ConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this satuan?</p>
        <div className="mt-4 flex justify-end gap-2">
          <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SatuanProdukPage() {
  const [satuanProduk, setSatuanProduk] = useState([]);
  const [newSatuan, setNewSatuan] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedSatuanId, setSelectedSatuanId] = useState(null);

  useEffect(() => {
    fetchSatuan();
  }, []);

  function fetchSatuan() {
    axios.get('/api/satuan-produk').then((response) => {
      setSatuanProduk(response.data);
    });
  }

  const addSatuanProduk = async () => {
    try {
      const response = await axios.post('/api/satuan-produk', { name: newSatuan });
      setSatuanProduk([...satuanProduk, response.data]);
      setNewSatuan('');
      toast.success('Satuan added successfully!');
    } catch (error) {
      console.error('Error adding satuan:', error);
      toast.error('Failed to add satuan');
    }
  };

  const handleDeleteSatuan = async () => {
    try {
      if (!selectedSatuanId) return;

      await axios.delete(`/api/satuan-produk?id=${selectedSatuanId}`);

      const filteredSatuanProduk = satuanProduk.filter((satuan) => satuan._id !== selectedSatuanId);
      setSatuanProduk(filteredSatuanProduk);
      setShowModal(false);
      toast.success('Satuan deleted successfully!');
    } catch (error) {
      console.error('Error deleting satuan:', error);
      toast.error('Failed to delete satuan');
    }
  };

  const openModal = (satuanId) => {
    setSelectedSatuanId(satuanId);
    setShowModal(true);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Satuan Produk</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="flex-1 rounded-md border-gray-300 shadow-sm p-3"
          placeholder="New Satuan"
          value={newSatuan}
          onChange={(e) => setNewSatuan(e.target.value)}
        />
        <button className="rounded-md bg-blue-500 text-white px-4 py-2" onClick={addSatuanProduk}>
          Add
        </button>
      </div>
      <div className="overflow-x-auto mx-auto p-4">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md border rounded">
          <thead>
            <tr>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                No
              </th>
              <th className="whitespace-nowrap px-4 py-2 text-gray-900 text-start font-bold">
                Satuan
              </th>
              <th className="px-4 py-2 whitespace-nowrap text-gray-900 text-start font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {satuanProduk.map((satuan, index) => (
              <tr key={satuan._id} className="divide-y divide-gray-200">
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {satuan.name}
                </td>
                <td className="px-4 py-2 whitespace-nowrap">
                  <button
                    className="flex-1 rounded-lg border border-red-500 bg-red-500 px-4 py-2 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-red-700 hover:bg-red-700 focus:ring focus:ring-red-200 disabled:cursor-not-allowed disabled:border-red-300 disabled:bg-red-300"
                    onClick={() => openModal(satuan._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDeleteSatuan}
      />
    </div>
  );
}
