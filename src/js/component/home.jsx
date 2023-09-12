import React from "react";

const Home = () => {
	const [todoList, setTodoList] = React.useState([])
	const [inputValue, setInputValue] = React.useState("")
	const API_URL = "https://playground.4geeks.com/apis/fake/todos/user/AugustoSchemberger"

	const handleAddNewTodo = () => {
		setTodoList(prev => [...prev, { label: inputValue, done: false }])
	}

	const handleDeleteTodo = (indexToRemove) => {
		setTodoList(prev => prev.filter((_, index) => index !== indexToRemove));
	  }	  

	const handleOnKeyDown = (e) => {
		const keyPressed = e.key 

		
		if (inputValue && keyPressed === "Enter") {
			handleAddNewTodo(); 
			setInputValue(""); 
		}
	}

	const handleDeleteAll = () => {
		fetch('/api/todos/user/AugustoSchemberger', {
		  method: 'DELETE',
		  headers: {
			'Content-Type': 'application/json',
		  },
		})
		  .then((response) => {
			if (response.ok) {
			  setTodoList([]);
			} else {
			  console.error('Error al eliminar todos los elementos.');
			}
		  })
		  .catch((error) => {
			console.error('Error al realizar la solicitud:', error);
		  });
	  }
	  

	React.useEffect(() => {
		fetch(API_URL)
			.then(promiseResponse => {
				if (promiseResponse.ok)
					return promiseResponse.json().then(data => setTodoList(data))

				const createUserOptions = {
					method: "POST",
					body: JSON.stringify([]),
					headers: { "Content-Type": "application/json" }
				}
				fetch(API_URL, createUserOptions)
			})

	}, [])

	React.useEffect(() => {

		if (todoList.length > 0) {
			const udpateTodoOptions = {
				method: "PUT",
				body: JSON.stringify(todoList),
				headers: { "Content-Type": "application/json" }
			}
			fetch(API_URL, udpateTodoOptions)
		}

	}, [todoList])

	return (
		<div className="text-center bg-light mx-3 shadow-sm">
			<h1 className="mt-3">TodoList</h1>
			<input className="border w-100  text-center" placeholder="Escriba su Tarea" onKeyDown={handleOnKeyDown} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
			<ul style={{ margin: "1rem" }}>
				{
					todoList.map((singleTodo, index) => {
						return <section key={index} style={{ display: "flex", justifyContent: "space-between" }}>
							<li >{singleTodo.label}</li>
							<button className="btn" onClick={() => handleDeleteTodo(index)}>{`X`}</button>
						</section>
					})
				}
			</ul>
			<button className="btn" onClick={handleDeleteAll} >Eliminar</button>
		</div>
	);
};

export default Home;