const regEx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const isEmpty = (data) => {
	if (data.trim() === '') {
		return true;
	} else {
		return false;
	}
};

const isEmail = (data) => {
	if (!data.match(regEx)) {
		return false;
	} else {
		return true;
	}
};

const isGreater = (data, number) => {
	if (data.length < number) {
		return false;
	} else {
		return true;
	}
};

module.exports = {isEmpty, isEmail, isGreater};
