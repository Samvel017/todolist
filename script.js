let todoInput = document.querySelector('.todo-input');
let todoList = document.querySelector('.todo-list');
let addBtn = document.querySelector('.addTodo');
let removeBtn = document.querySelector('.removeTodo');

let list = [];
todoInput.addEventListener('keyup', (e) => {
  if (e.keyCode == '13') {
    addBtn.click();
  }
});

addBtn.addEventListener('click', () => {
  if (todoInput.value != '') {
    let object = {
      title: '',
      important: false,
    };
    object.title = todoInput.value;
    list.push(object);
    let listBlock = document.createElement('div');
    listBlock.classList.add('todo-block');
    listBlock.innerHTML = `
    <div class="todo-text">
      <span>${object.title}</span>
    </div>  
    <div class="todo-block-btn">
      <button class="btn removeItem">Remove</button>
      <button class="btn impBtn">Important</button>
    </div>
    `;
    todoList.append(listBlock);
    let removeItem = listBlock.querySelector('.removeItem');
    let important = listBlock.querySelector('.impBtn');
    myFunction(x);
    removeItem.addEventListener('click', () => {
      listBlock.remove();
      let index = list.indexOf(object);
      if (index != '-1') {
        list.splice(index, 1);
      }
      console.log(list);
    });
    important.addEventListener('click', () => {
      listBlock.classList.toggle('important');
      if (object.important == false) {
        object.important = true;
        let ind = list.indexOf(object);
        let obj = object;
        let arr = [obj];
        list.splice(ind, 1);
        list = arr.concat(list);
        let blockTop = listBlock;
        listBlock.remove();
        todoList.prepend(blockTop);
        console.log(list);
      } else {
        object.important = false;
        let ind = list.indexOf(object);
        let obj = object;
        let arr = [obj];
        list.splice(ind, 1);
        list = list.concat(arr);
        let blockTop = listBlock;
        listBlock.remove();
        todoList.append(blockTop);
        console.log(list);
      }
    });
    console.log(list);
    todoInput.value = '';
  } else {
    alert('Please fill input.');
  }
});

removeBtn.addEventListener('click', () => {
  list = [];
  let todoChilds = todoList.querySelectorAll('.todo-block');
  todoChilds.forEach((e) => {
    e.remove();
  });
  console.log(list);
});

function myFunction(x) {
  if (x.matches) {
    addBtn.innerHTML = `<i class="fas fa-plus"></i>`;
    removeBtn.innerHTML = `<i class="fas fa-times"></i>`;
    let btns = document.querySelectorAll('.btn');
    btns.forEach((e) => {
      if (e.getAttribute('class') == 'btn removeItem') {
        e.innerHTML = `<i class="fas fa-times"></i>`;
      } else if (e.getAttribute('class') == 'btn impBtn') {
        e.innerHTML = `<i class="fas fa-star"></i>`;
      }
    });
  } else {
    addBtn.innerHTML = 'Add';
    removeBtn.innerHTML = 'Remove All';
    let btns = document.querySelectorAll('.btn');
    btns.forEach((e) => {
      if (e.getAttribute('class') == 'btn removeItem') {
        e.innerHTML = `Remove`;
      } else if (e.getAttribute('class') == 'btn impBtn') {
        e.innerHTML = `Important`;
      }
    });
  }
}

var x = window.matchMedia('(max-width: 940px)');
myFunction(x);
x.addListener(myFunction);
