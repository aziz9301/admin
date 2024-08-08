// models/SatuanProduk.js

import mongoose from 'mongoose';

const SatuanProdukSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.models.SatuanProduk || mongoose.model('SatuanProduk', SatuanProdukSchema);
