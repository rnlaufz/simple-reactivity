const output = document.querySelector(".card__form-container__form__text__result-value");
const input = document.querySelector(".card__form-container__form__input");
const form = document.querySelector(".card__form-container__form");
const initChanger = document.querySelector(".card__description__text__changer-value");
const initConstant = document.querySelector(".card__description__text__constant-value");
const newChanger = document.querySelector(".card__form-container__form__text__new-changer");
const newConstant = document.querySelector(".card__form-container__form__text__new-constant");

let data = {
    constant: 2,
    changer: 10
}
let target, total
class Depend{
    constructor() {
        this.storage = []
    }
    store(){
        if(target && !this.storage.includes(target)){
            this.storage.push(target)
        }
    }
    replay(){
        this.storage.forEach(record => record())
    }
}
let dependencies = new Map();
Object.keys(data).forEach(key => {
  dependencies = dependencies.set(key, new Depend())
});
let savedData = data;
data = new Proxy(savedData,{
    get(obj, key){
        dependencies.get(key).store();
        return obj[key]
    },
    set(obj, key, newValue){
        obj[key] = newValue;
        dependencies.get(key).replay();
        return true
    }
})
function watcher(watcherAction){
    target = watcherAction;
    target()
    target = null;

}
watcher(() => {
    total = data.constant * data.changer;
})
initChanger.innerHTML = data.changer;
initConstant.innerHTML = data.constant;
output.innerHTML = total.toString();
form.addEventListener("submit", (e) => {
    e.preventDefault()
    data.changer = input.value;
    newChanger.innerHTML = data.changer;
    newConstant.innerHTML = data.constant;
    output.innerHTML = total.toString();
});