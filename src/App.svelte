<script lang="ts">
  import Title from "./lib/components/Title/Title.svelte";
  import TodoActions from "./lib/components/TodoActions/TodoActions.svelte";
  import TodoForm from "./lib/components/TodoForm/TodoForm.svelte";
  import TodoList from "./lib/components/TodoList/TodoList.svelte";
  import { todos } from "./stores/todos";
</script>

<main>
  <Title />
  <div class="container">
    <TodoForm />
    {#if $todos.length}
      <TodoList />
    {/if}
  </div>
</main>

<style lang="scss">
  :global(body) {
    font:
      14px "Helvetica Neue",
      Helvetica,
      Arial,
      sans-serif;
    line-height: 1.4em;
    background: #f5f5f5;
    color: #4d4d4d;
    min-width: 230px;
    max-width: 550px;
    margin: 0 auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
  }
  .container {
    background: #fff;
    box-shadow:
      0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 25px 50px 0 rgba(0, 0, 0, 0.1);
  }
</style>
