import { Component } from '@angular/core';

interface TodoItem {
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent {
  todos: TodoItem[] = [];
  newTodoTitle: string = '';

  addTodo() {
    if (this.newTodoTitle.trim() !== '') {
      const newTodo: TodoItem = {
        title: this.newTodoTitle.trim(),
        completed: false,
      };
      this.todos.push(newTodo);
      this.newTodoTitle = '';
    }
  }

  completedTodo(index: number) {
    const todo = this.todos[index];
    this.todos[index] = { ...todo, completed: true };
  }

  removeTodo(index: number) {
    this.todos.splice(index, 1);
  }
}
