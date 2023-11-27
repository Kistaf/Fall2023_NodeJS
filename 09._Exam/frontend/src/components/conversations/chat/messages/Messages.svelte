<script>
  import { user } from "../../../../stores/authState";
  import Message from "./Message.svelte";
</script>

<div class="flex-1 overflow-y-auto hide-native-scrollbar">
  <div class="w-full h-full">
    <div class="space-y-4">
      {#each { length: 4 } as _, i}
        <Message
          message={{
            id: "1",
            publisherId: $user.user?.id ?? "",
            content: {
              message: "Hello world".repeat(50),
              publishedAt: new Date(),
              publisherUsername: "Kistaf",
            },
          }}
        />
      {/each}
    </div>
  </div>
</div>
