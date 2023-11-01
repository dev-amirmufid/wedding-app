const WaNumberFormater = (phoneNumber) => {
    if (phoneNumber.startsWith("0")) {
        phoneNumber = `62${phoneNumber.slice(1)}@c.us`;
    } else if (phoneNumber.startsWith("62")) {
        phoneNumber = `${phoneNumber}@c.us`;
    } else {
        phoneNumber = `62${phoneNumber}@c.us`;
    }

    return phoneNumber;
};
export default WaNumberFormater;
