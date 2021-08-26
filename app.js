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
Object.keys(data).forEach(key => {
    let internalVal = data[key];
    const dep = new Depend();
    Object.defineProperty(data, key, {
        get(){
            dep.store()
            return internalVal
        },
        set(newVal){
            internalVal = newVal
            dep.replay()
        }
    })
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
