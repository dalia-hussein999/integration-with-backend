import { useState, useEffect } from "react";
import { axiosInstance } from "../assets/axios.config";

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState("");
   const [search , setSearch] = useState("");
 


  useEffect(() => {
    get();
  }, []);

  


  const get = () => {
    axiosInstance.get("/todos").then((res) => {
      console.log(res.data);
      setTodos(res.data);
    });
  };

  const handleChange = (e) => {
    setTaskName(e.target.value);
    console.log(e.target.value);
  };

  const handelSearch = (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);
    axiosInstance.get(`/todos?q=${searchValue}`).then((res) => {
      console.log(res);
      setTodos(res.data);
    });
    
  };
    const handleDelete = (id) => {
    axiosInstance.delete(`/todos/${id}`).then((data) => {
      if (data.status === 200) {
        get();
      }
    });
  };
  const handleEdit = (content) => {
   if(!!content.isCompleted){
      axiosInstance.patch(`/todos/${content.id}`,{
        isCompleted: false,
      }).then((data) => {
        if (data.status === 200) {
          get();
        }
      });
    }
  };
  const handleDone = (status) => {
    axiosInstance.patch(`/todos/${status.id}`,{
      isCompleted: true,
    }).then((data) => {
      if (data.status === 200) {
        get();
      }
    });
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (taskName) {
      axiosInstance.post("/todos", {
          taskName,
          isCompleted: false,
        })
        .then(() => {
          setTaskName("");
          get();
        });
    }
    
  };
  return (
    <div className="todolist">
      <div className="search" >
        <input type="text" value={search} onChange={handelSearch} placeholder="Search ex: todo 1" />
      </div>
      <form className="addTask" onSubmit={addTask}>
        <input
          type="text"
          onChange={handleChange}
          placeholder="Add a task........"
        />
        <button className="addtask-btn">Add Task</button>
      </form>
      <div className="lists">
        {todos?.map((todo, id) => (
          <div
            key={id}
            className={`list ${todo.isCompleted ? "completed" : ""}`}
          >
            <p> {todo.taskName}</p>
            <div className="span-btns">
              {!todo.isCompleted && (
                <span onClick={() => handleDone(todo)} title="completed">
                  ✓
                </span>
              )}
              <span
                className="delete-btn"
                onClick={() => handleDelete(todo.id)}
                title="delete"
              >
                x
              </span>
              <span
                className="edit-btn"
                onClick={() => handleEdit(todo)}
                title="edit"
              >
                ↻
              </span>
            </div>
          </div>
        ))}
        {!todos?.length && <h1>No Records</h1>}
      </div>
    </div>
  );
};

export default Todolist;
