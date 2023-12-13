<script lang="ts">
  import { todos } from "../../../stores/todos";

  let content: string = "";
  $: allCompleted =
    $todos.length &&
    $todos.filter((todo) => todo.completed)?.length === $todos.length;

  const handleSubmit = () => {
    if (!content) return;
    todos.createTodo(content);
    content = "";
  };

  const handleToggleCompleted = () => {
    todos.toggleCompleted(!allCompleted);
  };
</script>

<form on:submit|preventDefault={handleSubmit}>
  <button
    class="toggle"
    class:allCompleted
    on:click={handleToggleCompleted}
    type="button"
  ></button>
  <input placeholder="What need to be done?" bind:value={content} />
</form>

<style lang="scss">
  form {
    position: relative;
    & input {
      position: relative;
      margin: 0;
      width: 100%;
      font-size: 24px;
      font-family: inherit;
      font-weight: inherit;
      line-height: 1.4em;
      color: inherit;
      border: 1px solid #999;
      box-sizing: border-box;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding: 16px 16px 16px 60px;
      border: none;
      background: rgba(0, 0, 0, 0.003);
      box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);

      &:focus {
        outline: none;
      }

      &::placeholder {
        font-style: italic;
        font-weight: 300;
        color: #e6e6e6;
      }
    }

    & .toggle {
      font-size: 0;
      position: absolute;
      top: 50%;
      left: -10px;
      transform: translateY(-50%) rotate(90deg);
      z-index: 1;

      &::before {
        content: "❯";
        font-size: 22px;
        color: #e6e6e6;
        padding: 10px 27px;
      }

      &.allCompleted {
        &::before {
          color: #737373;
        }
      }
    }
  }
</style>
