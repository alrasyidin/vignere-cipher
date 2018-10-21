function isUppercase(c) {
	return 65 <= c && c <= 90;  // 65 is character code for 'A'. 90 is 'Z'.
}

// Tests whether the specified character code is a lowercase letter.
function isLowercase(c) {
	return 97 <= c && c <= 122;  // 97 is character code for 'a'. 122 is 'z'.
}

function crypt(input, key) {
	let output = "";
	input = input.toString();
	key  = key.toString();
	// console.log(input)
	for (let i = 0, j = 0; i < input.length; i++) {
		let c = input.charCodeAt(i);
		let k = key[j % key.length].charCodeAt();

		if (isUppercase(c)) {
			output += String.fromCharCode((c - 65 + k - 65) % 26 + 65);
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 + k - 97) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}

function decrypt(input, key){
	let output = "";
	input = input.toString();
	key  = key.toString();
	// console.log(input)
	for (let i = 0, j = 0; i < input.length; i++) {
		let c = input.charCodeAt(i);
		let k = key[j % key.length].charCodeAt();
		let hitungChar = c - 65 - (k - 65);
		if (isUppercase(c)) {
			if (hitungChar < 0) {
				output += String.fromCharCode(c - 65 - (k - 65) + 26 + 65);
			} else {
				output += String.fromCharCode(Math.abs(c - 65 - (k - 65)) % 26 + 65);	
			}
				
			j++;
		} else if (isLowercase(c)) {
			output += String.fromCharCode((c - 97 - k - 97) % 26 + 97);
			j++;
		} else {
			output += input.charAt(i);
		}
	}
	return output;
}

function showAlert(msg, color){
		const div = document.createElement('div');
		div.className = `alert ${color}`;
		div.textContent = msg;
		container.insertBefore(div, document.forms[0]);

		setTimeout(function(){
			div.remove();
		}, 2000);
}

let container = document.querySelector('.container');
let encryptBtn = document.querySelector('.encrypt');
let decryptBtn = document.querySelector('.decrypt');

decryptBtn.disabled = true;
encryptBtn.addEventListener('click', function(e){
	// console.log('lastModified')
	let plainText = document.querySelector('#message'),
		key = document.querySelector('#key');
		
	
	if (plainText.value === '' || key.value === '') {
		showAlert('Input tidak boleh kosong', 'error');
	} else {
		let crypto = crypt(plainText.value, key.value);

		showAlert('Berhasil mengenskripsi plaintext', 'success');
		
		plainText.value = crypto;
		encryptBtn.disabled = true;
		decryptBtn.disabled = false;
	}

	e.preventDefault();
});

decryptBtn.addEventListener('click', function(e){
	// console.log('lastModified')
	let plainText = document.querySelector('#message'),
		key = document.querySelector('#key');

	if (plainText.value === '' || key.value === '') {
		showAlert('Input tidak boleh kosong', 'error');
	} else {
		// console.log(plainText.value, key.value);
		let decrypto = decrypt(plainText.value, key.value);

		showAlert('Berhasil mendeskripsi plaintext', 'success');
		
		plainText.value = decrypto;
		encryptBtn.disabled = false;
		decryptBtn.disabled = true;
	}

	e.preventDefault();
});