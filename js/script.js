// функция которая обрабатывает и сравнивает по типу все введенные данные результат необходимые по типу значения
const filterByType = (type, ...values) => values.filter(value => typeof value === type),
//вызывается в строке 13
	hideAllResponseBlocks = () => {
		//в переменную выводит диалоговое окно резултата
		const responseBlocksArray = Array.from(document.querySelectorAll('div.dialog__response-block'));
		//перебирает и чистит все окна
		responseBlocksArray.forEach(block => block.style.display = 'none');
	},
//функция выводит сам результат используя 3 аргумента
	showResponseBlock = (blockSelector, msgText, spanSelector) => {
		//вызов функции строка 4
		hideAllResponseBlocks();
		//после очистик окна результата нужному окну по параметру blockSelector делаем его блочным
		document.querySelector(blockSelector).style.display = 'block';
		// в случаи если есть параметра spanSelector  выполняем условие
		if (spanSelector) {
			// результат и сам параметр msgText вывадим на экран
			document.querySelector(spanSelector).textContent = msgText;
		}
	},
//вызывается строка 46 в случаи ошибка, и вызывает функцию которая будет выводть пользователю сам результат, 
// с 3 параметрами: класс окна куда будет выводится резултат, сам результат, id  
	showError = msgText => showResponseBlock('.dialog__response-block_error', msgText, '#error'),
//вызывается в строке 41 с парамметрами результата фильтрации, и вызывает функцию которая будет выводть пользователю сам результат, 
// с 3 параметрами: класс окна куда будет выводится резултат, сам результат, id  
	showResults = msgText => showResponseBlock('.dialog__response-block_ok', msgText, '#ok'),
//вызывается в строке 63 в случаи если строка пустая
	showNoResults = () => showResponseBlock('.dialog__response-block_no-results'),
//функция с 2мя параметрами, вызывается в 69 строке
	tryFilterByType = (type, values) => {
		//проверка на ошибки
		try {
			//переменная в которой формируется сообщение из веденных параметров от ползователся с учетом запято и пробел обращаясь с функции 2 строка
			const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
			//после того как прошла фильтрация во 2 строке и результат пришел в 33 строку valuesArray проверятся условие о нличие в valuesArray значение
			const alertMsg = (valuesArray.length) ?
			// если есть в valuesArray значение формируется сообщение
				`Данные с типом ${type}: ${valuesArray}` :
				//если нет то такое сообщение
				`Отсутствуют данные типа ${type}`;
				//после вызывается функция 25 строки с результатом из функции alertMsg
			showResults(alertMsg);
			//событие кетч для отлавливае ошибки в случаеи если в результате отработки функций try произошла ошибка, например при филтрации и сопоставлении значений найден не известный тип значения
		} catch (e) {
			//вызов функции строка 23 с резултатом с польным описание ошибки
			showError(`Ошибка: ${e}`);
		}
	};
//получаем с DOM кнопку фильтр
const filterButton = document.querySelector('#filter-btn');
//навешиваем событие накнопку фильтр с использование параметром event
filterButton.addEventListener('click', e => {
	//по id получаем с  DOM импут с выпадающими вариантам ответами типы данных
	const typeInput = document.querySelector('#type');
	//импут с данными от пользователся
	const dataInput = document.querySelector('#data');
//условие при которых отсутсвуют вводимые варианты от пользователя
	if (dataInput.value === '') {
		//в импуте пользователя в случаи если сообщение пустое о том что оно не должно быть пустым
		dataInput.setCustomValidity('Поле не должно быть пустым!');
		//вызов функции 25 строка
		showNoResults();
		// а то
	} else {
//в импуте пользователся сообщение не появляется
		dataInput.setCustomValidity('');
		//отмена стандарного событие на кнопке фильтр
		e.preventDefault();
		//вызов функцию с 2 параметрами значение из 2х полученных импутов без пробелов до и после вводимого слова или значения
		tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
	}
});

