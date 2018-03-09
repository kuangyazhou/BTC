<template>
  <div>
    <Proxy></Proxy>
  </div>
</template>

<script>
import Proxy from "@/components/common/proxy";
export default {
  components: { Proxy },
  name: "Product",
  data() {
    return {
      msg: "product"
    };
  }
};
</script>

<style scoped>

</style>
