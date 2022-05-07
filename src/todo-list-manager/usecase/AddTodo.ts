import type { GenerateId } from "shared";
import type { Todos } from "../domain/Todos";
import type { TodoLists } from "../domain/TodoLists";
import type { Clock } from "../domain/Clock";
import type { OwnerId } from "../domain/OwnerId";

import { addTodo, TodoListId } from "../domain/TodoList";

export class AddTodo {
  constructor(
    private readonly todos: Todos,
    private readonly todoLists: TodoLists,
    private readonly generateId: GenerateId,
    private readonly clock: Clock
  ) {}

  async execute(todoListId: TodoListId, title: string, ownerId: OwnerId) {
    const todoList = await this.todoLists.ofId(todoListId, ownerId);
    const todo = addTodo(todoList, title, this.generateId, this.clock);

    await this.todos.save(todo);
  }
}
