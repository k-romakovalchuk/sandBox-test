import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Отримати загальну кількість всіх товарів на всіх складах
export const countAllProducts = async () => {
  const totalProducts = await prisma.stock.aggregate({
    _sum: {
      quantity: true
    }
  });
  return totalProducts?._sum?.quantity || 0;
};

// Отримати товари на певному складі
export const getProductsOnStock = async (uuid: string) => {
  return await prisma.stock.findMany({
    where: {
      warehouse: {
        uuid
      }
    },
    include: {
      product: true
    }
  });
};

// Отримати кількість товару на всіх складах
export const countProduct = async (sku: string) => {
  const totalQuantity = await prisma.stock.aggregate({
    _sum: {
      quantity: true
    },
    where: {
      product: {
        sku
      }
    }
  });
  return totalQuantity?._sum?.quantity || 0;
};

// Отримати кількість товару на певному складі
export const countProductOnStock = async (uuid: string, sku: string) => {
  const productQuantity = await prisma.stock.findFirst({
    where: {
      warehouse: {
        uuid
      },
      product: {
        sku
      }
    }
  });
  return productQuantity?.quantity || 0;
};

// Отримати кількість продуктів за категорією
export const countProductByCategory = async (slug: string) => {
  const totalQuantity = await prisma.stock.aggregate({
    _sum: {
      quantity: true
    },
    where: {
      product: {
        categories: {
          some: {
            slug
          }
        }
      }
    }
  });
  return totalQuantity?._sum?.quantity || 0;
};

// Отримати кількість продуктів на певному складі за категорією
export const countProductOnStockByCategory = async (uuid: string, slug: string) => {
  const productQuantity = await prisma.stock.aggregate({
    _sum: {
      quantity: true
    },
    where: {
      warehouse: {
        uuid
      },
      product: {
        categories: {
          some: {
            slug
          }
        }
      }
    }
  });
  return productQuantity?._sum?.quantity || 0;
};