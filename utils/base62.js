const alphabet =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  
export function encodeBase62(value) {
    let number = BigInt(value);

    if (number === 0n) {
        return "0";
    }

    let result = "";

    while (number > 0n) {
        result = alphabet[Number(number % 62n)] + result;
        number /= 62n;
    }

    return result;
}