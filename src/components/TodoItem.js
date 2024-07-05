import React from 'react';
import { Col, Row } from 'react-bootstrap';
import api from '../utils/api'; // api 모듈을 임포트

const TodoItem = ({ todo, getTasks }) => {
  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${todo.id}`);
      getTasks(); // 삭제 후 할 일 목록 갱신
    } catch (error) {
      console.error(`Failed to delete task: ${error.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/tasks/${todo.id}`, {
        task: todo.task,
        isComplete: !todo.isComplete, // 완료 상태를 토글
      });
      getTasks(); // 업데이트 후 할 일 목록 갱신
    } catch (error) {
      console.error(`Failed to update task: ${error.message}`);
    }
  };

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item ${todo.isComplete ? 'completed' : ''}`}>
          <div className='todo-content'>{todo.task}</div>

          <div>
            <button className='button-delete' onClick={handleDelete}>
              삭제
            </button>
            <button className='button-update' onClick={handleUpdate}>
              {todo.isComplete ? '취소' : '끝남'}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
