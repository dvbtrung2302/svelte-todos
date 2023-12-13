<script lang="ts">
  import { fade } from "svelte/transition";
  import { todos, type Filter } from "../../../stores/todos";

  type SetSelectedFilterReturn = (filter: Filter) => void;
  export let selectedFilter = "all";
  export let setSelectedFilter: SetSelectedFilterReturn;

  $: incompleteTodos = $todos.filter((todo) => !todo.completed).length;

  let filters: Filter[] = ["all", "active", "completed"];
</script>

<div class="root">
  <span>
    {incompleteTodos}
    {incompleteTodos === 1 ? "item" : "items"} left
  </span>
  <ul class="filters">
    {#each filters as filter}
      <li>
        <button
          class="filter"
          class:activeFilter={selectedFilter === filter}
          on:click={() => setSelectedFilter(filter)}
        >
          {filter}
        </button>
      </li>
    {/each}
  </ul>
  {#if incompleteTodos !== $todos.length}
    <button
      transition:fade={{ duration: 200 }}
      class="clear-todos-btn"
      type="button"
      on:click={() => todos.removeCompletedTodos()}>Clear completed</button
    >
  {/if}
</div>

<style lang="scss">
  .root {
    color: #777;
    padding: 10px 15px;
    border-top: 1px solid #e6e6e6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 50px;
      overflow: hidden;
      box-shadow:
        0 1px 1px rgba(0, 0, 0, 0.2),
        0 8px 0 -3px #f6f6f6,
        0 9px 1px -3px rgba(0, 0, 0, 0.2),
        0 16px 0 -6px #f6f6f6,
        0 17px 2px -6px rgba(0, 0, 0, 0.2);
    }

    & .filters {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      display: flex;

      & .filter {
        color: inherit;
        margin: 3px;
        padding: 3px 7px;
        text-decoration: none;
        border: 1px solid transparent;
        border-radius: 3px;
        text-transform: capitalize;
        cursor: pointer;

        &:hover {
          border-color: rgba(175, 47, 47, 0.1);
        }

        &.activeFilter {
          border-color: rgba(175, 47, 47, 0.2);
        }
      }
    }

    & .clear-todos-btn {
      line-height: 20px;
      text-decoration: none;
      cursor: pointer;
      z-index: 1;

      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>
