import uuid from 'uuid';

class Entry {
	constructor() {
		this.entries = [];
	}
	//add entries method is this
	create(info, user) {
		const entry = {
		  id: uuid.v4(),
	      ...info,
	      createdDate: new Date(),
	      modifiedDate: new Date()
    	};
    	this.entries.push(entry);
	    return entry;
  	}
	read(index = null) {
		return index ? this.entries.find(i => i.id === index) : this.entries;
	}

	update(info, index = null) {
		const entry = {
			...info,
			modifiedDate: new Date()
		}
		index 
			? Object.assign(this.entries.find(i => i.id === index), entry) 
			: this.entries.map(i => Object.assign(i, entry));
	    return index ? this.entries.find(i => i.id == index) : this.entries;
	}
	delete(index = null) {
		const entry = index ? this.entries.find(i => i.id === index) : this.entries;
		index 
			? this.entries.splice(this.entries.findIndex(i => i.id === index), 1)
			: this.entries.length = 0;
		return entry;
	}
}
export default new Entry();