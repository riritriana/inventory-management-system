import { Request, Response } from 'express';
import { prisma } from '../utils/client.js';     
import { productSchema } from '../utils/validators.js'; 

// 1. CREATE 
export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.product_name) {
      req.body.product_name = req.body.product_name.charAt(0).toUpperCase() + req.body.product_name.slice(1);
    }
    const validatedData = productSchema.parse(req.body);

    // Simpan ke Database
    const newProduct = await prisma.product.create({
      data: {
        product_name: validatedData.product_name,
        amount: validatedData.amount,
        qty: validatedData.qty
      }
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: newProduct
    });

  } catch (error: any) {
    res.status(400).json({
      success: false,
      // Jika error dari Zod (array), gabungkan pesannya. Jika bukan, pakai message biasa.
      message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : error.message
    });
  }
};

// 2. READ 
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { created_at: 'desc' }
    });

    res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Terjadi kesalahan server" });
  }
};

// 3. UPDATE 
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    const validatedData = productSchema.parse(req.body);

    if (req.body.product_name) {
      req.body.product_name = req.body.product_name.charAt(0).toUpperCase() + req.body.product_name.slice(1);
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        product_name: validatedData.product_name,
        amount: validatedData.amount,
        qty: validatedData.qty
      }
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.errors ? error.errors.map((e: any) => e.message).join(", ") : "Gagal mengupdate (ID tidak ditemukan)"
    });
  }
};

// 4. DELETE 
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.product.delete({
      where: { id: Number(id) }
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Gagal menghapus (ID tidak ditemukan)"
    });
  }
};