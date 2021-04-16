document.getElementById('submit').addEventListener('click', function (e) {
	e.preventDefault();

	let form = document.forms[0];
	let userName = form.elements.name.value;
	let userAge = form.elements.age.value;

	let user = JSON.stringify({ userName: userName, userAge: userAge })

	let request = new XMLHttpRequest();

	request.open('post', '/user', true);
	request.setRequestHeader('Content-Type', 'application/json');
	request.addEventListener('load', function () {
		let message = JSON.parse(request.response);
		console.log(message);
	});
	request.send(user)
});
document.getElementById('delete').addEventListener('click', function (e) {
	e.preventDefault();

	let form = document.forms[0];
	let userName = form.elements.name.value;
	let userAge = form.elements.age.value;

	let user = JSON.stringify({ userName: userName, userAge: userAge });

	let requestDelete = new XMLHttpRequest();
	requestDelete.open('delete', '/delete', true);
	requestDelete.setRequestHeader('Content-Type', 'application/json');
	requestDelete.addEventListener('load', function () {
		let message = JSON.parse(requestDelete.response);
		console.log(message);
	});
	requestDelete.send(user);

});