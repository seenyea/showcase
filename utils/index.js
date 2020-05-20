import Person from 'person/person';

let personList = [];

const create = (o) => {
    const person = new Person(o);
    personList.push(person);
};

const remove = (id) => {
    personList = personList.filter(e => e.id !== id);
}

const update = (o) => {
    const edit = [];
    let person = personList.filter(e => e.id === id);
    person = person ? person[0] : [];
    for(let key in person){
        const oldValue = person[key];
        const newValue = o[key];
        if(oldValue !== o[key]){
            edit.push({key, oldValue, newValue});
            person[key] = newValue;
            continue;
        }
    }
    return edit;
}

const retrieve = () => {
    return personList;
}

export {
    create,
    remove,
    update,
    retrieve
}