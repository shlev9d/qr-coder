const wrapper = document.querySelector('.wrapper')
const form = wrapper.querySelector('form')
const fileInput = form.querySelector('input')
const infoText = form.querySelector('p')
const copyBtn = wrapper.querySelector('.copy')
const clearBtn = wrapper.querySelector('.close')

function fetchRequest(formData, file) {
	infoText.innerText = 'scanning qr...'
	fetch('http://api.qrserver.com/v1/read-qr-code/', {
		method: 'POST',
		body: formData,
	})
		.then(res => res.json())
		.then(result => {
			result = result[0].symbol[0].data
			wrapper.querySelector('textarea').innerHTML = result
			form.querySelector('img').src = URL.createObjectURL(file)
			infoText.innerText = 'scan qr-code'
			wrapper.classList.add('active')
		})
}


fileInput.addEventListener('change', e => {
  let file = e.target.files[0]
  if(!file) return
	let formData = new FormData()
	formData.append('file', file)
	fetchRequest(formData, file)
})

copyBtn.addEventListener('click', () => {
  let text = wrapper.querySelector('textarea').textContent
	navigator.clipboard.writeText(text)
})

form.addEventListener('click', () => fileInput.click())

clearBtn.addEventListener('click', () => {
  wrapper.classList.remove('active')
})
