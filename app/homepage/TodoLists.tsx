import type { HomePageTodoListDto } from "shared";

import React from "react";
import { isEmpty } from "fp-ts/Array";
import { EmptyMessage } from "front/ui/EmptyMessage";
import { PageTitle } from "front/ui/PageTitle";
import { TodoListItem } from "front/homepage/TodoListItem";
import { AddTodoListForm } from "front/homepage/AddTodoListForm";

interface TodoListsProps {
  todoLists: HomePageTodoListDto[];
}

export const TodoLists = ({ todoLists }: TodoListsProps) => (
  <section className="space-y-10">
    <PageTitle>Welcome, these are your todo lists</PageTitle>

    <AddTodoListForm />

    {isEmpty(todoLists) ? (
      <EmptyMessage>No todo list has been added yet!</EmptyMessage>
    ) : (
      <ol className="space-y-2">
        {todoLists.map((todoList) => (
          <li key={todoList.id}>
            <TodoListItem todoList={todoList} />
          </li>
        ))}
      </ol>
    )}
  </section>
);