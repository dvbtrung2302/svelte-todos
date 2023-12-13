<script lang="ts">
  import { fade, slide } from "svelte/transition";
  import { filteredTodos, type Filter } from "../../../stores/todos";
  import TodoActions from "../TodoActions/TodoActions.svelte";
  import TodoItem from "../TodoItem/TodoItem.svelte";

  let selectedFilter: Filter = "all";

  const setSelectedFilter = (filter: Filter) => {
    selectedFilter = filter;
  };
</script>

<ul class="root" transition:slide>
  {#each $filteredTodos[selectedFilter] as todo (todo.id)}
    <li transition:slide>
      <TodoItem {todo} />
    </li>
  {/each}
</ul>
<TodoActions {selectedFilter} {setSelectedFilter} />
