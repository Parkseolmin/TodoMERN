import React, { memo } from 'react';
import TodoItem from './TodoItem';

const TodoBoard = memo(({ todoList, getTasks }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((todo) => (
          <TodoItem key={todo.id} todo={todo} getTasks={getTasks} />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
    </div>
  );
});

export default TodoBoard;
