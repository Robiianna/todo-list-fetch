import React, { useState, useEffect } from "react";

//create your first component

const Home = () => {
	//variable general
	const initialState = { label: "", done: false };

	const urlBase = "https://assets.breatheco.de/apis/fake/todos/user";
	//creamos 2 estados, task (guarda lo que hace el usuario) y todo (la lista de tareas)
	const [task, setTask] = useState(initialState);
	const [todos, setTodos] = useState([]);
	//aplicar funciones con evento change (detecta cambios en input y los agrega a task)
	function handleChange(e) {
		setTask({ ...task, [e.target.name]: e.target.value });
	}
	//terminado el evento onchange, se agrega en el edo todo

	async function addTask(event) {
		if (event.key === "Enter") {
			if (task.label.trim() !== "") {
				let response = await fetch(`${urlBase}/robiianna`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify([...todos, task]),
				});
				if (response.ok) {
					getTask();
					setTask(initialState);
				}
			}
		}
	}
	//funcion eliminar tarea, recibe el id como parametro (index)
	async function deleteTask(id) {
		let newTask = todos.filter((ta, index) => id !== index);

		let response = await fetch(`${urlBase}/robiianna`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newTask),
		});
		if (response.ok) {
			getTask();
		}
		setTodos(newTask);
	}

	//traer tareas
	async function getTask() {
		try {
			let response = await fetch(`${urlBase}/robiianna`);
			if (response.ok) {
				let data = await response.json();
				setTodos(data);
			} else {
				try {
					let responseTwo = await fetch(`${urlBase}/robiianna`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify([]),
					});
					if (response.ok) {
						getTask();
					}
				} catch (error) {
					console.log(error);
				}
			}
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		getTask();
	}, []);

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
							value={task.label}
							onChange={handleChange}
							onKeyDown={addTask}
							name="label"
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
									{ta.label}
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
