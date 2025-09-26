export const getNotifications = (req, res) => {
  const notifications = [
    {
      type: "order",
      title: "Order Confirmed",
      message: "Order #12345 has been confirmed.",
    },
    {
      type: "inventory",
      title: "Low Inventory",
      message: "Tomato Seeds are low in stock.",
    },
    {
      type: "error",
      title: "System Error",
      message: "Payment gateway failed temporarily.",
    },
  ];

  res.json(notifications);
};
