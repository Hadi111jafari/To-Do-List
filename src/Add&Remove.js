/* eslint-disable no-loop-func */
let List = [];
let isEditing = false;
let todoEdit = null;

const store = () => {
  localStorage.setItem('todoslist', JSON.stringify(List));
};

const getStore = () => {
  const storeData = JSON.parse(localStorage.getItem('todoslist'));
  if (storeData == null) {
    List = [];
  } else {
    List = storeData;
  }
};

const editTodo = (todo) => {
  isEditing = true;
  todoEdit = todo;
  const detail = document.querySelector('.taskList');
  detail.value = todo.description;
  detail.focus();
};

const delTodo = (indexID) => {
  List = List.filter((ind) => ind.index !== indexID);
  List = List.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
  // eslint-disable-next-line no-use-before-define
  display();
};

const toggleToDoStatus = (todo) => {
  List = List.map((todoItem) => {
    if (todoItem.index === todo.index) {
      return { ...todo, completed: !todo.completed };
    }
    return todoItem;
  });
  store();
};

const clearCheckBox = () => {
  const completedTodoList = List.filter((todo) => todo.completed);
  completedTodoList.forEach((todoItem) => {
    todoItem.completed = false;
  });
  store();
};

const clearCompletedList = () => {
  List = List.filter((todo) => !todo.completed);
  List = List.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
  store();
  // eslint-disable-next-line no-use-before-define
  display();
};

const display = () => {
  const todoslist = document.querySelector('.todo-list');
  todoslist.innerHTML = '';

  for (let i = 0; i < List.length; i += 1) {
    const todoLi = document.createElement('li');
    todoLi.classList.add('item');

    const ContentEl = document.createElement('div');
    ContentEl.classList.add('content');

    const CheckboxEl = document.createElement('input');
    CheckboxEl.setAttribute('type', 'checkbox');
    CheckboxEl.setAttribute('name', 'checkbox');
    CheckboxEl.setAttribute('value', List[i].index);
    CheckboxEl.checked = List[i].completed;

    const DescriptionEl = document.createElement('p');
    DescriptionEl.innerText = List[i].description;

    CheckboxEl.addEventListener('change', () => {
      if (CheckboxEl.checked) {
        DescriptionEl.classList.add('strike');
      } else DescriptionEl.classList.remove('strike');
      toggleToDoStatus(List[i]);
    });

    const Btns = document.createElement('div');
    Btns.classList.add('action-btn');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.classList.add('hide');
    editBtn.setAttribute('type', 'button');
    editBtn.innerHTML = '<i class="fa fa-edit"></i>';

    editBtn.addEventListener('click', () => {
      editTodo(List[i]);
    });

    const delBtn = document.createElement('button');
    delBtn.classList.add('delete-btn');
    delBtn.classList.add('hide');
    delBtn.setAttribute('type', 'button');
    delBtn.innerHTML = '<i class="fa fa-trash">';

    delBtn.addEventListener('click', () => {
      delTodo(List[i].index);
    });

    const Dots = document.createElement('button');
    Dots.classList.add('more-btn');
    Dots.setAttribute('type', 'button');
    Dots.innerHTML = '<i class="fa fa-ellipsis-v"></i>';

    Dots.addEventListener('click', () => {
      editBtn.classList.toggle('hide');
      delBtn.classList.toggle('hide');
    });

    ContentEl.appendChild(CheckboxEl);
    ContentEl.appendChild(DescriptionEl);

    Btns.appendChild(editBtn);
    Btns.appendChild(delBtn);
    Btns.appendChild(Dots);

    todoLi.appendChild(ContentEl);
    todoLi.appendChild(Btns);
    todoslist.appendChild(todoLi);
  }
  store();
};

const add = () => {
  const detail = document.querySelector('.taskList');
  if (detail.value) {
    const completed = false;
    const description = detail.value;
    const index = List.length + 1;
    List.push({ completed, description, index });
    display();
    store();
    detail.value = null;
  }
  List = List.map(
    (todo, index) => (
      { completed: todo.completed, description: todo.description, index: index + 1 }
    ),
  );
};

const saveEdit = () => {
  const detail = document.querySelector('.taskList');
  if (detail.value) {
    List = List.map((todo) => {
      if (todo.index === todoEdit.index) {
        return { ...todo, description: detail.value };
      } return todo;
    });
    display();
    store();
    detail.value = null;
    isEditing = false;
    todoEdit = null;
  }
};

const getIsEditing = () => isEditing;

export {
  getStore, add, saveEdit, display, getIsEditing, clearCompletedList, clearCheckBox,
};