import { writable, derived } from "svelte/store";

export type Todo = {
  id: string;
  content: string;
  completed: boolean;
};

export type Filter = "all" | "active" | "completed";

function createTodos() {
  const storedTodos: Todo[] =
    JSON.parse(localStorage.getItem("todos") || "[]") || [];

  const { subscribe, update } = writable<Todo[]>(storedTodos);

  const createTodo = (content: string): void => {
    update((todos) => {
      const newTodo: Todo = {
        id: Math.random().toString(16).slice(2),
        content,
        completed: false,
      };
      return [...todos, newTodo];
    });
  };

  const completeTodo = (id: string): void => {
    update((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
    });
  };

  const removeTodo = (id: string): void => {
    update((todos) => todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, content: string): void => {
    update((todos) => {
      return todos.map((todo) => {
        if (todo.id === id) {
          todo.content = content;
        }
        return todo;
      });
    });
  };

  const toggleCompleted = (completed: boolean): void => {
    update((todos) => todos.map((todo) => ({ ...todo, completed })));
  };

  const removeCompletedTodos = (): void => {
    update((todos) => todos.filter((todo) => !todo.completed));
  };

  return {
    subscribe,
    createTodo,
    completeTodo,
    removeTodo,
    editTodo,
    removeCompletedTodos,
    toggleCompleted,
  };
}

const todos = createTodos();

todos.subscribe((value) =>
  localStorage.setItem("todos", JSON.stringify(value))
);

const filteredTodos = derived(todos, ($todos: Todo[]) => {
  return {
    all: $todos,
    active: $todos.filter((todo) => !todo.completed),
    completed: $todos.filter((todo) => todo.completed),
  };
});

export { todos, filteredTodos };
