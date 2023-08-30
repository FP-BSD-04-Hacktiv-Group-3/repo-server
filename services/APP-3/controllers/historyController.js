const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const xendit = require("xendit-node");
const Xendit = new xendit({
  secretKey:
    "xnd_development_pJ3nd5VBPPdMQccAiC2dUZngOxoaEDJdjUFRN5eVVWTtAymO5KFOwhwxVVHSWP",
});

const { Invoice } = Xendit;
const invoice = new Invoice();

class HistoryController {
  static async create(request, response, next) {
    const { id: cartId } = request.params;
    const { email, id, totalPrice, title } = request.body;

    // const data = await prisma.cart.find

    const data = await invoice.createInvoice({
      externalID: "external_id_here",
      payerEmail: email,
      description: title,
      amout: totalPrice,
    });
    console.log(data);
  }
}

module.exports = HistoryController;
