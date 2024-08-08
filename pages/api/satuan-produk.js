// // pages/api/satuan-produk.js

// import { mongooseConnect } from "@/lib/mongoose";
// import SatuanProduk from '@/models/SatuanProduk';

// export default async function handler(req, res) {
//   await mongooseConnect();

//   const { method } = req;

//   switch (method) {
//     case 'GET':
//       try {
//         const satuanProduk = await SatuanProduk.find({});
//         res.status(200).json(satuanProduk);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     case 'POST':
//       try {
//         const satuanProduk = await SatuanProduk.create(req.body);
//         res.status(201).json(satuanProduk);
//       } catch (error) {
//         res.status(400).json({ success: false });
//       }
//       break;

//     default:
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${method} Not Allowed`);

//   }

// }

import { mongooseConnect } from "@/lib/mongoose";
import SatuanProduk from '@/models/SatuanProduk';

export default async function handler(req, res) {
  await mongooseConnect();

  const { method, query, body } = req;

  switch (method) {
    case 'GET':
      try {
        const satuanProduk = await SatuanProduk.find({});
        res.status(200).json(satuanProduk);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'POST':
      try {
        const satuanProduk = await SatuanProduk.create(req.body);
        res.status(201).json(satuanProduk);
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case 'DELETE':
      try {
        const { id } = query; // Ensure 'id' is fetched correctly from query
        const deletedSatuanProduk = await SatuanProduk.findByIdAndDelete(id);
        if (!deletedSatuanProduk) {
          return res.status(404).json({ success: false, message: 'Satuan produk not found' });
        }
        res.status(200).json({ success: true, data: deletedSatuanProduk });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;


    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
