const body = document.querySelector("body")!
const themeBtn = <HTMLButtonElement>document.querySelector(".themeBtn")!
const bannerImg = <HTMLImageElement>document.querySelector(".banner-img")!
const todoForm = <HTMLFormElement>document.querySelector("#todo-form")!
const inputField = <HTMLInputElement>document.querySelector(".text-field")!
const listContainer = <HTMLDivElement>document.querySelector(".list-container")!
const noOfCompleted = <HTMLParagraphElement>document.querySelector(".no-of-completed")!
const todoBtn = <HTMLButtonElement[]>Array.from(document.querySelectorAll(".todo-btn")!)
const clearBtn = <HTMLButtonElement>document.querySelector(".clear-btn")!
const sunIcon = '<img src="images/icon-sun.svg" alt="sun"/>'
const moonIcon = '<img src="images/icon-moon.svg" alt="moon"/>'
const lightImg = "./images/bg-desktop-light.jpg";
const darkImg = "./images/bg-desktop-dark.jpg";


themeBtn.addEventListener("click",() => {
    if(body.classList.contains("dark")){
        body.classList.remove("dark");
        themeBtn.innerHTML = moonIcon;
        bannerImg.src = lightImg
    }else{
        body.classList.add("dark")
        themeBtn.innerHTML = sunIcon
        bannerImg.src = darkImg;
    }
})

interface listitemType{
    readonly value:string;
    checkBox?: HTMLInputElement;
    isChecked?:boolean;
}

const TodosList:object[] = []

class ListItem{
    constructor(
        private container: HTMLDivElement,
        readonly value: string,
        readonly canCheck:boolean,
        public checkValue? :boolean
    ){}
    create():{li:HTMLLIElement,input:HTMLInputElement,img:HTMLImageElement}{

        const li = document.createElement("li");
        li.classList.add("list-item","group");
        const div = document.createElement("div");
        div.classList.add("flex","gap-5","items-center")
        li.append(div)

        const img = document.createElement("img");
        img.src = "./images/icon-cross.svg";
        img.role = "button";
        img.alt = "Delete Button";
        img.classList.add('md:opacity-0', 'transition', 'ease-in-out', 'duration-200', 'group-hover:opacity-100', 'opacity-100')
        li.append(img);

        const input = document.createElement("input");
        input.type = "checkbox";
        input.classList.add("check-field","peer");
        typeof this.checkValue === "boolean"? input.checked = this.checkValue:false
        this.canCheck? input.classList.add("show"):input.classList.add("hidden")
        div.append(input);

        const p = document.createElement("p");
        p.classList.add('peer-checked:text-gray-400', 'peer-checked:line-through', 'transition-all', 'text-nowrap', 'overflow-hidden', 'md:w-96', 'w-48')
        p.innerText = this.value
        div.append(p)

        return {
            li:li,
            input:input,
            img:img
        }
    }
    render():object{
        const listReturn = this.create()
        this.container.append(listReturn.li)
        let listValues:listitemType = {
            value:this.value,
            checkBox:listReturn.input,
            isChecked:false
        }
        listReturn.img.addEventListener("click",() => {
            this.container.removeChild(listReturn.li)
            let index = TodosList.indexOf(listValues)
            if(index){
                TodosList.splice(index,1)
            }
        })
        listReturn.input.addEventListener("click",() => {
            listValues.isChecked = listReturn.input.checked
        })
        return listValues
    }
}
const returnNoOfCompleted = ():number => {
    let newTodoList:object[] = []
    TodosList.forEach((Todo) => {
        (Todo as listitemType).isChecked ? null:newTodoList.push(Todo)
    })
    return newTodoList.length
}

todoForm.addEventListener("keypress",(e) => {
    if((e as KeyboardEvent).key === "Enter"){
        e.preventDefault()
        const item = new ListItem(listContainer,inputField.value,true)
        TodosList.push(item.render())
        inputField.value = ""
        noOfCompleted.innerText = `${returnNoOfCompleted()} items left`
    }
})
listContainer.addEventListener("input",() => {
    noOfCompleted.innerText = `${returnNoOfCompleted()} items left`
    TodosList
})

const renderDom = () => {
    
}

todoBtn.forEach((btn) => {
    btn.addEventListener("click",() => {
        todoBtn.forEach((btn) => {
            (btn.classList.contains("active"))? btn.classList.remove("active"):null
        })
        btn.classList.add("active")
        if(btn.innerText === "Active"){
            listContainer.innerHTML = ""
            TodosList.forEach((todo) => {
                if((todo as listitemType).isChecked === false){
                    const item = new ListItem(listContainer,(todo as listitemType).value,false)
                    item.render()
                }
            })
        }else if(btn.innerText === "All"){
            listContainer.innerHTML = ""
            TodosList.forEach((todo) => {
                const item = new ListItem(listContainer,(todo as listitemType).value,true,(todo as listitemType).isChecked)
                item.render()
            })
        }else{
            listContainer.innerHTML = ""
            TodosList.forEach((todo) => {
                if((todo as listitemType).isChecked === true){
                    const item = new ListItem(listContainer,(todo as listitemType).value,false)
                    item.render()
                }
            })
        }
    })
})

clearBtn.addEventListener("click",() => {
    TodosList.forEach((todo) => {
        if((todo as listitemType).isChecked === true){
            let index = TodosList.indexOf(todo);
            TodosList.splice(index,1)
        }
    })
    clearBtn.innerText = "Cleared"
    clearBtn.classList.add("text-blue-600","transition")
})
