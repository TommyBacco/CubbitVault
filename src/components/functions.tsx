import { saveAs } from 'file-saver';
const CryptoJS = require("crypto-js")
const keygen = require("keygenerator");


export function convertWordArrayToUint8Array(wordArray : any) {

    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length), index=0, word, i;
    for (i=0; i<length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
}


export const downloadFile = async () =>{

	const response = await fetch("http://localhost:5000/v1/files")
	const blob = await response.blob();

    var reader = new FileReader();
    reader.onload = () => {
    var key = "WrfU5z8AkC8etxP9BrN1elIblwNkNoun";  

    var decrypted = CryptoJS.AES.decrypt(reader.result, key);               // Decryption: I: Base64 encoded string (OpenSSL-format) -> O: WordArray
    var typedArray = convertWordArrayToUint8Array(decrypted);               // Convert: WordArray -> typed array
    var fileDec = new Blob([typedArray]);
    saveAs(fileDec, "Lola.png");  
}
    reader.readAsText(blob);
}










