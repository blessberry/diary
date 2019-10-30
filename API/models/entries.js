import uuid from 'uuid';

class Entry {
	constructor() {
		this.entries = [];
	}
	create(user, info) {
		const entry = {
		  id: uuid.v4(),
	      ...info,
	      createdDate: new Date(),
	      modifiedDate: new Date()
    	};
    	this.entries.push(entry);
	    return entry;
  	}
	read(user, index = null) {
		return index 
				? this.entries.find(i => i.id === index && i.user === user) 
				: this.entries.filter(i => i.user === user);
	}
	update(user, info, index = null) {
		const entry = {
			...info,
			modifiedDate: new Date()
		}
		index 
			? Object.assign(this.entries.find(i => i.id === index && i.user === user), entry) 
			: this.entries.map(i => i.user === user ? Object.assign(i, entry) : i);
	    return index ? this.entries.find(i => i.id == index && i.user === user) : this.entries.filter(i => i.user === user);
	}
	delete(user, index = null) {
		const entry = index ? this.entries.find(i => i.id === index && i.user === user) : this.entries.filter(i => i.user === user);
		index 
			? this.entries.splice(this.entries.findIndex(i => i.id === index && i.user === user), 1)
			: this.entries.map((i, j) => i.user === user ? i.splice(j, 1) : i);
		return entry;
	}
}
export default new Entry();