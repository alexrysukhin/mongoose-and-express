const express = require('express');
const app = express();
const jsonParser = express.json();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static('public'));


let url = 'mongodb://127.0.0.1:27017/street-fighters';
mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true }, function () {
	app.listen(3000, function () { return console.log('Server starded at port 3000') })
});


let userSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	age: {
		type: Number,
		required: true
	}

});
let User = mongoose.model('users', userSchema);


app.get('/', function (request, response) {

	response.render('home');

});

app.get('/about', function (request, response) {

	response.render('about');

});

app.get('/contact', function (request, response) {

	response.render('contact', {
		email: 'asfsafas@.com',
		phone: '218713857'
	});

});


app.get('/users', function (request, response) {
	User.find({}, function (err, users) {
		if (err) return console.log(err);
		else if (users.length) {
			response.render('users', {
				title: 'Список пользователей',
				users: users,
				availabilityOfUsers: true,
			})
		}
		else if (users.length <= 0) {
			response.render('users', {
				title: 'Список пользователей пуст',
				users: users,
				availabilityOfUsers: false
			})
		}
	});
})


app.get('/form', function (request, response) {
	response.render('form');
});

app.post('/user', jsonParser, function (request, response) {
	if (!request.body) return console.log('Ошибочка');
	User.create({ name: request.body.userName, age: request.body.userAge }, function (err) {
		if (err) return console.log(err);
	});
	response.json('Хорошо')
});

app.delete('/delete', jsonParser, function (request, response) {
	if (!request.body) console.log('Отсуцтвует тело запроса.')

	User.deleteOne({ name: request.body.userName, age: request.body.userAge }, function (err, result) {
		if (err) console.log(err);
		if (result.deletedCount >= 1) {
			response.json('Пользователь удален');
		}
		else if (result.deletedCount <= 0) {
			response.json('Нет такого пользователя.')
		}
	});
});








