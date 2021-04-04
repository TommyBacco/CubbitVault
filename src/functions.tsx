

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


export function decipherCubbit(key:string, message:string, plain:boolean):string{

	if(plain){

		const keySize = key.length
		const chunks = message.match(new RegExp('.{1,' + keySize + '}', 'g'))
		let finalChunks: string[] = [] 

		const shift : number = (()=> {

			var n = 0;

			for(var i in key.split("")){
				var dec = key.charCodeAt(+i)
				n += dec
			}

			return n
		})();

		for( var i in chunks){
			
		    const revChunk = reverseString(chunks[+i])
		    const revShiftedChunk = (()=>{

		    	var tempChunk : string[] = []
				for(var j in revChunk.split("")){
					const currentDecimal = revChunk.charCodeAt(+j)
					var newPosition = currentDecimal - (shift%(125-32+1))
					if(newPosition<32){
						const shiftFromEnd = 32 - newPosition
						newPosition = (125+1) - shiftFromEnd
					}
					tempChunk.push(String.fromCharCode(newPosition))
				}
				return (tempChunk.join(""))
			})();

			const finalChunk = reverseString(revShiftedChunk)
			finalChunks.push(finalChunk)
		}

		return finalChunks.join("")
		
	}else{return message}
}


function reverseString  (text : string) : string {
	return(text.split("").reverse().join(""))
}




