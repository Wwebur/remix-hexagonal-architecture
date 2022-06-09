import { Event } from "shared/events";

export type Changes = Record<string, { previous: string; current: string }>;

export class TodoListUpdated extends Event {
  static TYPE = "todoList.updated";

  constructor(
    public readonly todoListId: string,
    public readonly contributorId: string,
    public readonly changes: Changes,
    publishedAt: Date
  ) {
    super(TodoListUpdated.TYPE, publishedAt);
  }
}
