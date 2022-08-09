const CardPurchases = ({ datePurchase }) => {
  const date = new Date(datePurchase);

  return (
    <div>
      <h1 className="date">{date.toLocaleDateString()}</h1>
    </div>
  );
};

export default CardPurchases;
