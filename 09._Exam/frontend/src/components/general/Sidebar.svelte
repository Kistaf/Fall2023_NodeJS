<script lang="ts">
  import { MessagesSquare, User, Settings, LogOut } from "lucide-svelte";
  import SidebarIcon from "./icons/SidebarIcon.svelte";
  import authService from "../../services/authService";
  import friendsStore from "../../stores/friendsStore";
  import ThemeSwitcher from "./ThemeSwitcher.svelte";
</script>

<div
  class="w-[70px] h-screen bg-sidebar flex flex-col justify-between pt-8 pb-8 flex-none"
>
  <div class="flex w-full flex-col justify-center text-sidebar-foreground">
    <SidebarIcon section="conversations" notifications={2}>
      <MessagesSquare size={24} />
    </SidebarIcon>
    <SidebarIcon
      section="friends"
      notifications={$friendsStore.received.length}
    >
      <User size={24} />
    </SidebarIcon>
    <SidebarIcon section="settings">
      <Settings size={24} />
    </SidebarIcon>
  </div>
  <div class="flex w-full flex-col justify-center text-sidebar-foreground">
    <ThemeSwitcher />
    <button
      class="flex justify-center hover:bg-background py-5"
      on:click={authService.logout}
    >
      <LogOut size={24} />
    </button>
  </div>
</div>
