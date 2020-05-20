let PERSION_ID_COUNT = 0;
const names = ['Ada Smith', 'Tony Hu'];
const locations = ['XXX YY', 'YY ZZ'];
const offcies = ['B-101', 'C-102'];
const offcieNumbers = ['086-233-33333', '086-233-33333'];
const cellNumbers = ['1343333333333', '122233333333'];
export default class Person{
    constructor(o){
        const int = parseInt(Math.random() * 2)
        const { 
            key = `${++PERSION_ID_COUNT}`, 
            id = '',
            name = names[int], 
            location = locations[int], 
            offcie = offcies[int],
            offcieNumber = offcieNumbers[int],
            cellNumber = cellNumbers[int]
        } = o;
        
        this.key = key;
        this.id = id;
        this.name = name;
        this.location = location;
        this.offcie = offcie;
        this.offcieNumber = offcieNumber;
        this.cellNumber = cellNumber;
    }
}