import type { TodoDto } from "shared";

import React from "react";
import classNames from "classnames";
import { Form, useSubmit, useTransition } from "remix";
import { CheckboxOption } from "../ui/CheckboxOption";
import { Button } from "../ui/Button";

interface TodoItemProps {
  todoListId: string;
  todo: TodoDto;
}

export const TodoItem = ({ todoListId, todo }: TodoItemProps) => {
  const submit = useSubmit();
  const transition = useTransition();
  const htmlId = `todo-${todo.id}`;
  const completionAction = `/l/${todoListId}/todo/${todo.id}`;
  const archiveAction = `/l/${todoListId}/todo/${todo.id}/archive`;
  const isArchiving = transition.submission?.action === archiveAction;

  const handleChange = (e: React.ChangeEvent<HTMLFormElement>) =>
    submit(e.currentTarget);

  return (
    <div
      className={classNames(
        "TodoItem",
        "grid grid-cols-[1fr_auto] items-center gap-3",
        "rounded-2xl py-4 px-6",
        "bg-dark shadow",
        { "opacity-50": isArchiving }
      )}
    >
      <Form
        method="post"
        action={completionAction}
        onChange={handleChange}
        replace
      >
        <CheckboxOption
          id={htmlId}
          isChecked={todo.isComplete}
          label={
            <span
              className={classNames({
                "line-through opacity-75": todo.isComplete,
              })}
            >
              {todo.title}
            </span>
          }
        />
      </Form>

      <Form method="post" action={archiveAction} replace>
        <Button disabled={isArchiving} title="Archive this todo">
          🗑
        </Button>
      </Form>
    </div>
  );
};
