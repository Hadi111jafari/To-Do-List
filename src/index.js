import './style.css';
import {
  getStore, add, saveEdit, display, getIsEditing,
} from './Add&Remove.js';

window.onload = () => {
  getStore();
  display();
};
const detail = document.querySelector('.taskList');
detail.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!getIsEditing())add();
    else saveEdit();
  }
});