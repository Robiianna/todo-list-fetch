import React, { useState } from "react";

//create your first component
const Home = () => {
	//creamos 2 estados, task (guarda lo que hace el usuario) y todo (la lista de tareas)
	const [task, setTask] = useState("");
	const [todos, setTodos] = useState([
		{
			label: "make dinner",
			done: false,
		},
		{
			label: "walk with my friend",
			done: false,
		},
	]);
	//aplicar funciones con evento change (detecta cambios en input y los agrega a task)
	function handleChange(event) {
		setTask(event.target.value);
	}
	//terminado el evento onchange, se agrega en el edo todo
	function addTask(event) {
		if (event.key === "Enter") {
			if (task.trim.label() !== "") {
				setTodos([...todos, task]);
				setTask("");
			}
		}
	}
	//funcion eliminar tarea, recibe el id como parametro (index)
	function deleteTask(id) {
		let newTask = todos.filter((ta, index) => id !== index);
		setTodos(newTask);
	}
	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-12 col-md-6">
					<h1 className="text-center"> My ToDo List</h1>
					<form
						onSubmit={(event) => {
							event.preventDefault();
						}}>
						<input
							type="text"
							placeholder="add your task"
							className="form-control"
							value={task}
							onChange={handleChange}
							onKeyDown={addTask}
							//eventos
						/>
					</form>
					{todos.length > 0 ? (
						<p> `te faltan {todos.length} tareas`</p>
					) : (
						<p>congratulations, you finished all your tasks</p>
					)}
					{/* //operador */}
					<ul>
						{todos.map((ta, index) => {
							return (
								<li
									key={index}
									onClick={() => {
										deleteTask(index);
									}}>
									{ta}
								</li>
							);
						})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;
