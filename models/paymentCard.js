class PaymentCard {
  constructor(id, cardnumber, expiration, securityCode, zipcode) {
    this.id = id;
    this.cardnumber = cardnumber;
    this.expiration = expiration;
    this.securityCode = securityCode;
    this.zipcode = zipcode;
  }
}

export default PaymentCard;
