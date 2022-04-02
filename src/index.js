import './style.css';
import {
  getStore, add, saveEdit, display, getIsEditing, clearCompletedList, clearCheckBox,
} from './Add&Remove.js';

window.onload = () => {
  getStore();
  display();
};

const refreshBtn = document.querySelector('.refresh-btn');
refreshBtn.addEventListener('click', () => {
  clearCheckBox();
  window.location.reload();
});

const detail = document.querySelector('.taskList');
detail.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    if (!getIsEditing())add();
    else saveEdit();
  }
});

const clearBtn = document.querySelector('.clear-btn');
clearBtn.addEventListener('click', () => {
  clearCompletedList();
});