import './style.css';
import renewIcon from './renew.svg';
import imgreturnleft from './return.svg';

const headingimg = document.getElementById('heading');
const myIcon = new Image();
myIcon.src = renewIcon;
headingimg.appendChild(myIcon);

const formimg = document.getElementById('form');
const formIcon = new Image();
formIcon.src = imgreturnleft;
formimg.appendChild(formIcon);

const data = [
  {
    description: 'finish the project',
    completed: 'true',
    index: '1',
  },
  {
    description: 'take rest',
    completed: 'false',
    index: '2',
  },
  {
    description: 'enjoy life to the fullest',
    completed: 'false',
    index: '3',
  },
];

data.forEach((task) => {
  const todolist = document.getElementById('todo-list');
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `
  <label class="${task.index}">
      <input type="checkbox" class="${task.index}">
      <p>${task.description}</p>
  </label>
  <i class="fa fa-ellipsis-v moreVert"></i>
  `;
  todolist.appendChild(li);
});