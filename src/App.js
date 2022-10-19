import './App.css';
import Header from './Components/Header';
import Todos from './Components/Todos';
import Footer from './Components/Footer';
import React, { useState, useEffect } from 'react';
import AddTodo from './Components/AddTodo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import About from './Components/About';


function App() {
  let initTodo;
  if (localStorage.getItem('todos') === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem('todos'))
  }
  const onDelete = (todo) => {
    console.log("Blehe", todo);
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  const addTodo = (title, desc) => {
    console.log("Hehe add to do ", title, desc);
    let sno;
    if (todos.length === 0) {
      sno = 0;
    }
    else {
      sno = todos[todos.length - 1].sno + 1;
    }

    const myTodo = {
      sno: sno,
      title: title,
      desc: desc
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])
  return (
    <>
      <Router>
        <Header title="To-Do's List" searchBar={true} />
        <Switch>
          <Route exact path="/" render={() => {
            return (<>
              <AddTodo AddTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>)
          }}>

          </Route>
          <Route exact path="/about">
            <About />
          </Route>

        </Switch>

        <Footer />
      </Router>

    </>
  );
}

export default App;
