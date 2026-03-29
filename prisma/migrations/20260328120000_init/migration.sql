-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending_payment', 'confirmed', 'shipped', 'cancelled');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('cod', 'razorpay');

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "subtotalPaise" INTEGER NOT NULL,
    "discountTotalPaise" INTEGER NOT NULL,
    "totalPaise" INTEGER NOT NULL,
    "razorpayOrderId" TEXT,
    "razorpayPaymentId" TEXT,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "shippingLine1" TEXT NOT NULL,
    "shippingLine2" TEXT,
    "shippingCity" TEXT NOT NULL,
    "shippingState" TEXT NOT NULL,
    "shippingPincode" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "productSlug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitPricePaise" INTEGER NOT NULL,
    "originalPricePaise" INTEGER,
    "discountPercent" INTEGER,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
