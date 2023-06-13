<script setup lang="ts">
import {ref} from 'vue';
import variables from '@/styles/variables.module.scss';
import { useCounterStore } from "@/store/counter";
const counterStore = useCounterStore();
defineProps<{ msg: string }>();
const count = ref(0);
</script>


<template>
  <h1>{{ msg }}</h1>

	<el-card class="text-left text-white border-white border-1 border-solid mt-10 bg-[#242424]">
		<template #header>子组件hello world</template>
		<el-form>
			<el-form-item lable="数字：">{{ counterStore.count }}</el-form-item>
			<el-form-item lable="加倍：">{{ counterStore.double }}</el-form-item>
		</el-form>
	</el-card>

  <div class="box" :style="{'background-color': variables.bgColor}"></div>
  <h1 class="text-red">aaaa</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
    <div>
      <el-button type="success"><i-ep-SuccessFilled />Success</el-button>
      <el-button type="info"><i-ep-InfoFilled />Info</el-button>
      <el-button type="warning"><i-ep-WarningFilled />Warning</el-button>
      <el-button type="danger"><i-ep-WarnTriangleFilled />Danger</el-button>
      <el-button type="info"><svg-icon icon-class="advert" />svg本地图标</el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.read-the-docs {
  color: #888;
}
.box {
  width: 100px;
  height: 100px;
  // background-color: $bg-color;
  background-color: red;
}
</style>
