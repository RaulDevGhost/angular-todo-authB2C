import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TodoService, Todo } from './../todo.service';

@Component({
    selector: 'app-todo-view',
    templateUrl: './todo-view.component.html',
    styleUrls: ['./todo-view.component.css']
})
export class TodoViewComponent implements OnInit {

    todo?: Todo;

    todos: Todo[] = [];

    displayedColumns = ['status', 'description', 'edit', 'remove'];

    constructor(private service: TodoService) { }

    ngOnInit(): void {
      console.log("hello todos")
        this.getTodos();
    }

    getTodos(): void {
        this.service.getTodos()
            .subscribe((todos: Todo[]) => {
                this.todos = todos;
            });
    }

    addTodo(add: NgForm): void {
      console.log("hellooo")
        this.service.postTodo(add.value).subscribe(() => {
            this.getTodos();
        })
        add.resetForm();
    }

    checkTodo(todo: Todo): void {
        this.service.editTodo(todo).subscribe();
    }

    removeTodo(id: string): void {
        this.service.deleteTodo(+id).subscribe(() => {
            this.getTodos();
        })
    }
}