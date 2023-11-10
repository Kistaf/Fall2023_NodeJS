<script lang="ts">
  import LoginIllustration from "../../assets/LoginIllustration.svg";
</script>

<div class="flex flex-row w-screen h-screen">
  <section
    class="w-1/3 h-full dark:bg-white sm:flex justify-center items-center hidden min-w-fit"
  >
    <img width="420" src={LoginIllustration} alt="Login illustration" />
  </section>

  <section
    class="flex flex-col bg-[#eef3f8] justify-center sm:w-2/3 w-full h-full items-center space-y-16"
  >
    <slot />
  </section>
</div>
