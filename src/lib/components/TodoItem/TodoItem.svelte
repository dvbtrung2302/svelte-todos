<script lang="ts">
  import { fade } from "svelte/transition";
  import { todos, type Todo } from "../../../stores/todos";

  export let todo: Todo;

  let editting = false;
  let editValue = todo.content;

  const toggleEditTodo = () => {
    editting = true;
  };

  const handleEditTodo = () => {
    if (!editValue) {
      todos.removeTodo(todo.id);
      return;
    }

    todos.editTodo(todo.id, editValue);
    editting = false;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      handleEditTodo();
    }

    if (event.key === "Escape") {
      editValue = todo.content;
      editting = false;
    }
  };
</script>

<div class="root">
  {#if !editting}
    <input
      class="toggle"
      type="checkbox"
      checked={todo.completed}
      on:change={() => todos.completeTodo(todo.id)}
    />
    <span
      class="content"
      class:completed={todo.completed}
      on:dblclick={toggleEditTodo}
      role="button"
      tabindex={1}
      >{todo.content}
    </span>
    <button class="remove-btn" on:click={() => todos.removeTodo(todo.id)}>
    </button>
  {:else}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      class="edit-input"
      autofocus
      in:fade={{ duration: 300 }}
      bind:value={editValue}
      on:blur={handleEditTodo}
      on:keydown={handleKeyDown}
    />
  {/if}
</div>

<style lang="scss">
  .root {
    position: relative;
    font-size: 24px;
    border-bottom: 1px solid #ededed;

    &:hover {
      & .remove-btn {
        display: block;
      }
    }

    & .toggle {
      text-align: center;
      width: 40px;
      height: auto;
      position: absolute;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border: none;
      appearance: none;
      opacity: 0;
      height: 40px;
    }

    & .content {
      word-break: break-all;
      padding: 15px 15px 15px 60px;
      display: block;
      line-height: 1.2;
      background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E);
      background-repeat: no-repeat;
      background-position: center left;
      transition: color 0.4s;

      &.completed {
        background-image: url(data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E);
        text-decoration: line-through;
        color: #d9d9d9;
      }
    }

    & .remove-btn {
      display: none;
      position: absolute;
      top: 0;
      right: 10px;
      bottom: 0;
      width: 40px;
      height: 40px;
      margin: auto 0;
      font-size: 30px;
      color: #cc9a9a;
      margin-bottom: 11px;
      transition: color 0.2s ease-out;

      &:hover {
        color: #af5b5e;
      }

      &::after {
        content: "×";
      }
    }

    & .edit-input {
      display: block;
      width: calc(100% - 43px);
      position: relative;
      padding: 12px 16px;
      margin: 0 0 0 43px;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      border: 1px solid #999;
      box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
      box-sizing: border-box;
      outline: none;
    }
  }
</style>
