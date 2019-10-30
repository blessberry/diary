import uuid from 'uuid';

class User {
	constructor() {
		this.users = [];
	}
	create(info) {
		const user = {
		  id: uuid.v4(),
	      ...info,
	      createdDate: new Date(),
	      modifiedDate: new Date()
    	};
    	this.users.push(user);
	    return user;
  	}
	read(index) {
		return index ? this.users.find(i => i.id === index) : this.users;
	}

	update(info, index = null) {
		const user = {
			...info,
			modifiedDate: new Date()
		}
		index 
			? Object.assign(this.users.find(i => i.id === index), user) 
			: this.users.map(i => Object.assign(i, user));
	    return index ? this.users.find(i => i.id == index) : this.users;
	}
	delete(index = null) {
		const user = index ? this.users.find(i => i.id === index) : this.users;
		index 
			? this.users.splice(this.users.findIndex(i => i.id === index), 1)
			: this.users.length = 0;
		return user;
	}
	email(email) {
		return this.users.find(i => i.email === email);

	}
	user(id) {
		return this.users.find(i => i.id === id);
	}
}
export default new User();