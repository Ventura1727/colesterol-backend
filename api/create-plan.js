import mercadopago from "mercadopago";

// Configura o token do Mercado Pago a partir da variável de ambiente
mercadopago.configurations.setAccessToken(process.env.MP_ACCESS_TOKEN);

export default async function handler(req, res) {
  // Permite apenas POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Dados do plano
    const planData = {
      reason: "Assinatura Colesterol Control",
      auto_recurring: {
        frequency: 1,
        frequency_type: "months",
        transaction_amount: 100,
        currency_id: "BRL",
        start_date: new Date().toISOString()
      },
      back_url: "https://colesterol-control-final.vercel.app",
      status: "active"
    };

    // Cria o plano
    const plan = await mercadopago.preapproval.create(planData);

    // Retorna resultado
    res.status(200).json(plan);
  } catch (error) {
    console.error("Erro ao criar plano:", error);
    res.status(500).json({ error: error.message });
  }
}
