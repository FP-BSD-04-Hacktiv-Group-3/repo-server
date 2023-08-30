const { Order, OrderDetail } = require("../models"); // Import your Sequelize model
const midtransClient = require("midtrans-client");

class ApiController {
  static async midtrans(req, res) {
    try {
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });

      const { orderId: orderId } = req.params; // harusnya order id

      const order = await Order.findOne({
        where: {
          id: orderId,
        },
        include: OrderDetail,
      });

      let amount = 0;
      order.OrderDetails.map((el) => {
        console.log(el.productPrice, "<< price");
        amount = amount + el.productPrice;
      });
      console.log(amount, "<<< ini amout");

      let parameter = {
        transaction_details: {
          order_id: order.id + Math.ceil(Math.random() * 9999999),
          gross_amount: amount, // price nya calculate dari price *  quantity
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "admin",
          //   last_name: "pratama",
          //   email: "admin@example.com",
          //   phone: "08111222333",
        },
      };

      const midtransToken = await snap.createTransaction(parameter); // token ini disimpan ke database
      console.log(midtransToken, "<<<ini midtrans token");
      await Order.update(
        {
          grandTotal: amount,
          transactionId: midtransToken.token,
        },
        {
          where: {
            id: orderId,
          },
        }
      );

      res.status(201).json({
        midtransToken,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}

module.exports = ApiController;
