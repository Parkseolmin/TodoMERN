import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');
  const handleChange = (e) => setTodoValue(e.target.value);

  const getTasks = async () => {
    try {
      const response = await api.get('/tasks');
      setTodoList(response.data.data);
    } catch (error) {
      console.error(`Failed to get tasks: ${error.message}`);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });
      if (response.status === 201) {
        setTodoValue('');
        getTasks();
      }
    } catch (error) {
      console.error(`error: ${error}`);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <form onSubmit={addTask}>
        <Row className='add-item-row'>
          <Col xs={12} sm={10}>
            <input
              type='text'
              placeholder='할일을 입력하세요'
              className='input-box'
              value={todoValue}
              onChange={handleChange}
            />
          </Col>
          <Col xs={12} sm={2}>
            <button type='submit' className='button-add'>
              추가
            </button>
          </Col>
        </Row>
      </form>
      <TodoBoard todoList={todoList} getTasks={getTasks} />
    </Container>
  );
}

export default App;
