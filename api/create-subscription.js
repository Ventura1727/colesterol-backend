import mercadopago from "mercadopago";

// Inicializa o SDK
mercadopago.configurations.setAccessToken(process.env.MERCADO_PAGO_TOKEN);

export default async function handler(req, res) {
  try {
    const { plan_id, payer_email } = req.body;

    const subscriptionData = {
      preapproval_plan_id: plan_id,
      payer_email: payer_email,
      back_url: "https://seu-app.com/success"
    };

    const response = await mercadopago.preapproval.create(subscriptionData);
    res.status(200).json(response.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
